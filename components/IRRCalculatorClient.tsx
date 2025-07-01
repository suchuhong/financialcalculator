"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Plus, Minus, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 定义 props 类型
type Translations = {
  formCard: {
    title: string;
    description: string;
    initialInvestmentLabel: string;
    initialInvestmentPlaceholder: string;
    cashFlowsLabel: string;
    addYearButton: string;
    yearLabel: string;
    cashFlowPlaceholder: string;
    calculateButton: string;
  };
  results: {
    title: string;
    description: string;
  };
  infoCard: {
    title: string;
    description: string;
    advantagesTitle: string;
    advantagesList: string[];
  };
  alert: {
    title: string;
    description: string;
  };
  caseStudyCard: {
    title: string;
    scenario1Title: string;
    scenario1Description: string;
    scenario2Title: string;
    scenario2Description: string;
    insightTitle: string;
    insightDescription: string;
  };
};

interface CashFlow {
  year: number
  amount: number
}

export default function IRRCalculatorClient({ translations: t, currencySymbol }: { translations: Translations, currencySymbol: string }) {
  const [initialInvestment, setInitialInvestment] = useState("")
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { year: 1, amount: 0 }, { year: 2, amount: 0 }, { year: 3, amount: 0 }, { year: 4, amount: 0 }, { year: 5, amount: 0 },
  ])
  const [result, setResult] = useState<number | null>(null)

  const addCashFlow = () => {
    const newYear = cashFlows.length + 1
    setCashFlows([...cashFlows, { year: newYear, amount: 0 }])
  }

  const removeCashFlow = (index: number) => {
    if (cashFlows.length > 1) {
      const updatedFlows = cashFlows.filter((_, i) => i !== index)
      // 更新年份
      setCashFlows(updatedFlows.map((cf, i) => ({ ...cf, year: i + 1 })))
    }
  }

  const updateCashFlow = (index: number, amount: number) => {
    const updated = [...cashFlows]
    updated[index].amount = amount
    setCashFlows(updated)
  }

  // 简化的IRR计算（使用牛顿法近似）
  const calculateIRR = () => {
    const investment = Number.parseFloat(initialInvestment)
    if (!investment || cashFlows.some((cf) => isNaN(cf.amount))) return

    let rate = 0.1, iteration = 0
    const maxIterations = 100, tolerance = 0.0001

    while (iteration < maxIterations) {
      let npv = -investment
      let dnpv = 0
      cashFlows.forEach((cf, index) => {
        const year = index + 1
        npv += cf.amount / Math.pow(1 + rate, year)
        dnpv -= (year * cf.amount) / Math.pow(1 + rate, year + 1)
      })
      if (Math.abs(npv) < tolerance) break
      const newRate = rate - npv / dnpv
      if (isNaN(newRate) || !isFinite(newRate) || Math.abs(newRate - rate) < tolerance) break
      rate = newRate
      iteration++
    }
    setResult(rate * 100)
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
            <Label htmlFor="initialInvestment">{t.formCard.initialInvestmentLabel.replace('{currency}', currencySymbol)}</Label>
            <Input id="initialInvestment" type="number" placeholder={t.formCard.initialInvestmentPlaceholder} value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t.formCard.cashFlowsLabel}</Label>
              <Button variant="outline" size="sm" onClick={addCashFlow}>
                <Plus className="h-4 w-4 mr-1" />{t.formCard.addYearButton}
              </Button>
            </div>
            {cashFlows.map((cf, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Label className="w-20 shrink-0">{t.formCard.yearLabel.replace('{year}', (index + 1).toString())}</Label>
                <Input type="number" placeholder={t.formCard.cashFlowPlaceholder} value={cf.amount || ""} onChange={(e) => updateCashFlow(index, Number.parseFloat(e.target.value) || 0)} className="flex-1" />
                {cashFlows.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeCashFlow(index)} className="text-muted-foreground">
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button onClick={calculateIRR} className="w-full">{t.formCard.calculateButton}</Button>
          {result !== null && (
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-purple-900 mb-2">{t.results.title}</h3>
              <p className="text-3xl font-bold text-purple-800">{result.toFixed(2)}%</p>
              <p className="text-sm text-purple-700 mt-1">{t.results.description}</p>
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
              <h4 className="font-semibold mb-2">{t.infoCard.advantagesTitle}</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-none pl-0">
                {t.infoCard.advantagesList.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>{t.alert.title}</strong>{t.alert.description}
          </AlertDescription>
        </Alert>
        <Card>
          <CardHeader><CardTitle>{t.caseStudyCard.title}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-800">{t.caseStudyCard.scenario1Title}</p>
                <p className="text-green-700">{t.caseStudyCard.scenario1Description}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-800">{t.caseStudyCard.scenario2Title}</p>
                <p className="text-blue-700">{t.caseStudyCard.scenario2Description}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <p className="font-semibold text-orange-800">{t.caseStudyCard.insightTitle}</p>
                <p className="text-orange-700">{t.caseStudyCard.insightDescription}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}