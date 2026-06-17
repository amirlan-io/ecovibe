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

  const leadId = req.body?.leadId;
  const content = req.body?.content;
  const token = process.env.QAZCRM_API_TOKEN;

  if (!leadId || !content) {
    return res.status(400).json({ error: "leadId and content are required" });
  }

  if (!token) {
    console.error("QazCRM add_note: QAZCRM_API_TOKEN is not configured");
    return res.status(500).json({
      error: "CRM token is not configured on the server.",
    });
  }

  const targetUrl = `https://crm.tennet.kz/api/v1/leads/${leadId}/add_note?token=${encodeURIComponent(token)}`;

  try {
    const crmResponse = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        "X-API-KEY": token,
        "X-Authorization-Bearer": `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        text: content,
        comment: content,
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
    console.error("QazCRM add_note proxy error:", error);
    return res.status(500).json({
      error: "Не удалось добавить заметку к лиду.",
    });
  }
}
