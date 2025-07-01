"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("")
  const [nominalRate, setNominalRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [monthlyPayment, setMonthlyPayment] = useState("")
  const [result, setResult] = useState<{
    actualRate: number
    totalPayment: number
    totalInterest: number
    monthlyPaymentCalc?: number
  } | null>(null)

  const calculateLoanRate = () => {
    const principal = Number.parseFloat(loanAmount)
    const rate = Number.parseFloat(nominalRate) / 100
    const months = Number.parseFloat(loanTerm) * 12

    if (!principal || !rate || !months) return

    // 计算等额本息月供
    const monthlyRate = rate / 12
    const calculatedPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)

    // 如果用户输入了月供，计算实际利率（平息法）
    if (monthlyPayment) {
      const payment = Number.parseFloat(monthlyPayment)
      const totalPayment = payment * months
      const totalInterest = totalPayment - principal

      // 使用IRR方法计算实际年化利率
      let rate = 0.1 // 初始猜测
      for (let i = 0; i < 100; i++) {
        let npv = -principal
        for (let month = 1; month <= months; month++) {
          npv += payment / Math.pow(1 + rate / 12, month)
        }
        if (Math.abs(npv) < 0.01) break

        let dnpv = 0
        for (let month = 1; month <= months; month++) {
          dnpv -= (month * payment) / (12 * Math.pow(1 + rate / 12, month + 1))
        }
        rate = rate - npv / dnpv
      }

      setResult({
        actualRate: rate * 100,
        totalPayment,
        totalInterest,
      })
    } else {
      // 标准等额本息计算
      const totalPayment = calculatedPayment * months
      const totalInterest = totalPayment - principal

      setResult({
        actualRate: rate * 100,
        totalPayment,
        totalInterest,
        monthlyPaymentCalc: calculatedPayment,
      })
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">贷款利率计算器</h1>
        <p className="text-lg text-gray-600">计算真实年化利率，避免被虚假利率误导</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>贷款参数</span>
            </CardTitle>
            <CardDescription>输入贷款信息计算真实利率</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">贷款金额 (元)</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="例如：100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nominalRate">名义年利率 (%)</Label>
              <Input
                id="nominalRate"
                type="number"
                step="0.01"
                placeholder="例如：5"
                value={nominalRate}
                onChange={(e) => setNominalRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanTerm">贷款期限 (年)</Label>
              <Input
                id="loanTerm"
                type="number"
                placeholder="例如：2"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyPayment">月还款额 (元) - 可选</Label>
              <Input
                id="monthlyPayment"
                type="number"
                placeholder="如果已知月供，输入此项计算实际利率"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
              />
              <p className="text-xs text-gray-500">留空则按标准等额本息计算，填写则计算该月供对应的实际利率</p>
            </div>

            <Button onClick={calculateLoanRate} className="w-full">
              计算贷款利率
            </Button>

            {result !== null && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-2">计算结果</h3>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-orange-800">实际年化利率: {result.actualRate.toFixed(2)}%</p>
                  {result.monthlyPaymentCalc && (
                    <p className="text-sm text-orange-700">
                      月供: ¥{result.monthlyPaymentCalc.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}
                    </p>
                  )}
                  <p className="text-sm text-orange-700">
                    总还款: ¥{result.totalPayment.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-orange-700">
                    总利息: ¥{result.totalInterest.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}
                  </p>
                  {monthlyPayment && (
                    <p className="text-xs text-orange-600 mt-2">
                      ⚠️ 实际利率是名义利率的 {(result.actualRate / Number.parseFloat(nominalRate)).toFixed(1)} 倍
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>贷款利率陷阱</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                许多非正规金融机构使用"平息法"计算利息，实际利率远高于名义利率。 因为每月还本金后，实际占用资金在减少。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">平息法 vs 等额本息法：</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • <strong>平息法</strong>: 利息按初始本金计算
                  </li>
                  <li>
                    • <strong>等额本息法</strong>: 利息按剩余本金计算
                  </li>
                  <li>• 平息法实际利率约为名义利率的2倍</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>风险提示：</strong>
              融资租赁公司、小额贷款公司和民间借贷常用平息法。 正规银行使用等额本息法或等额本金法，利率计算更合理。
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>案例对比</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-semibold text-red-800">平息法陷阱</p>
                  <p className="text-red-700">贷款10万元，名义年利率5%，2年期。 月供4583元，实际年化利率高达9.3%！</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-green-800">等额本息法</p>
                  <p className="text-green-700">同样条件下，正规银行等额本息月供约4386元， 实际年化利率就是5%。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
