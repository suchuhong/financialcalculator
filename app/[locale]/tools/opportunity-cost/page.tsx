"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info, Plus, Minus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Investment {
  name: string
  amount: number
  return: number
  years: number
}

export default function OpportunityCostCalculator() {
  const [investments, setInvestments] = useState<Investment[]>([
    { name: "方案A", amount: 0, return: 0, years: 0 },
    { name: "方案B", amount: 0, return: 0, years: 0 },
  ])
  const [result, setResult] = useState<{
    bestOption: string
    opportunityCosts: { name: string; cost: number; futureValue: number }[]
  } | null>(null)

  const addInvestment = () => {
    const newName = `方案${String.fromCharCode(65 + investments.length)}`
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
    if (validInvestments.length < 2) return

    // 计算每个方案的未来价值
    const futureValues = validInvestments.map((inv) => ({
      name: inv.name,
      futureValue: inv.amount * Math.pow(1 + inv.return / 100, inv.years),
      originalAmount: inv.amount,
    }))

    // 找到最佳方案
    const bestOption = futureValues.reduce((best, current) => (current.futureValue > best.futureValue ? current : best))

    // 计算机会成本
    const opportunityCosts = futureValues.map((option) => ({
      name: option.name,
      cost: bestOption.futureValue - option.futureValue,
      futureValue: option.futureValue,
    }))

    setResult({
      bestOption: bestOption.name,
      opportunityCosts,
    })
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">机会成本计算器</h1>
        <p className="text-lg text-gray-600">评估不同投资选择的机会成本，找出最优方案</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>投资方案对比</span>
              </div>
              <Button variant="outline" size="sm" onClick={addInvestment}>
                <Plus className="h-4 w-4 mr-1" />
                添加方案
              </Button>
            </CardTitle>
            <CardDescription>输入不同投资方案进行对比</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {investments.map((investment, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Input
                    placeholder="方案名称"
                    value={investment.name}
                    onChange={(e) => updateInvestment(index, "name", e.target.value)}
                    className="w-32"
                  />
                  {investments.length > 2 && (
                    <Button variant="outline" size="sm" onClick={() => removeInvestment(index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">投资金额</Label>
                    <Input
                      type="number"
                      placeholder="金额"
                      value={investment.amount || ""}
                      onChange={(e) => updateInvestment(index, "amount", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">年化收益率(%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="收益率"
                      value={investment.return || ""}
                      onChange={(e) => updateInvestment(index, "return", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">投资年限</Label>
                    <Input
                      type="number"
                      placeholder="年数"
                      value={investment.years || ""}
                      onChange={(e) => updateInvestment(index, "years", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={calculateOpportunityCost} className="w-full">
              计算机会成本
            </Button>

            {result && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">最优方案</h3>
                  <p className="text-lg font-bold text-green-800">{result.bestOption}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">机会成本分析</h3>
                  {result.opportunityCosts.map((option) => (
                    <div key={option.name} className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{option.name}</span>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            未来价值: ¥{option.futureValue.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}
                          </p>
                          {option.cost > 0 && (
                            <p className="text-sm text-red-600">
                              机会成本: ¥{option.cost.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}
                            </p>
                          )}
                          {option.cost === 0 && <p className="text-sm text-green-600">最优选择</p>}
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
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>什么是机会成本？</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                机会成本是指选择某个方案而放弃其他方案所损失的最大利益。 在投资决策中，机会成本帮助我们找到最优选择。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">机会成本的应用：</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 投资项目选择</li>
                  <li>• 资金配置决策</li>
                  <li>• 职业发展选择</li>
                  <li>• 时间分配决策</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>决策原则：</strong>
              选择机会成本最低的方案，即选择能带来最大收益的方案。 机会成本为零的方案就是最优选择。
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>实际应用案例</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800">案例：租房押金</p>
                  <p className="text-blue-700">
                    房租5000元押金1万 vs 房租5200元押金5000元。 考虑押金的机会成本，后者可能更优。
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-semibold text-purple-800">案例：投资选择</p>
                  <p className="text-purple-700">
                    股票投资8%收益 vs 债券投资5%收益。 选择股票的机会成本是放弃债券的5%收益。
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
