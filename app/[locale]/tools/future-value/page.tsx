"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info, TrendingUp } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function FutureValueCalculator() {
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
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">未来价值计算器</h1>
        <p className="text-lg text-gray-600">预测当前投资在未来某个时间点的价值</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>计算参数</span>
            </CardTitle>
            <CardDescription>输入相关参数计算未来价值</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="presentValue">现在价值 (元)</Label>
              <Input
                id="presentValue"
                type="number"
                placeholder="例如：100000"
                value={presentValue}
                onChange={(e) => setPresentValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">年利率 (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                placeholder="例如：8"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">投资年数</Label>
              <Input
                id="years"
                type="number"
                placeholder="例如：10"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compoundFrequency">复利频率</Label>
              <select
                id="compoundFrequency"
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">年复利</option>
                <option value="2">半年复利</option>
                <option value="4">季度复利</option>
                <option value="12">月复利</option>
                <option value="365">日复利</option>
              </select>
            </div>

            <Button onClick={calculateFutureValue} className="w-full">
              计算未来价值
            </Button>

            {result !== null && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">计算结果</h3>
                <p className="text-2xl font-bold text-green-800">
                  ¥{result.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-green-700 mt-2">
                  ¥{Number.parseFloat(presentValue).toLocaleString("zh-CN")}在{interestRate}%年利率下，
                  {years}年后的价值
                </p>
                <p className="text-sm text-green-600 mt-1">
                  总收益：¥
                  {(result - Number.parseFloat(presentValue)).toLocaleString("zh-CN", { maximumFractionDigits: 2 })}
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
                <span>什么是未来价值？</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                未来价值（Future Value）是今天的金钱在未来某个时间点的价值。 它考虑了复利效应，即利息产生利息的现象。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">复利计算公式：</h4>
                <p className="font-mono text-sm">FV = PV × (1 + r/n)^(n×t)</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>FV = 未来价值</li>
                  <li>PV = 现在价值</li>
                  <li>r = 年利率</li>
                  <li>n = 每年复利次数</li>
                  <li>t = 年数</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              <strong>复利的威力：</strong>
              爱因斯坦称复利为"世界第八大奇迹"。时间越长，复利效应越明显。 即使是小额投资，长期坚持也能产生惊人的回报。
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>投资案例</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800">案例：长期投资</p>
                  <p className="text-blue-700">
                    投资10万元，年化收益8%，10年后价值约21.6万元， 收益翻倍体现了复利的威力。
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-green-800">案例：复利频率影响</p>
                  <p className="text-green-700">
                    同样条件下，月复利比年复利多产生约3000元收益， 说明复利频率的重要性。
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
