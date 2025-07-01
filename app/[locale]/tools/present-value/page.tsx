import PresentValueCalculatorClient from "@/components/PresentValueCalculatorClient";
import { useTranslations, useLocale } from "next-intl";

// Helper function to get the currency symbol based on locale
function getCurrencySymbol(locale: string) {
  switch (locale) {
    case 'ja': return '円';
    case 'en': return '$';
    case 'zh': return '¥';
    default: return '¥';
  }
}

export default function PresentValueCalculatorPage() {
  const t = useTranslations("PresentValueCalculator");
  const locale = useLocale();
  const currencySymbol = getCurrencySymbol(locale);

  // Organize all translations into a single object to pass as a prop
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
      
      {/* Pass the translations and currency symbol as props to the client component */}
      <PresentValueCalculatorClient translations={translations} currencySymbol={currencySymbol} />
    </div>
  )
}