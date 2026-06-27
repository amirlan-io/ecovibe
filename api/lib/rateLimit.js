const rateLimit = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

export function checkRateLimit(ip, scope = "api") {
  const now = Date.now();
  const mapKey = `${scope}:${ip}`;
  const requests = rateLimit.get(mapKey) || [];
  const recent = requests.filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) return false;

  recent.push(now);
  rateLimit.set(mapKey, recent);

  if (rateLimit.size > 10_000) {
    for (const [key, times] of rateLimit) {
      const alive = times.filter((time) => now - time < WINDOW_MS);
      if (alive.length === 0) rateLimit.delete(key);
      else rateLimit.set(key, alive);
    }
  }

  return true;
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}
