const QAZCRM_FORM_URL =
  "https://crm.tennet.kz/api/public/forms/69cbec2a-1fe8-4f9a-b037-1e4767023765/";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      phone,
      serviceType,
      area,
      extras,
      address,
      date,
      time,
      totalPrice,
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
        standard_name: name,
        standard_phone: phone,
        custom_1782: description,
        custom_2255: address || "",
        custom_2256: dateTime || "",
        custom_2257: extras || "",
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
