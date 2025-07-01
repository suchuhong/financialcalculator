"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PresentValueCalculator() {
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
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">现值计算器</h1>
        <p className="text-lg text-gray-600">计算未来现金流的现在价值，帮助您评估投资项目的真实价值</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>计算参数</span>
            </CardTitle>
            <CardDescription>输入相关参数计算现值</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="futureValue">未来价值 (元)</Label>
              <Input
                id="futureValue"
                type="number"
                placeholder="例如：1000000"
                value={futureValue}
                onChange={(e) => setFutureValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">年利率 (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                placeholder="例如：5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">年数</Label>
              <Input
                id="years"
                type="number"
                placeholder="例如：5"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

            <Button onClick={calculatePresentValue} className="w-full">
              计算现值
            </Button>

            {result !== null && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">计算结果</h3>
                <p className="text-2xl font-bold text-blue-800">
                  ¥{result.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  {years}年后的¥{Number.parseFloat(futureValue).toLocaleString("zh-CN")}， 在{interestRate}
                  %年利率下的现值
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
                <span>什么是现值？</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                现值（Present Value）是未来某笔钱在今天的价值。由于金钱具有时间价值， 今天的1元钱比未来的1元钱更有价值。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">计算公式：</h4>
                <p className="font-mono text-sm">PV = FV / (1 + r)^n</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>PV = 现值</li>
                  <li>FV = 未来价值</li>
                  <li>r = 利率</li>
                  <li>n = 年数</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>实际应用：</strong>
              现值计算广泛应用于投资决策、项目评估、债券定价等场景。 当项目的现值大于投资成本时，该项目通常值得投资。
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>案例示例</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-green-800">案例：承诺函价值</p>
                  <p className="text-green-700">
                    一张一年后支付100万元的央行承诺函，在5%市场利率下， 今天的价值是95.2万元。
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800">案例：投资项目评估</p>
                  <p className="text-blue-700">
                    某项目一年后产生100万现金，五年后产生80万现金。 在5%利率下，项目现值为157.9万元。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
