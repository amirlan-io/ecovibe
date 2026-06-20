import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { leadId, amount } = req.body;

  try {
    console.log("leadId:", leadId);
    console.log("amount:", amount);
    console.log("token exists:", !!process.env.QAZCRM_API_TOKEN);
    console.log("url:", `https://crm.tennet.kz/api/v1/leads/${leadId}/`);

    const response = await fetch(`https://crm.tennet.kz/api/v1/leads/${leadId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.QAZCRM_API_TOKEN}`,
      },
      body: JSON.stringify({ amount }),
    });

    const responseText = await response.text();
    console.log("QazCRM response status:", response.status);
    console.log("QazCRM response body:", responseText);

    return res.status(200).json({ success: true, raw: responseText });
  } catch (error) {
    return res.status(500).json({ success: false, error: String(error) });
  }
}
