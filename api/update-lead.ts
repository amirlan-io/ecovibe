import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkRateLimit, getClientIp } from "./lib/rateLimit.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Слишком много запросов" });
  }

  const { leadId, amount } = req.body ?? {};

  if (leadId == null || String(leadId).length > 64) {
    return res.status(400).json({ error: "Неверный идентификатор заявки" });
  }

  if (
    amount == null ||
    typeof amount !== "number" ||
    amount < 0 ||
    amount > 10000000
  ) {
    return res.status(400).json({ error: "Неверная сумма" });
  }

  if (!process.env.QAZCRM_API_TOKEN) {
    return res.status(500).json({ success: false, error: "CRM token not configured" });
  }

  try {
    const response = await fetch(`https://crm.tennet.kz/api/auth/leads/${leadId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.QAZCRM_API_TOKEN}`,
      },
      body: JSON.stringify({ amount }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({ success: false, raw: responseText });
    }

    return res.status(200).json({ success: true, raw: responseText });
  } catch (error) {
    return res.status(500).json({ success: false, error: String(error) });
  }
}
