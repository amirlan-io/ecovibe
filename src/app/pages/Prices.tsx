import { Link } from "react-router";
import { Check, Calculator as CalculatorIcon } from "lucide-react";
import { motion } from "motion/react";
import { Calculator } from "../components/Calculator";

export function Prices() {
  const included = [
    "Все eco-средства — наши",
    "Инвентарь и оборудование",
    "Выезд по всей Астане",
    "Гарантия результата",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">Цены на уборку</h1>
            <p className="text-lg text-gray-600">
              Прозрачные тарифы без скрытых платежей
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Info Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Базовые тарифы</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <h3 className="mb-2">Влажная уборка</h3>
            <p className="text-3xl font-medium text-green-600 mb-2">550 ₸</p>
            <p className="text-sm text-gray-600">за квадратный метр</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <h3 className="mb-2">Генеральная уборка</h3>
            <p className="text-3xl font-medium text-green-600 mb-2">650 ₸</p>
            <p className="text-sm text-gray-600">за квадратный метр</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <h3 className="mb-2">После ремонта</h3>
            <p className="text-3xl font-medium text-green-600 mb-2">850 ₸</p>
            <p className="text-sm text-gray-600">за квадратный метр</p>
          </div>
        </div>
        <div>
          <h2 className="mb-6">Что включено в цену</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white border border-gray-200 p-4 rounded-lg">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <CalculatorIcon className="w-6 h-6 text-white" />
            </div>
            <h2>Калькулятор стоимости</h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Рассчитайте точную стоимость уборки с учетом всех параметров
          </p>
          <Calculator />
        </div>
      </section>
    </div>
  );
}
