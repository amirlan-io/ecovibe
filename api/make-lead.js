import { checkRateLimit, getClientIp } from "./lib/rateLimit.js";
import {
  applyCors,
  isBodyTooLarge,
  isHoneypotTriggered,
  isValidPhone,
  rejectDisallowed,
  sanitizeText,
} from "./lib/security.js";

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

function formatClientPhone(phone) {
  return String(phone ?? "")
    .replace(/\+/g, "")
    .trim();
}

function isValidBooking(body) {
  const clientPhone = formatClientPhone(body.client_phone);
  const cleaningType = sanitizeText(body.cleaning_type, 100);
  const area = Number(body.area);
  const calculatedPrice = Number(body.calculated_price);
  const phoneDigits = clientPhone.replace(/\D/g, "");
  const localDigits = phoneDigits.startsWith("7")
    ? phoneDigits.slice(1)
    : phoneDigits;

  return (
    cleaningType.length > 0 &&
    Number.isFinite(area) &&
    area > 0 &&
    area <= 10_000 &&
    Number.isFinite(calculatedPrice) &&
    calculatedPrice > 0 &&
    calculatedPrice <= 10_000_000 &&
    isValidPhone(clientPhone) &&
    phoneDigits.length >= 11 &&
    !/^7+$/.test(localDigits)
  );
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (rejectDisallowed(req, res)) return;
  if (isBodyTooLarge(req)) {
    return res.status(413).json({ error: "Payload too large" });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip, "make")) {
    return res.status(429).json({ error: "Слишком много запросов" });
  }

  const body = req.body ?? {};

  if (isHoneypotTriggered(body)) {
    return res.status(200).json({ ok: true });
  }

  if (!MAKE_WEBHOOK_URL) {
    return res.status(503).json({ error: "Backup channel is not configured" });
  }

  if (!isValidBooking(body)) {
    return res.status(400).json({
      error: "Заполните все поля формы перед отправкой в таблицу.",
    });
  }

  const payload = {
    client_phone: formatClientPhone(body.client_phone),
    cleaning_type: sanitizeText(body.cleaning_type, 100),
    area: Number(body.area),
    calculated_price: Number(body.calculated_price),
    extras: sanitizeText(body.extras, 500),
    status: "new",
  };

  try {
    const makeResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!makeResponse.ok) {
      return res.status(502).json({ error: "Backup channel rejected request" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Make webhook proxy error:", error);
    return res.status(500).json({
      error: "Не удалось связаться с Make. Попробуйте позже.",
    });
  }
}
