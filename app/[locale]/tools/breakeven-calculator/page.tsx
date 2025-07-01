"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info, TrendingDown } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BreakevenCalculator() {
  const [buyPrice, setBuyPrice] = useState("")
  const [currentPrice, setCurrentPrice] = useState("")
  const [holdingYears, setHoldingYears] = useState("")
  const [expectedReturn, setExpectedReturn] = useState("3")
  const [result, setResult] = useState<{
    lossPercentage: number
    requiredGain: number
    trueBreakeven: number
    opportunityCost: number
  } | null>(null)

  const calculateBreakeven = () => {
    const buy = Number.parseFloat(buyPrice)
    const current = Number.parseFloat(currentPrice)
    const years = Number.parseFloat(holdingYears) || 0
    const returnRate = Number.parseFloat(expectedReturn) / 100

    if (!buy || !current) return

    const lossPercentage = ((buy - current) / buy) * 100
    const requiredGain = ((buy - current) / current) * 100

    // 考虑机会成本的真实回本价格
    const trueBreakeven = buy * Math.pow(1 + returnRate, years)
    const opportunityCost = trueBreakeven - buy

    setResult({
      lossPercentage,
      requiredGain,
      trueBreakeven,
      opportunityCost,
    })
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">投资回本计算器</h1>
        <p className="text-lg text-gray-600">计算股票下跌后需要多少涨幅才能真正回本</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>投资参数</span>
            </CardTitle>
            <CardDescription>输入投资信息计算回本要求</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="buyPrice">买入价格 (元)</Label>
              <Input
                id="buyPrice"
                type="number"
                step="0.01"
                placeholder="例如：100"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPrice">当前价格 (元)</Label>
              <Input
                id="currentPrice"
                type="number"
                step="0.01"
                placeholder="例如：70"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="holdingYears">持有年数 (可选)</Label>
              <Input
                id="holdingYears"
                type="number"
                placeholder="例如：3"
                value={holdingYears}
                onChange={(e) => setHoldingYears(e.target.value)}
              />
              <p className="text-xs text-gray-500">用于计算机会成本</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedReturn">预期年化收益率 (%)</Label>
              <Input
                id="expectedReturn"
                type="number"
                step="0.1"
                placeholder="例如：3"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
              />
              <p className="text-xs text-gray-500">用于计算机会成本，默认3%</p>
            </div>

            <Button onClick={calculateBreakeven} className="w-full">
              计算回本要求
            </Button>

            {result !== null && (
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">亏损分析</h3>
                  <p className="text-lg font-bold text-red-800">
                    当前亏损: {Math.abs(result.lossPercentage).toFixed(2)}%
                  </p>
                  <p className="text-sm text-red-700">需要上涨: {result.requiredGain.toFixed(2)}% 才能回到买入价</p>
                </div>

                {holdingYears && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-900 mb-2">真实回本分析</h3>
                    <p className="text-lg font-bold text-orange-800">真实回本价: ¥{result.trueBreakeven.toFixed(2)}</p>
                    <p className="text-sm text-orange-700">机会成本: ¥{result.opportunityCost.toFixed(2)}</p>
                    <p className="text-xs text-orange-600 mt-2">考虑{holdingYears}年的时间价值和机会成本</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>回本的数学真相</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">股票下跌后，需要更大幅度的上涨才能回本。这是因为计算基数发生了变化。</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">回本公式：</h4>
                <p className="font-mono text-sm">回本涨幅 = (买入价 - 当前价) / 当前价</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p>• 下跌10% → 需上涨11.11%</p>
                  <p>• 下跌30% → 需上涨42.86%</p>
                  <p>• 下跌50% → 需上涨100%</p>
                  <p>• 下跌70% → 需上涨233%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <TrendingDown className="h-4 w-4" />
            <AlertDescription>
              <strong>机会成本提醒：</strong>
              即使股票涨回买入价，也不代表真正解套。 因为资金被占用期间，存在时间价值和机会成本。
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>实际案例</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-semibold text-red-800">案例：深度套牢</p>
                  <p className="text-red-700">
                    10年前10万元买的股票，今天涨回10万元。 看似回本，但考虑3%年化收益，真实回本需要13.44万元。
                  </p>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="font-semibold text-orange-800">案例：短期波动</p>
                  <p className="text-orange-700">
                    股票从100元跌到70元（-30%），需要涨到142.86元（+42.86%） 才能回到买入价。
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
