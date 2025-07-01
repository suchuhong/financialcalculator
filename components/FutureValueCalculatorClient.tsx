"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info, TrendingUp } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 1. 为传入的 props 定义详细的 TypeScript 类型，以获得类型安全和代码提示
type Translations = {
  formCard: {
    title: string;
    description: string;
    presentValueLabel: string;
    presentValuePlaceholder: string;
    interestRateLabel: string;
    interestRatePlaceholder: string;
    yearsLabel: string;
    yearsPlaceholder: string;
    compoundFrequencyLabel: string;
    compoundFrequencyOptions: { value: string; label: string }[];
    buttonText: string;
  };
  results: {
    title: string;
    summary: string;
    totalInterest: string;
  };
  infoCard: {
    title: string;
    description: string;
    formulaTitle: string;
    formula: string;
    formulaTerms: string[];
  };
  alert: {
    title: string;
    description: string;
  };
  caseStudyCard: {
    title: string;
    longTermCaseTitle: string;
    longTermCaseDescription: string;
    frequencyCaseTitle: string;
    frequencyCaseDescription: string;
  };
};

// 2. 组件接收 translations 和 currencySymbol 作为 props
export default function FutureValueCalculatorClient({ translations: t, currencySymbol }: { translations: Translations, currencySymbol: string }) {
  // 3. 使用 useLocale 钩子获取当前语言环境，用于数字的本地化格式
  const locale = useLocale(); 

  const [presentValue, setPresentValue] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [years, setYears] = useState("")
  const [compoundFrequency, setCompoundFrequency] = useState("1")
  const [result, setResult] = useState<number | null>(null)

  const calculateFutureValue = () => {
    const pv = Number.parseFloat(presentValue)
    const rate = Number.parseFloat(interestRate) / 100
    const n = Number.parseFloat(years)
    const freq = Number.parseFloat(compoundFrequency)

    if (pv && rate && n && freq) {
      const fv = pv * Math.pow(1 + rate / freq, freq * n)
      setResult(fv)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>{t.formCard.title}</span>
          </CardTitle>
          <CardDescription>{t.formCard.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="presentValue">{t.formCard.presentValueLabel}</Label>
            <Input id="presentValue" type="number" placeholder={t.formCard.presentValuePlaceholder} value={presentValue} onChange={(e) => setPresentValue(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">{t.formCard.interestRateLabel}</Label>
            <Input id="interestRate" type="number" step="0.01" placeholder={t.formCard.interestRatePlaceholder} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">{t.formCard.yearsLabel}</Label>
            <Input id="years" type="number" placeholder={t.formCard.yearsPlaceholder} value={years} onChange={(e) => setYears(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compoundFrequency">{t.formCard.compoundFrequencyLabel}</Label>
            {/* 4. 从 props 动态渲染下拉选项 */}
            <select
              id="compoundFrequency"
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.formCard.compoundFrequencyOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <Button onClick={calculateFutureValue} className="w-full">{t.formCard.buttonText}</Button>

          {result !== null && (
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-green-900 mb-2">{t.results.title}</h3>
              <p className="text-3xl font-bold text-green-800">
                {/* 5. 使用 locale 和 currencySymbol 进行格式化 */}
                {currencySymbol}{result.toLocaleString(locale, { maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-green-700 mt-2">
                {currencySymbol}{Number.parseFloat(presentValue).toLocaleString(locale)}
                {t.results.summary
                  .replace('{rate}', interestRate)
                  .replace('{years}', years)}
              </p>
              <p className="text-sm text-green-600 mt-1">
                {t.results.totalInterest}
                {currencySymbol}{(result - Number.parseFloat(presentValue)).toLocaleString(locale, { maximumFractionDigits: 2 })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5" />
              <span>{t.infoCard.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{t.infoCard.description}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{t.infoCard.formulaTitle}</h4>
              <p className="font-mono text-sm">{t.infoCard.formula}</p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                {t.infoCard.formulaTerms.map((term, index) => <li key={index}>{term}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Alert>
          <TrendingUp className="h-4 w-4" />
          <AlertDescription>
            <strong>{t.alert.title}</strong>
            {t.alert.description}
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>{t.caseStudyCard.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-800">{t.caseStudyCard.longTermCaseTitle}</p>
                <p className="text-blue-700">{t.caseStudyCard.longTermCaseDescription}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-800">{t.caseStudyCard.frequencyCaseTitle}</p>
                <p className="text-green-700">{t.caseStudyCard.frequencyCaseDescription}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}