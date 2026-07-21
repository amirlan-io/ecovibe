import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { formatPhoneNumber, isPhoneComplete, phoneForSubmit } from "../utils/phoneFormat";
import { formatClientPhoneForSheets, submitBookingToMakeBackup } from "../utils/makeWebhook";
import { buildCRMPayload, submitLeadToQazCrm } from "../utils/qazcrm";
import { WHATSAPP_LINK } from "../utils/whatsapp";
import { PrivacyPolicyLink } from "./PrivacyPolicyLink";
import { trackGoal } from "../utils/analytics";

export type ServiceLeadFormAccent = "green" | "blue" | "orange" | "purple";

// Tailwind's build-time scanner only picks up literal class strings, so
// accent classes must be spelled out in full here rather than built with
// `text-${accent}-600` template interpolation (that would compile to
// nothing — the classes wouldn't exist in the shipped CSS at all).
const ACCENT_CLASSES: Record<
  ServiceLeadFormAccent,
  { ring: string; icon: string; link: string; linkHover: string; bg: string; bgHover: string }
> = {
  green: {
    ring: "focus:ring-green-500",
    icon: "text-green-600",
    link: "text-green-700",
    linkHover: "hover:text-green-800",
    bg: "bg-green-700",
    bgHover: "hover:bg-green-600",
  },
  blue: {
    ring: "focus:ring-blue-500",
    icon: "text-blue-600",
    link: "text-blue-700",
    linkHover: "hover:text-blue-800",
    bg: "bg-blue-700",
    bgHover: "hover:bg-blue-600",
  },
  orange: {
    ring: "focus:ring-orange-500",
    icon: "text-orange-600",
    link: "text-orange-700",
    linkHover: "hover:text-orange-800",
    bg: "bg-orange-700",
    bgHover: "hover:bg-orange-600",
  },
  purple: {
    ring: "focus:ring-purple-500",
    icon: "text-purple-600",
    link: "text-purple-700",
    linkHover: "hover:text-purple-800",
    bg: "bg-purple-700",
    bgHover: "hover:bg-purple-600",
  },
};

interface ServiceLeadFormProps {
  /** Отправляется в CRM/таблицу как тип услуги — например "Уборка офисов" */
  serviceType: string;
  accent?: ServiceLeadFormAccent;
}

export function ServiceLeadForm({ serviceType, accent = "green" }: ServiceLeadFormProps) {
  const c = ACCENT_CLASSES[accent];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (honeypot) return;

    const phoneRaw = phone.trim();
    if (!name.trim() || !phoneRaw) {
      toast.error("Укажите имя и телефон.");
      return;
    }
    if (!isPhoneComplete(phoneRaw)) {
      toast.error("Укажите полный номер телефона.");
      return;
    }

    const submitPhone = phoneForSubmit(phoneRaw);
    setIsSubmitting(true);

    const sendToCrm = async () => {
      try {
        const payload = buildCRMPayload({
          name: name.trim(),
          phone: submitPhone,
          serviceType,
          area: 0,
          extras: [],
          totalPrice: 0,
          address: comment.trim(),
          website: honeypot,
        });
        await submitLeadToQazCrm(payload);
        return true;
      } catch (error) {
        console.error("QazCRM submit failed:", error);
        return false;
      }
    };

    const sendToMake = async () => {
      try {
        await submitBookingToMakeBackup({
          client_phone: formatClientPhoneForSheets(submitPhone),
          cleaning_type: serviceType,
          area: 1,
          calculated_price: 1,
          extras: comment.trim(),
          status: "new",
        });
        return true;
      } catch (error) {
        console.error("Make webhook submit failed:", error);
        return false;
      }
    };

    const [crmOk, makeOk] = await Promise.all([sendToCrm(), sendToMake()]);

    if (crmOk || makeOk) {
      setIsSuccess(true);
      trackGoal("form_submit", { form: "service_lead", serviceType });
      setName("");
      setPhone("");
      setComment("");
    } else {
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в WhatsApp.");
    }

    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white p-8 text-center shadow-lg">
        <CheckCircle2 className={`h-12 w-12 ${c.icon}`} />
        <p className="font-semibold text-gray-900">Заявка отправлена!</p>
        <p className="text-sm text-gray-600">Мы свяжемся с вами в ближайшее время.</p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className={`mt-2 text-sm underline underline-offset-2 ${c.link} ${c.linkHover}`}
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />
        <div>
          <label htmlFor={`${serviceType}-name`} className="mb-2 block text-sm">
            Ваше имя *
          </label>
          <input
            type="text"
            id={`${serviceType}-name`}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как вас зовут?"
            className={`w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 ${c.ring}`}
          />
        </div>
        <div>
          <label htmlFor={`${serviceType}-phone`} className="mb-2 block text-sm">
            Телефон / WhatsApp *
          </label>
          <input
            type="tel"
            id={`${serviceType}-phone`}
            required
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            placeholder="+7 7__ ___ __ __"
            className={`w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 ${c.ring}`}
          />
        </div>
        <div>
          <label htmlFor={`${serviceType}-comment`} className="mb-2 block text-sm">
            Комментарий
          </label>
          <textarea
            id={`${serviceType}-comment`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Адрес, площадь, удобное время..."
            className={`w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-${accent}-500`}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-medium text-white transition-colors disabled:opacity-70 ${c.bg} ${c.bgHover}`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Отправляем...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Отправить заявку
            </>
          )}
        </button>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-green-600 py-3 font-medium text-green-700 transition-colors hover:bg-green-50"
        >
          Написать в WhatsApp
        </a>
        <p className="text-center text-xs text-gray-500">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <PrivacyPolicyLink className="text-green-800 underline underline-offset-2 hover:text-green-700">
            политикой конфиденциальности
          </PrivacyPolicyLink>
        </p>
      </form>
    </div>
  );
}
