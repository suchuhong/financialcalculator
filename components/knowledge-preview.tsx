import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, TrendingDown, AlertTriangle } from "lucide-react"
import Link from "next/link"

const concepts = [
  {
    title: "金钱的时间价值",
    description: "今天的1块钱比明天的1块钱更有价值，这不是因为通胀，而是因为今天的钱可以赚取利息。",
    icon: Clock,
    example: "选择题：今天给你10万元，还是一年后给你11万元？",
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "现值与未来价值",
    description: "现值是未来某笔钱在今天的价值，未来价值是今天的钱在未来某个时间点的价值。",
    icon: DollarSign,
    example: "一年后的100万元，在5%利率下，今天的价值是95.2万元。",
    color: "text-green-600 bg-green-100",
  },
  {
    title: "内含回报率(IRR)",
    description: "IRR充分考虑了现金流入和流出的时间节点，告诉我们投资的真实回报率。",
    icon: TrendingDown,
    example: "同样投入50万，不同的现金流时间安排会产生不同的IRR。",
    color: "text-purple-600 bg-purple-100",
  },
  {
    title: "常见金融误区",
    description: "股票涨回买入价不等于解套，贷款名义利率可能远低于真实利率。",
    icon: AlertTriangle,
    example: "股票下跌30%，需要回涨42.86%才能回本。",
    color: "text-red-600 bg-red-100",
  },
]

export function KnowledgePreview() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">核心金融概念</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">深入浅出，用实际案例帮您理解复杂的金融概念</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {concepts.map((concept) => (
            <Card key={concept.title} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${concept.color} flex items-center justify-center mb-4`}>
                  <concept.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{concept.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">{concept.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">实例：</p>
                  <p className="text-sm text-gray-600 mt-1">{concept.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/knowledge">查看完整知识库</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
