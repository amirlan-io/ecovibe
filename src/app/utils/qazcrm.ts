export const QAZCRM_FORM_ID = "69cbec2a-1fe8-4f9a-b037-1e4767023765";

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
  address?: string;
  date?: string;
  time?: string;
}

export interface QazCrmLeadResponse {
  id?: number | string;
  lead_id?: number | string;
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

export function buildCRMPayload(data: {
  name: string;
  phone: string;
  serviceType: string;
  area: number;
  extras: string[];
  totalPrice: number;
  address?: string;
  date?: string;
  time?: string;
}) {
  return {
    name: data.name,
    phone: data.phone,
    serviceType: data.serviceType,
    area: data.area,
    extras: data.extras.join(", "),
    totalPrice: data.totalPrice,
    address: data.address ?? "",
    date: data.date ?? "",
    time: data.time ?? "",
  };
}

export async function submitLeadToQazCrm(
  payload: ReturnType<typeof buildCRMPayload>,
): Promise<QazCrmLeadResponse> {
  let response: Response;

  try {
    response = await fetch(QAZCRM_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Не удалось отправить заявку. Проверьте интернет или напишите нам в WhatsApp.",
    );
  }

  if (!response.ok) {
    throw new Error(await parseQazCrmError(response));
  }

  return response.json();
}
