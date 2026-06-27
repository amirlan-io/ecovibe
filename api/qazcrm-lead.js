import { checkRateLimit, getClientIp } from "./lib/rateLimit.js";
import {
  applyCors,
  isBodyTooLarge,
  isHoneypotTriggered,
  isValidPhone,
  rejectDisallowed,
  sanitizeText,
  updateLeadAmount,
} from "./lib/security.js";

const QAZCRM_FORM_URL =
  process.env.QAZCRM_FORM_URL ||
  "https://crm.tennet.kz/api/public/forms/69cbec2a-1fe8-4f9a-b037-1e4767023765/";

function extractLeadId(payload) {
  return payload?.lead_id ?? payload?.id ?? payload?.data?.id ?? null;
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (rejectDisallowed(req, res)) return;
  if (isBodyTooLarge(req)) {
    return res.status(413).json({ error: "Payload too large" });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip, "qazcrm")) {
    return res.status(429).json({ error: "Слишком много запросов" });
  }

  const body = req.body || {};

  if (isHoneypotTriggered(body)) {
    return res.status(200).json({ success: true });
  }

  const name = sanitizeText(body.name, 100);
  const phone = sanitizeText(body.phone, 20);
  const serviceType = sanitizeText(body.serviceType, 100);
  const address = sanitizeText(body.address, 300);
  const extras = sanitizeText(body.extras, 500);
  const date = sanitizeText(body.date, 20);
  const time = sanitizeText(body.time, 20);
  const { totalPrice, area } = body;

  if (!name) {
    return res.status(400).json({ error: "Неверное имя" });
  }

  if (!isValidPhone(phone)) {
    return res.status(400).json({ error: "Неверный телефон" });
  }

  if (
    totalPrice == null ||
    typeof totalPrice !== "number" ||
    totalPrice < 0 ||
    totalPrice > 10_000_000
  ) {
    return res.status(400).json({ error: "Неверная сумма" });
  }

  if (!Number.isFinite(Number(area)) || Number(area) <= 0 || Number(area) > 10_000) {
    return res.status(400).json({ error: "Неверная площадь" });
  }

  try {
    const dateTime = [date, time].filter(Boolean).join(" ");
    const description = [
      serviceType && `Тип: ${serviceType}`,
      area && `Площадь: ${area}м²`,
      `Сумма: ${Number(totalPrice).toLocaleString("ru-RU")}₸`,
      extras && `Доп: ${extras}`,
    ]
      .filter(Boolean)
      .join(", ");

    const crmResponse = await fetch(QAZCRM_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        standard_name: name,
        standard_phone: phone,
        amount: Number(totalPrice),
        custom_1782: description,
        custom_2255: address,
        custom_2256: dateTime,
        custom_2257: extras || "Без доп. услуг",
        custom_2254: Number(area),
        custom_2253: serviceType,
        website_url: "",
      }),
    });

    const text = await crmResponse.text();
    let payload = {};
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { message: "accepted" };
    }

    if (!crmResponse.ok) {
      return res.status(crmResponse.status).json({ error: "CRM rejected request" });
    }

    const leadId = extractLeadId(payload);
    if (leadId != null) {
      await updateLeadAmount(leadId, Number(totalPrice));
    }

    return res.status(200).json({
      success: true,
      lead_id: leadId ?? undefined,
      id: leadId ?? undefined,
    });
  } catch (error) {
    console.error("QazCRM proxy error:", error);
    return res.status(500).json({ error: "Не удалось связаться с CRM." });
  }
}
