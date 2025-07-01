"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define the type for the translations prop
type Translations = {
  formCard: {
    title: string; description: string; futureValueLabel: string; futureValuePlaceholder: string; interestRateLabel: string; interestRatePlaceholder: string; yearsLabel: string; yearsPlaceholder: string; calculateButton: string;
  };
  results: {
    title: string; summary: string;
  };
  infoCard: {
    title: string; description: string; formulaTitle: string; formula: string; formulaTerms: string[];
  };
  alert: {
    title: string; description: string;
  };
  caseStudyCard: {
    title: string; commitmentCaseTitle: string; commitmentCaseDescription: string; projectCaseTitle: string; projectCaseDescription: string;
  };
};

export default function PresentValueCalculatorClient({ translations: t, currencySymbol }: { translations: Translations, currencySymbol: string }) {
  const locale = useLocale();
  const [futureValue, setFutureValue] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [years, setYears] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculatePresentValue = () => {
    const fv = Number.parseFloat(futureValue)
    const rate = Number.parseFloat(interestRate) / 100
    const n = Number.parseFloat(years)

    if (fv && rate && n) {
      const pv = fv / Math.pow(1 + rate, n)
      setResult(pv)
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
            <Label htmlFor="futureValue">{t.formCard.futureValueLabel.replace('{currency}', currencySymbol)}</Label>
            <Input id="futureValue" type="number" placeholder={t.formCard.futureValuePlaceholder} value={futureValue} onChange={(e) => setFutureValue(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestRate">{t.formCard.interestRateLabel}</Label>
            <Input id="interestRate" type="number" step="0.01" placeholder={t.formCard.interestRatePlaceholder} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years">{t.formCard.yearsLabel}</Label>
            <Input id="years" type="number" placeholder={t.formCard.yearsPlaceholder} value={years} onChange={(e) => setYears(e.target.value)} />
          </div>
          <Button onClick={calculatePresentValue} className="w-full">{t.formCard.calculateButton}</Button>
          {result !== null && (
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-blue-900 mb-2">{t.results.title}</h3>
              <p className="text-3xl font-bold text-blue-800">
                {currencySymbol}{result.toLocaleString(locale, { maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-blue-700 mt-2">
                {t.results.summary
                  .replace('{years}', years)
                  .replace('{currency}', currencySymbol)
                  .replace('{fv}', Number.parseFloat(futureValue).toLocaleString(locale))
                  .replace('{rate}', interestRate)
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2"><Info className="h-5 w-5" /><span>{t.infoCard.title}</span></CardTitle>
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
          <Info className="h-4 w-4" />
          <AlertDescription><strong>{t.alert.title}</strong>{t.alert.description}</AlertDescription>
        </Alert>
        <Card>
          <CardHeader><CardTitle>{t.caseStudyCard.title}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-800">{t.caseStudyCard.commitmentCaseTitle}</p>
                <p className="text-green-700">{t.caseStudyCard.commitmentCaseDescription}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-800">{t.caseStudyCard.projectCaseTitle}</p>
                <p className="text-blue-700">{t.caseStudyCard.projectCaseDescription}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}