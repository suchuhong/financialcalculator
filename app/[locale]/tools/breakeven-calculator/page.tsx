import BreakevenCalculatorClient from "@/components/BreakevenCalculatorClient";
import { useTranslations, useLocale } from "next-intl"; // 1. 导入 useLocale

// 2. 创建一个辅助函数来根据 locale 获取货币符号
function getCurrencySymbol(locale: string) {
  switch (locale) {
    case 'en':
      return '$';
    case 'ja':
      return '円';
    case 'zh':
      return '¥';
    default:
      return '¥'; // 默认值
  }
}

export default function BreakevenCalculatorPage() {
  const t = useTranslations("BreakevenCalculator");
  const locale = useLocale(); // 3. 获取当前语言环境
  const currencySymbol = getCurrencySymbol(locale); // 4. 获取对应的货币符号

  // 将所有需要的翻译文本组织成一个对象
  const translations = {
    formCard: {
      title: t('formCard.title'),
      description: t('formCard.description'),
      // 5. 使用动态的 currencySymbol 替换硬编码的 '元'
      buyPriceLabel: t('formCard.buyPriceLabel', { currency: currencySymbol }),
      buyPricePlaceholder: t('formCard.buyPricePlaceholder'),
      currentPriceLabel: t('formCard.currentPriceLabel', { currency: currencySymbol }),
      currentPricePlaceholder: t('formCard.currentPricePlaceholder'),
      holdingYearsLabel: t('formCard.holdingYearsLabel'),
      holdingYearsPlaceholder: t('formCard.holdingYearsPlaceholder'),
      holdingYearsDescription: t('formCard.holdingYearsDescription'),
      expectedReturnLabel: t('formCard.expectedReturnLabel'),
      expectedReturnDescription: t('formCard.expectedReturnDescription'),
      buttonText: t('formCard.buttonText'),
    },
    results: {
      lossAnalysisTitle: t('results.lossAnalysisTitle'),
      currentLoss: t('results.currentLoss'),
      requiredGain: t('results.requiredGain'),
      trueBreakevenAnalysisTitle: t('results.trueBreakevenAnalysisTitle'),
      // 注意：这里只传递模板，不传递值
      trueBreakevenPrice: t('results.trueBreakevenPrice'),
      opportunityCost: t('results.opportunityCost'),
      opportunityCostNote: t('results.opportunityCostNote'),
    },
    infoCard: t.raw('infoCard'),
    alert: t.raw('alert'),
    caseStudyCard: t.raw('caseStudyCard'),
  };
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>
      {/* 6. 将 currencySymbol 作为 prop 传递给客户端组件 */}
      <BreakevenCalculatorClient translations={translations} currencySymbol={currencySymbol} />
    </div>
  )
}