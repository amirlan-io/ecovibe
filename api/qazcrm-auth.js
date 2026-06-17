/** Общие заголовки для QazCRM API v1 (add_note и др.) */
export function getQazCrmAuthHeaders() {
  const token = process.env.QAZCRM_API_TOKEN;

  if (!token) {
    return null;
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
}
