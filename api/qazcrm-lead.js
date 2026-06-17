const QAZCRM_FORM_URL =
  "https://crm.tennet.kz/api/public/forms/84be7530-2d6a-4066-b548-06748a90aada/";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, phone, amount, serviceType, area, extras } = req.body || {};

    const descriptionParts = [
      serviceType && `Тип: ${serviceType}`,
      area && `Площадь: ${area}м²`,
      extras && `Доп: ${extras}`,
    ].filter(Boolean);

    const description = descriptionParts.join(", ");

    const crmResponse = await fetch(QAZCRM_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        standard_name: name,
        standard_phone: phone,
        amount: Number(amount) || 0,
        description,
      }),
    });

    const text = await crmResponse.text();
    let payload = {};

    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { message: text };
      }
    }

    return res.status(crmResponse.status).json(payload);
  } catch (error) {
    console.error("QazCRM proxy error:", error);
    return res.status(500).json({
      error: "Не удалось связаться с CRM. Попробуйте позже.",
    });
  }
}
