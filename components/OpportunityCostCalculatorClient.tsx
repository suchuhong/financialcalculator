"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info, Plus, Minus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 定义 props 类型
type Translations = {
  formCard: {
    title: string; addButton: string; description: string; optionNamePlaceholder: string; amountLabel: string; amountPlaceholder: string; returnLabel: string; returnPlaceholder: string; yearsLabel: string; yearsPlaceholder: string; calculateButton: string; defaultOptionName: string;
  };
  results: {
    bestOptionTitle: string; analysisTitle: string; futureValueLabel: string; opportunityCostLabel: string; bestChoiceLabel: string;
  };
  infoCard: {
    title: string; description: string; applicationsTitle: string; applicationsList: string[];
  };
  alert: {
    title: string; description: string;
  };
  caseStudyCard: {
    title: string; rentCaseTitle: string; rentCaseDescription: string; investmentCaseTitle: string; investmentCaseDescription: string;
  };
};

interface Investment {
  name: string
  amount: number
  return: number
  years: number
}

export default function OpportunityCostCalculatorClient({ translations: t, currencySymbol }: { translations: Translations, currencySymbol: string }) {
  const locale = useLocale();

  // 1. 使用函数进行延迟初始化，确保初始名称是翻译过的
  const getInitialInvestments = () => [
    { name: t.formCard.defaultOptionName.replace('{letter}', 'A'), amount: 0, return: 0, years: 0 },
    { name: t.formCard.defaultOptionName.replace('{letter}', 'B'), amount: 0, return: 0, years: 0 },
  ];

  const [investments, setInvestments] = useState<Investment[]>(getInitialInvestments)
  const [result, setResult] = useState<{ bestOption: string; opportunityCosts: { name: string; cost: number; futureValue: number }[] } | null>(null)

  const addInvestment = () => {
    // 2. 使用翻译模板生成新方案的名称
    const newName = t.formCard.defaultOptionName.replace('{letter}', String.fromCharCode(65 + investments.length));
    setInvestments([...investments, { name: newName, amount: 0, return: 0, years: 0 }])
  }

  const removeInvestment = (index: number) => {
    if (investments.length > 2) {
      setInvestments(investments.filter((_, i) => i !== index))
    }
  }

  const updateInvestment = (index: number, field: keyof Investment, value: string | number) => {
    const updated = [...investments]
    updated[index] = { ...updated[index], [field]: value }
    setInvestments(updated)
  }

  const calculateOpportunityCost = () => {
    const validInvestments = investments.filter((inv) => inv.amount > 0 && inv.return > 0 && inv.years > 0)
    if (validInvestments.length < 2) {
      setResult(null); // 如果不满足条件，清空结果
      return
    }

    const futureValues = validInvestments.map((inv) => ({
      name: inv.name,
      futureValue: inv.amount * Math.pow(1 + inv.return / 100, inv.years),
    }))

    if (futureValues.length === 0) return;

    const bestOption = futureValues.reduce((best, current) => (current.futureValue > best.futureValue ? current : best))
    const opportunityCosts = futureValues.map((option) => ({
      name: option.name,
      cost: bestOption.futureValue - option.futureValue,
      futureValue: option.futureValue,
    }))
    setResult({ bestOption: bestOption.name, opportunityCosts })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>{t.formCard.title}</span>
            </div>
            <Button variant="outline" size="sm" onClick={addInvestment}><Plus className="h-4 w-4 mr-1" />{t.formCard.addButton}</Button>
          </CardTitle>
          <CardDescription>{t.formCard.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
            {investments.map((investment, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 bg-background">
                <div className="flex items-center justify-between">
                  <Input placeholder={t.formCard.optionNamePlaceholder} value={investment.name} onChange={(e) => updateInvestment(index, "name", e.target.value)} className="font-semibold text-base w-36" />
                  {investments.length > 2 && (
                    <Button variant="ghost" size="icon" onClick={() => removeInvestment(index)} className="text-muted-foreground"><Minus className="h-4 w-4" /></Button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-1"><Label className="text-xs">{t.formCard.amountLabel}</Label><Input type="number" placeholder={t.formCard.amountPlaceholder} value={investment.amount || ""} onChange={(e) => updateInvestment(index, "amount", Number.parseFloat(e.target.value) || 0)} /></div>
                  <div className="space-y-1"><Label className="text-xs">{t.formCard.returnLabel}</Label><Input type="number" step="0.1" placeholder={t.formCard.returnPlaceholder} value={investment.return || ""} onChange={(e) => updateInvestment(index, "return", Number.parseFloat(e.target.value) || 0)} /></div>
                  <div className="space-y-1"><Label className="text-xs">{t.formCard.yearsLabel}</Label><Input type="number" placeholder={t.formCard.yearsPlaceholder} value={investment.years || ""} onChange={(e) => updateInvestment(index, "years", Number.parseFloat(e.target.value) || 0)} /></div>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={calculateOpportunityCost} className="w-full mt-6">{t.formCard.calculateButton}</Button>
          {result && (
            <div className="space-y-4 pt-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-green-900 mb-1">{t.results.bestOptionTitle}</h3>
                <p className="text-xl font-bold text-green-800">{result.bestOption}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">{t.results.analysisTitle}</h3>
                {result.opportunityCosts.map((option) => (
                  <div key={option.name} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{option.name}</span>
                      <div className="text-right">
                        <p className="text-sm text-gray-800">{t.results.futureValueLabel}: {currencySymbol}{option.futureValue.toLocaleString(locale, { maximumFractionDigits: 0 })}</p>
                        {option.cost > 0 && <p className="text-sm text-red-600">{t.results.opportunityCostLabel}: {currencySymbol}{option.cost.toLocaleString(locale, { maximumFractionDigits: 0 })}</p>}
                        {option.cost === 0 && <p className="text-sm text-green-600 font-semibold">{t.results.bestChoiceLabel}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center space-x-2"><Info className="h-5 w-5" /><span>{t.infoCard.title}</span></CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{t.infoCard.description}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{t.infoCard.applicationsTitle}</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-none pl-0">
                {t.infoCard.applicationsList.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription><strong>{t.alert.title}</strong>{t.alert.description}</AlertDescription>
        </Alert>
        <Card>
          <CardHeader><CardTitle>{t.caseStudyCard.title}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-50 p-3 rounded"><p className="font-semibold text-blue-800">{t.caseStudyCard.rentCaseTitle}</p><p className="text-blue-700">{t.caseStudyCard.rentCaseDescription}</p></div>
              <div className="bg-purple-50 p-3 rounded"><p className="font-semibold text-purple-800">{t.caseStudyCard.investmentCaseTitle}</p><p className="text-purple-700">{t.caseStudyCard.investmentCaseDescription}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}