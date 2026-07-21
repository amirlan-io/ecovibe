import { Phone, Mail, Clock, MapPin, Instagram, MessageCircle, Loader2, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { formatPhoneNumber, isPhoneComplete, phoneForSubmit } from "../utils/phoneFormat";
import { formatClientPhoneForSheets, submitBookingToMakeBackup } from "../utils/makeWebhook";
import { buildCRMPayload, submitLeadToQazCrm } from "../utils/qazcrm";
import { PrivacyPolicyLink } from "../components/PrivacyPolicyLink";
import { useDocumentMeta } from "../utils/useDocumentMeta";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { trackGoal } from "../utils/analytics";

const SERVICE_LABELS: Record<string, string> = {
  wet: "Влажная уборка",
  general: "Генеральная уборка",
};

const ThreadsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 3.094c-.525.235-1.024.544-1.476.915a7.112 7.112 0 0 0-1.186 1.27 7.252 7.252 0 0 0-.814 1.486 7.347 7.347 0 0 0-.405 1.625c-.073.547-.098 1.099-.073 1.648.024.549.098 1.096.22 1.632.122.536.293 1.06.51 1.566s.488 1.003.793 1.477c.305.474.66.923 1.061 1.343s.846.807 1.33 1.16c.484.354 1.003.67 1.552.947.549.278 1.125.512 1.726.702a12.365 12.365 0 0 0 1.859.415c.644.098 1.295.146 1.946.146.652 0 1.302-.049 1.946-.146a12.363 12.363 0 0 0 1.859-.415c.601-.19 1.177-.424 1.726-.702.549-.278 1.068-.593 1.552-.947.484-.354.929-.74 1.33-1.16s.756-.869 1.061-1.343c.305-.474.576-.976.793-1.477s.388-1.03.51-1.566c.122-.536.196-1.083.22-1.632.024-.549 0-1.101-.073-1.648a7.348 7.348 0 0 0-.405-1.625 7.252 7.252 0 0 0-.814-1.486 7.11 7.11 0 0 0-1.186-1.27 6.772 6.772 0 0 0-1.476-.915c-.536-.239-1.099-.415-1.673-.53A7.448 7.448 0 0 0 12 2.5c-.586 0-1.17.098-1.741.256-.571.157-1.125.366-1.661.605l-.412.232z"/>
  </svg>
);

export function Contacts() {
  useDocumentMeta({
    title: "Контакты EcoVibe.kz | Клининг в Астане",
    description:
      "Свяжитесь с EcoVibe.kz: телефон, WhatsApp, адрес и зона обслуживания клининговой компании в Астане. Оставьте заявку на уборку онлайн.",
    path: "/kontakty",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "wet",
    date: "",
    comment: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (formData.honeypot) return;

    if (!formData.name.trim()) {
      toast.error("Укажите ваше имя.");
      return;
    }

    const phoneRaw = formData.phone.trim();
    if (!phoneRaw) {
      toast.error("Укажите номер телефона.");
      return;
    }
    if (!isPhoneComplete(phoneRaw)) {
      toast.error("Номер телефона неполный — проверьте, что указаны все цифры после +7.");
      return;
    }

    const phone = phoneForSubmit(phoneRaw);
    const serviceType = SERVICE_LABELS[formData.service] ?? formData.service;
    const comment = [formData.date && `Желаемая дата: ${formData.date}`, formData.comment.trim()]
      .filter(Boolean)
      .join(". ");

    setIsSubmitting(true);

    const sendToCrm = async () => {
      try {
        const payload = buildCRMPayload({
          name: formData.name.trim(),
          phone,
          serviceType,
          area: 0,
          extras: [],
          totalPrice: 0,
          date: formData.date,
          address: comment,
          website: formData.honeypot,
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
          client_phone: formatClientPhoneForSheets(phone),
          cleaning_type: serviceType,
          area: 1,
          calculated_price: 1,
          extras: comment,
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
      trackGoal("form_submit", { form: "contacts_page", serviceType });
      setFormData({ name: "", phone: "", service: "wet", date: "", comment: "", honeypot: "" });
    } else {
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в WhatsApp.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      value: "+7 707 320 41 99",
      href: "tel:+77073204199",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Быстрый чат",
      href: "https://wa.me/77073204199",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@ecovibe.kz",
      href: "mailto:info@ecovibe.kz",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Режим работы",
      value: "7 дней в неделю, 8:00 - 22:00",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: "Контакты" }]} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">Контакты</h1>
            <p className="text-lg text-gray-600">
              Свяжитесь с нами любым удобным способом
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon;
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${contact.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="mb-2">{contact.title}</h2>
                <p className="text-sm text-gray-600">{contact.value}</p>
              </motion.div>
            );

            return contact.href ? (
              <a
                key={contact.title}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {content}
              </a>
            ) : (
              <div key={contact.title}>{content}</div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6">Оставить заявку</h2>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <CheckCircle2 className="h-12 w-12 text-rose-600" />
                <p className="font-semibold text-gray-900">Заявка отправлена!</p>
                <p className="text-sm text-gray-600">Мы свяжемся с вами в ближайшее время.</p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-sm text-rose-700 underline underline-offset-2 hover:text-rose-800"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  aria-label="Ваше имя"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-60"
                  placeholder="Как вас зовут?"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm">
                  Телефон / WhatsApp *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  aria-label="Телефон или WhatsApp"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setFormData((prev) => ({ ...prev, phone: formatted }));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="+7 7__ ___ __ __"
                />
              </div>

              <div>
                <label htmlFor="service" className="block mb-2 text-sm">
                  Тип услуги *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="wet">Влажная уборка</option>
                  <option value="general">Генеральная уборка</option>
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block mb-2 text-sm">
                  Удобная дата
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  aria-label="Удобная дата"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label htmlFor="comment" className="block mb-2 text-sm">
                  Комментарий
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  aria-label="Комментарий"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  placeholder="Дополнительная информация..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:from-rose-700 hover:to-pink-700 transition-colors font-medium disabled:opacity-70"
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

              <p className="text-center text-xs text-gray-500">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <PrivacyPolicyLink className="text-green-800 underline underline-offset-2 hover:text-green-700">
                  политикой конфиденциальности
                </PrivacyPolicyLink>
              </p>
            </form>
            )}
          </div>

          {/* Service Area & Socials */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6">Зона обслуживания</h2>
              <div className="bg-gradient-to-br from-rose-100 to-orange-100 rounded-xl p-6 mb-4">
                <MapPin className="w-8 h-8 text-rose-600 mb-4" />
                <h3 className="mb-2">Вся Астана</h3>
                <p className="text-sm text-gray-700">
                  Мы работаем во всех районах города. Выезд мастера — бесплатно.
                </p>
              </div>
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=71.470379,51.128422&z=11"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  loading="lazy"
                  title="Карта Астаны"
                ></iframe>
              </div>
            </div>

            <div>
              <h2 className="mb-6">Мы в соцсетях</h2>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/ecovibekz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm">Instagram</h3>
                    <p className="text-xs text-gray-500">Кейсы до/после</p>
                  </div>
                </a>
                <a
                  href="https://www.threads.com/@ecovibekz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    <ThreadsIcon />
                  </div>
                  <div>
                    <h3 className="text-sm">Threads</h3>
                    <p className="text-xs text-gray-500">Новости и обновления</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/77073204199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm">WhatsApp Business</h3>
                    <p className="text-xs text-gray-500">Быстрые ответы</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
