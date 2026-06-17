export const QAZCRM_FORM_ID = "84be7530-2d6a-4066-b548-06748a90aada";

export const QAZCRM_FORM_URL = `https://crm.tennet.kz/api/public/forms/${QAZCRM_FORM_ID}/`;

/** Прокси на том же домене — обход CORS в браузере */
export const QAZCRM_SUBMIT_URL = "/api/qazcrm-lead";

export interface BuildCrmPayloadInput {
  name: string;
  phone: string;
  serviceType: string;
  area: number;
  extras: string[];
  totalPrice: number;
}

export interface QazCrmLeadPayload {
  name: string;
  phone: string;
  amount?: number;
}

export interface QazCrmLeadResponse {
  id?: number | string;
  data?: {
    id?: number | string;
    [key: string]: unknown;
  };
  message?: string;
  redirect_url?: string;
  [key: string]: unknown;
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
  const body: Record<string, string | number> = {
    name: payload.name,
    phone: payload.phone,
    standard_name: payload.name,
    standard_phone: payload.phone,
  };

  if (payload.amount != null) {
    const amount = Number(payload.amount);
    if (!Number.isNaN(amount) && amount > 0) {
      body.amount = amount;
      body.price = amount;
      body.standard_amount = amount;
      body.standard_budget = amount;
    }
  }

  return body;
}

export function buildCRMPayload(data: BuildCrmPayloadInput): QazCrmLeadPayload {
  const extrasText = data.extras.length > 0 ? `, доп: ${data.extras.join(" + ")}` : "";
  const enrichedName = `${data.name} | ${data.serviceType} ${data.area}м² | ${data.totalPrice}₸${extrasText}`;

  return {
    name: enrichedName,
    phone: data.phone,
    amount: data.totalPrice,
  };
}

export async function submitLeadToQazCrm(
  payload: QazCrmLeadPayload,
): Promise<QazCrmLeadResponse | null> {
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
    return (await response.json()) as QazCrmLeadResponse;
  } catch {
    return null;
  }
}
