export const QAZCRM_FORM_ID = "84be7530-2d6a-4066-b548-06748a90aada";

export const QAZCRM_FORM_URL = `https://crm.tennet.kz/api/public/forms/${QAZCRM_FORM_ID}/`;

/** Прокси на том же домене — обход CORS в браузере */
export const QAZCRM_SUBMIT_URL = "/api/qazcrm-lead";

/**
 * Документированный эндпоинт QazCRM для заметок к лиду.
 * В браузере вызывается через QAZCRM_ADD_NOTE_SUBMIT_URL (serverless-прокси).
 */
export const getQazCrmAddNoteUrl = (leadId: string | number) =>
  `https://crm.tennet.kz/api/v1/leads/${leadId}/add_note`;

/** Прокси → POST /api/v1/leads/{lead_id}/add_note */
export const QAZCRM_ADD_NOTE_SUBMIT_URL = "/api/qazcrm-lead-note";

/**
 * Ключи кастомных полей — должны совпадать с `name` из GET /api/public/forms/{id}/.
 */
export const QAZCRM_CUSTOM_FIELDS = {
  cleaning_type: "cleaning_type",
  area: "area",
  extras: "extras",
  address: "address",
  date_time: "date_time",
} as const;

function buildOrderDetailsComment(payload: QazCrmLeadPayload): string {
  const parts: string[] = [];
  const cleaningType = payload.cleaningType ?? payload.cleaning_type;

  if (cleaningType) {
    parts.push(`Тип уборки: ${cleaningType}`);
  }
  if (payload.area != null && payload.area !== "") {
    parts.push(`Площадь: ${payload.area}м²`);
  }
  if (payload.rooms != null || payload.bathrooms != null) {
    parts.push(`Комнат: ${payload.rooms ?? "—"}, Санузлов: ${payload.bathrooms ?? "—"}`);
  }
  if (payload.address) {
    parts.push(`Адрес: ${payload.address}`);
  }
  if (payload.date && payload.time) {
    parts.push(`Время: ${payload.date} в ${payload.time}`);
  } else if (payload.date_time) {
    parts.push(`Время: ${payload.date_time}`);
  }
  if (payload.extras) {
    parts.push(`Допы: ${payload.extras}`);
  }
  if (payload.price != null && !Number.isNaN(Number(payload.price))) {
    parts.push(`Расчётная сумма: ${Number(payload.price).toLocaleString("ru-RU")} ₸`);
  }

  return parts.join("\n");
}

export interface QazCrmLeadPayload {
  name: string;
  phone: string;
  price?: number;
  cleaningType?: string;
  area?: number | string;
  rooms?: number | string;
  bathrooms?: number | string;
  address?: string;
  date?: string;
  time?: string;
  extras?: string;
  /** @deprecated используйте cleaningType */
  cleaning_type?: string;
  /** @deprecated используйте date + time */
  date_time?: string;
}

export interface QazCrmLeadResponse {
  id?: number | string;
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

  if (payload.price != null) {
    const price = Number(payload.price);
    if (!Number.isNaN(price) && price > 0) {
      body.price = price;
      body.amount = price;
      body.standard_budget = price;
      body.standard_amount = price;
    }
  }

  const cleaningType = payload.cleaningType ?? payload.cleaning_type;
  const dateTime =
    payload.date && payload.time
      ? `${payload.date} ${payload.time}`.trim()
      : payload.date_time;

  const customFields: [keyof typeof QAZCRM_CUSTOM_FIELDS, string | number | undefined][] = [
    ["cleaning_type", cleaningType],
    ["area", payload.area],
    ["extras", payload.extras],
    ["address", payload.address],
    ["date_time", dateTime],
  ];

  for (const [field, value] of customFields) {
    if (value == null || value === "") continue;
    const apiKey = QAZCRM_CUSTOM_FIELDS[field];
    body[apiKey] = typeof value === "number" ? value : String(value);
  }

  if (payload.address?.trim()) {
    body.standard_address = payload.address.trim();
    body.address = payload.address.trim();
  }

  return body;
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

  let leadData: QazCrmLeadResponse | null = null;

  try {
    leadData = (await response.json()) as QazCrmLeadResponse;
  } catch {
    return null;
  }

  const leadId = leadData?.id;
  const noteContent = buildOrderDetailsComment(payload);

  if (leadId && noteContent) {
    try {
      const noteResponse = await fetch(QAZCRM_ADD_NOTE_SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          content: noteContent,
        }),
      });

      if (!noteResponse.ok) {
        console.error(
          "QazCRM add_note failed:",
          noteResponse.status,
          await noteResponse.text(),
        );
      }
    } catch (error) {
      console.error("QazCRM add_note error:", error);
    }
  }

  return leadData;
}
