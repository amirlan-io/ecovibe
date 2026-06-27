import type { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "./lib/security.js";

/** Endpoint disabled: amount sync happens server-side in qazcrm-lead. */
export default function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === "OPTIONS") return res.status(200).end();

  return res.status(410).json({
    error: "Endpoint removed. Lead updates are handled internally.",
  });
}
