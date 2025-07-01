import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, DollarSign, TrendingUp, PieChart, Banknote, Target } from "lucide-react"
import Link from "next/link"

const tools = [
  {
    title: "现值计算器",
    description: "计算未来现金流的现在价值，评估投资项目的真实价值",
    icon: DollarSign,
    href: "/tools/present-value",
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "未来价值计算器",
    description: "预测当前投资在未来某个时间点的价值",
    icon: TrendingUp,
    href: "/tools/future-value",
    color: "text-green-600 bg-green-100",
  },
  {
    title: "IRR计算器",
    description: "计算内含回报率，准确评估投资项目的真实收益率",
    icon: Target,
    href: "/tools/irr-calculator",
    color: "text-purple-600 bg-purple-100",
  },
  {
    title: "贷款利率计算器",
    description: "计算真实年化利率，避免被虚假利率误导",
    icon: Calculator,
    href: "/tools/loan-calculator",
    color: "text-orange-600 bg-orange-100",
  },
  {
    title: "投资回本计算器",
    description: "计算股票下跌后需要多少涨幅才能回本",
    icon: PieChart,
    href: "/tools/breakeven-calculator",
    color: "text-red-600 bg-red-100",
  },
  {
    title: "机会成本计算器",
    description: "评估不同投资选择的机会成本",
    icon: Banknote,
    href: "/tools/opportunity-cost",
    color: "text-indigo-600 bg-indigo-100",
  },
]

export function ToolsGrid() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">专业金融计算工具</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">基于严谨的金融理论，为您提供准确可靠的计算结果</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card key={tool.href} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="text-gray-600">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={tool.href}>立即使用</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
