export const QAZCRM_FORM_ID = "84be7530-2d6a-4066-b548-06748a90aada";

export const QAZCRM_FORM_URL = `https://crm.tennet.kz/api/public/forms/${QAZCRM_FORM_ID}/`;

/** Прокси на том же домене — обход CORS в браузере */
export const QAZCRM_SUBMIT_URL = "/api/qazcrm-lead";

export interface QazCrmLeadPayload {
  name: string;
  phone: string;
}

export async function parseQazCrmError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.error === "string") return data.error;
    if (typeof data?.detail === "string") return data.detail;
    if (Array.isArray(data?.detail)) return String(data.detail[0]);
    if (data && typeof data === "object") {
      const firstValue = Object.values(data)[0];
      if (Array.isArray(firstValue)) return String(firstValue[0]);
      if (firstValue) return String(firstValue);
    }
  } catch {
    // ignore JSON parse errors
  }
  return "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону.";
}

function toApiBody(payload: QazCrmLeadPayload) {
  return {
    name: payload.name,
    phone: payload.phone,
    standard_name: payload.name,
    standard_phone: payload.phone,
  };
}

export async function submitLeadToQazCrm(payload: QazCrmLeadPayload) {
  let response: Response;

  try {
    response = await fetch(QAZCRM_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toApiBody(payload)),
    });
  } catch {
    throw new Error(
      "Не удалось отправить заявку. Проверьте интернет или напишите нам в WhatsApp.",
    );
  }

  if (!response.ok) {
    throw new Error(await parseQazCrmError(response));
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
