import { checkRateLimit, getClientIp } from "./lib/rateLimit.js";

const QAZCRM_FORM_URL =
  "https://crm.tennet.kz/api/public/forms/69cbec2a-1fe8-4f9a-b037-1e4767023765/";

function isValidPhone(phone) {
  if (typeof phone !== "string") return false;
  const digits = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{10,15}$/.test(digits);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Слишком много запросов" });
  }

  const { name, phone, totalPrice } = req.body || {};

  if (!name || typeof name !== "string" || name.length > 100) {
    return res.status(400).json({ error: "Неверное имя" });
  }

  if (!phone || !isValidPhone(phone)) {
    return res.status(400).json({ error: "Неверный телефон" });
  }

  if (
    totalPrice == null ||
    typeof totalPrice !== "number" ||
    totalPrice < 0 ||
    totalPrice > 10000000
  ) {
    return res.status(400).json({ error: "Неверная сумма" });
  }

  try {
    const {
      serviceType,
      area,
      extras,
      address,
      date,
      time,
    } = req.body || {};

    const dateTime = [date, time].filter(Boolean).join(" ");
    const description = [
      serviceType && `Тип: ${serviceType}`,
      area && `Площадь: ${area}м²`,
      totalPrice && `Сумма: ${Number(totalPrice).toLocaleString("ru-RU")}₸`,
      extras && `Доп: ${extras}`,
    ]
      .filter(Boolean)
      .join(", ");

    const crmResponse = await fetch(QAZCRM_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        standard_name: name.trim(),
        standard_phone: phone,
        amount: Number(totalPrice) || 0,
        custom_1782: description,
        custom_2255: address || "",
        custom_2256: dateTime || "",
        custom_2257: extras || "Без доп. услуг",
        custom_2254: Number(area) || 0,
        custom_2253: serviceType || "",
        website_url: "",
      }),
    });

    const text = await crmResponse.text();
    let payload = {};
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { message: text };
    }

    return res.status(crmResponse.status).json(payload);
  } catch (error) {
    console.error("QazCRM proxy error:", error);
    return res.status(500).json({ error: "Не удалось связаться с CRM." });
  }
}
