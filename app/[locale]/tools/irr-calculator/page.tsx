"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Plus, Minus, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CashFlow {
  year: number
  amount: number
}

export default function IRRCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("")
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { year: 1, amount: 0 },
    { year: 2, amount: 0 },
    { year: 3, amount: 0 },
    { year: 4, amount: 0 },
    { year: 5, amount: 0 },
  ])
  const [result, setResult] = useState<number | null>(null)

  const addCashFlow = () => {
    const newYear = cashFlows.length + 1
    setCashFlows([...cashFlows, { year: newYear, amount: 0 }])
  }

  const removeCashFlow = (index: number) => {
    if (cashFlows.length > 1) {
      setCashFlows(cashFlows.filter((_, i) => i !== index))
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

    let rate = 0.1 // 初始猜测值10%
    let iteration = 0
    const maxIterations = 100
    const tolerance = 0.0001

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
      if (Math.abs(newRate - rate) < tolerance) break

      rate = newRate
      iteration++
    }

    setResult(rate * 100)
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">IRR计算器</h1>
        <p className="text-lg text-gray-600">计算内含回报率，准确评估投资项目的真实收益率</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>现金流设置</span>
            </CardTitle>
            <CardDescription>输入初始投资和各年现金流</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">初始投资 (元)</Label>
              <Input
                id="initialInvestment"
                type="number"
                placeholder="例如：500000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>各年现金流</Label>
                <Button variant="outline" size="sm" onClick={addCashFlow}>
                  <Plus className="h-4 w-4 mr-1" />
                  添加年份
                </Button>
              </div>

              {cashFlows.map((cf, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Label className="w-16">第{index + 1}年</Label>
                  <Input
                    type="number"
                    placeholder="现金流入"
                    value={cf.amount || ""}
                    onChange={(e) => updateCashFlow(index, Number.parseFloat(e.target.value) || 0)}
                    className="flex-1"
                  />
                  {cashFlows.length > 1 && (
                    <Button variant="outline" size="sm" onClick={() => removeCashFlow(index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button onClick={calculateIRR} className="w-full">
              计算IRR
            </Button>

            {result !== null && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">计算结果</h3>
                <p className="text-2xl font-bold text-purple-800">{result.toFixed(2)}%</p>
                <p className="text-sm text-purple-700 mt-2">该投资项目的内含回报率</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>什么是IRR？</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                内含回报率（IRR）是使投资项目净现值为零的贴现率， 它充分考虑了现金流入和流出的时间节点。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">IRR的优势：</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 考虑资金的时间价值</li>
                  <li>• 反映真实的投资回报率</li>
                  <li>• 便于不同项目间比较</li>
                  <li>• 考虑现金流的时间分布</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>决策准则：</strong>
              当IRR大于资金成本或要求回报率时，项目值得投资。 IRR越高，项目的投资价值越大。
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>网约车投资案例</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-green-800">方案一（稳定收入）</p>
                  <p className="text-green-700">
                    投入50万，5年每年收入10万，第5年卖车9万
                    <br />
                    IRR: 5.2%
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800">方案二（前期高收入）</p>
                  <p className="text-blue-700">
                    投入50万，前2年每年20万，后3年每年5万，第5年卖车9万
                    <br />
                    IRR: 7.5%（最优）
                  </p>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="font-semibold text-orange-800">关键洞察</p>
                  <p className="text-orange-700">早期收回的现金发挥了金钱的时间价值， 即使总收入相同，IRR也会不同。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
