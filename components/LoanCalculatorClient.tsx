"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 定义 props 类型
type Translations = {
  formCard: {
    title: string; description: string; loanAmountLabel: string; loanAmountPlaceholder: string; nominalRateLabel: string; nominalRatePlaceholder: string; loanTermLabel: string; loanTermPlaceholder: string; monthlyPaymentLabel: string; monthlyPaymentPlaceholder: string; monthlyPaymentDescription: string; calculateButton: string;
  };
  results: {
    title: string; actualRate: string; monthlyPayment: string; totalPayment: string; totalInterest: string; rateMultiplierWarning: string;
  };
  infoCard: {
    title: string; description: string; comparisonTitle: string; comparisonList: { term: string; desc: string; }[];
  };
  alert: {
    title: string; description: string;
  };
  caseStudyCard: {
    title: string; flatRateCaseTitle: string; flatRateCaseDescription: string; amortizedCaseTitle: string; amortizedCaseDescription: string;
  };
};

export default function LoanCalculatorClient({ translations: t, currencySymbol }: { translations: Translations, currencySymbol: string }) {
  const locale = useLocale();
  const [loanAmount, setLoanAmount] = useState("")
  const [nominalRate, setNominalRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [monthlyPayment, setMonthlyPayment] = useState("")
  const [result, setResult] = useState<{ actualRate: number; totalPayment: number; totalInterest: number; monthlyPaymentCalc?: number; } | null>(null)

  const calculateLoanRate = () => {
    const principal = Number.parseFloat(loanAmount)
    const nomRate = Number.parseFloat(nominalRate) / 100
    const months = Number.parseFloat(loanTerm) * 12
    if (!principal || !nomRate || !months) return

    if (monthlyPayment) {
      // 用户输入了月供，反推实际利率
      const payment = Number.parseFloat(monthlyPayment)
      const totalPayment = payment * months
      const totalInterest = totalPayment - principal
      let rate = 0.1, iteration = 0
      while (iteration < 100) {
        let npv = principal, dnpv = 0
        for (let m = 1; m <= months; m++) {
          npv -= payment / Math.pow(1 + rate / 12, m)
        }
        if (Math.abs(npv) < 0.01) break
        for (let m = 1; m <= months; m++) {
          dnpv += (m * payment) / (12 * Math.pow(1 + rate / 12, m + 1))
        }
        rate = rate + npv / dnpv
        iteration++
      }
      setResult({ actualRate: rate * 100, totalPayment, totalInterest })
    } else {
      // 标准等额本息计算
      const monthlyRate = nomRate / 12
      const calculatedPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      const totalPayment = calculatedPayment * months
      const totalInterest = totalPayment - principal
      setResult({ actualRate: nomRate * 100, totalPayment, totalInterest, monthlyPaymentCalc: calculatedPayment })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2"><Calculator className="h-5 w-5" /><span>{t.formCard.title}</span></CardTitle>
          <CardDescription>{t.formCard.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="loanAmount">{t.formCard.loanAmountLabel.replace('{currency}', currencySymbol)}</Label>
            <Input id="loanAmount" type="number" placeholder={t.formCard.loanAmountPlaceholder} value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nominalRate">{t.formCard.nominalRateLabel}</Label>
            <Input id="nominalRate" type="number" step="0.01" placeholder={t.formCard.nominalRatePlaceholder} value={nominalRate} onChange={(e) => setNominalRate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanTerm">{t.formCard.loanTermLabel}</Label>
            <Input id="loanTerm" type="number" placeholder={t.formCard.loanTermPlaceholder} value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyPayment">{t.formCard.monthlyPaymentLabel.replace('{currency}', currencySymbol)}</Label>
            <Input id="monthlyPayment" type="number" placeholder={t.formCard.monthlyPaymentPlaceholder} value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
            <p className="text-xs text-muted-foreground">{t.formCard.monthlyPaymentDescription}</p>
          </div>
          <Button onClick={calculateLoanRate} className="w-full">{t.formCard.calculateButton}</Button>
          {result !== null && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">{t.results.title}</h3>
              <div className="space-y-1">
                <p className="text-lg font-bold text-orange-800">{t.results.actualRate.replace('{rate}', result.actualRate.toFixed(2))}</p>
                {result.monthlyPaymentCalc && (
                  <p className="text-sm text-orange-700">{t.results.monthlyPayment.replace('{currency}', currencySymbol).replace('{payment}', result.monthlyPaymentCalc.toLocaleString(locale, { maximumFractionDigits: 2 }))}</p>
                )}
                <p className="text-sm text-orange-700">{t.results.totalPayment.replace('{currency}', currencySymbol).replace('{payment}', result.totalPayment.toLocaleString(locale, { maximumFractionDigits: 2 }))}</p>
                <p className="text-sm text-orange-700">{t.results.totalInterest.replace('{currency}', currencySymbol).replace('{interest}', result.totalInterest.toLocaleString(locale, { maximumFractionDigits: 2 }))}</p>
                {monthlyPayment && nominalRate && (
                  <p className="text-xs text-orange-600 mt-2">{t.results.rateMultiplierWarning.replace('{multiplier}', (result.actualRate / Number.parseFloat(nominalRate)).toFixed(1))}</p>
                )}
              </div>
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
              <h4 className="font-semibold mb-2">{t.infoCard.comparisonTitle}</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                {t.infoCard.comparisonList.map(item => <li key={item.term}><strong>• {item.term}:</strong> {item.desc}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{t.alert.title}</strong>{t.alert.description}
          </AlertDescription>
        </Alert>
        <Card>
          <CardHeader><CardTitle>{t.caseStudyCard.title}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="bg-red-50 p-3 rounded">
                <p className="font-semibold text-red-800">{t.caseStudyCard.flatRateCaseTitle}</p>
                <p className="text-red-700">{t.caseStudyCard.flatRateCaseDescription}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-800">{t.caseStudyCard.amortizedCaseTitle}</p>
                <p className="text-green-700">{t.caseStudyCard.amortizedCaseDescription}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}