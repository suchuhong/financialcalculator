"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info, TrendingDown } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 1. 定义 props 的类型，用于接收所有翻译文本
// type BreakevenCalculatorTranslations = {
//   formCard: {
//     title: string;
//     description: string;
//     buyPriceLabel: string;
//     buyPricePlaceholder: string;
//     currentPriceLabel: string;
//     currentPricePlaceholder: string;
//     holdingYearsLabel: string;
//     holdingYearsPlaceholder: string;
//     holdingYearsDescription: string;
//     expectedReturnLabel: string;
//     expectedReturnDescription: string;
//     buttonText: string;
//   };
//   results: {
//     lossAnalysisTitle: string;
//     currentLoss: string;
//     requiredGain: string;
//     trueBreakevenAnalysisTitle: string;
//     trueBreakevenPrice: string;
//     opportunityCost: string;
//     opportunityCostNote: string;
//   };
//   infoCard: {
//     title: string;
//     description: string;
//     formulaTitle: string;
//     formula: string;
//     examples: string[];
//   };
//   alert: {
//     title: string;
//     description: string;
//   };
//   caseStudyCard: {
//     title: string;
//     deepLossCaseTitle: string;
//     deepLossCaseDescription: string;
//     shortTermCaseTitle: string;
//     shortTermCaseDescription: string;
//   };
// };

// 2. 组件接收 translations prop

export default function BreakevenCalculatorClient({ translations, currencySymbol }: { translations: YourTranslationsType, currencySymbol: string }) {
  const [buyPrice, setBuyPrice] = useState("")
  const [currentPrice, setCurrentPrice] = useState("")
  const [holdingYears, setHoldingYears] = useState("")
  const [expectedReturn, setExpectedReturn] = useState("3")
  const [result, setResult] =useState<{
    lossPercentage: number;
    requiredGain: number;
    trueBreakeven: number;
    opportunityCost: number;
  } | null>(null);

  const calculateBreakeven = () => {
    const buy = Number.parseFloat(buyPrice)
    const current = Number.parseFloat(currentPrice)
    const years = Number.parseFloat(holdingYears) || 0
    const returnRate = Number.parseFloat(expectedReturn) / 100

    if (!buy || !current) return

    const lossPercentage = ((buy - current) / buy) * 100
    const requiredGain = ((buy - current) / current) * 100
    const trueBreakeven = buy * Math.pow(1 + returnRate, years)
    const opportunityCost = trueBreakeven - buy

    setResult({
      lossPercentage,
      requiredGain,
      trueBreakeven,
      opportunityCost,
    })
  }

  // 3. 在整个组件中使用 props 替换所有硬编码文本
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>{translations.formCard.title}</span>
          </CardTitle>
          <CardDescription>{translations.formCard.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="buyPrice">{translations.formCard.buyPriceLabel}</Label>
            <Input id="buyPrice" type="number" step="0.01" placeholder={translations.formCard.buyPricePlaceholder} value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentPrice">{translations.formCard.currentPriceLabel}</Label>
            <Input id="currentPrice" type="number" step="0.01" placeholder={translations.formCard.currentPricePlaceholder} value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="holdingYears">{translations.formCard.holdingYearsLabel}</Label>
            <Input id="holdingYears" type="number" placeholder={translations.formCard.holdingYearsPlaceholder} value={holdingYears} onChange={(e) => setHoldingYears(e.target.value)} />
            <p className="text-xs text-gray-500">{translations.formCard.holdingYearsDescription}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedReturn">{translations.formCard.expectedReturnLabel}</Label>
            <Input id="expectedReturn" type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} />
            <p className="text-xs text-gray-500">{translations.formCard.expectedReturnDescription}</p>
          </div>

          <Button onClick={calculateBreakeven} className="w-full">{translations.formCard.buttonText}</Button>

          {result !== null && (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">{translations.results.lossAnalysisTitle}</h3>
                <p className="text-lg font-bold text-red-800">
                  {translations.results.currentLoss.replace('[[lossPercentage]]', Math.abs(result.lossPercentage).toFixed(2))}
                </p>
                <p className="text-sm text-red-700">{translations.results.requiredGain.replace('[[requiredGain]]', result.requiredGain.toFixed(2))}</p>
              </div>

              {holdingYears && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">{translations.results.trueBreakevenAnalysisTitle}</h3>
                  <p className="text-lg font-bold text-orange-800">
                    {/* 2. 在结果显示时，使用 props 中的 currencySymbol */}
                    {translations.results.trueBreakevenPrice
                        .replace('[[currency]]', currencySymbol)
                        .replace('[[price]]', result.trueBreakeven.toFixed(2))
                    }
                  </p>
                  <p className="text-sm text-orange-700">
                  {translations.results.opportunityCost
                        .replace('[[currency]]', currencySymbol)
                        .replace('[[cost]]', result.opportunityCost.toFixed(2))
                    }
                  </p>
                  <p className="text-xs text-orange-600 mt-2">{translations.results.opportunityCostNote.replace('[[years]]', holdingYears)}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* 右侧信息卡片，同样使用 translations */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5" />
              <span>{translations.infoCard.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{translations.infoCard.description}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{translations.infoCard.formulaTitle}</h4>
              <p className="font-mono text-sm">{translations.infoCard.formula}</p>
              <div className="mt-3 space-y-1 text-sm">
                {translations.infoCard.examples.map((item, index) => <p key={index}>{item}</p>)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert>
          <TrendingDown className="h-4 w-4" />
          <AlertDescription>
            <strong>{translations.alert.title}</strong>
            {translations.alert.description}
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader><CardTitle>{translations.caseStudyCard.title}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="bg-red-50 p-3 rounded">
                <p className="font-semibold text-red-800">{translations.caseStudyCard.deepLossCaseTitle}</p>
                <p className="text-red-700">{translations.caseStudyCard.deepLossCaseDescription}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <p className="font-semibold text-orange-800">{translations.caseStudyCard.shortTermCaseTitle}</p>
                <p className="text-orange-700">{translations.caseStudyCard.shortTermCaseDescription}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}