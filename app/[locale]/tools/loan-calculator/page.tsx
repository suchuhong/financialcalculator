import LoanCalculatorClient from "@/components/LoanCalculatorClient";
import { useTranslations, useLocale } from "next-intl";

// 定义一个简单的函数来获取特定语言的货币符号
function getCurrencySymbol(locale: string) {
  switch (locale) {
    case 'ja': return '円';
    case 'en': return '$';
    case 'zh': return '元';
    default: return '$';
  }
}

export default function LoanCalculatorPage() {
  const t = useTranslations("LoanCalculator");
  const locale = useLocale();
  const currencySymbol = getCurrencySymbol(locale);

  // 将所有需要的翻译文本组织成一个对象
  const translations = {
    formCard: t.raw('formCard'),
    results: t.raw('results'),
    infoCard: t.raw('infoCard'),
    alert: t.raw('alert'),
    caseStudyCard: t.raw('caseStudyCard'),
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>
      
      {/* 将翻译好的文本和货币符号作为 props 传递 */}
      <LoanCalculatorClient translations={translations} currencySymbol={currencySymbol} />
    </div>
  )
}