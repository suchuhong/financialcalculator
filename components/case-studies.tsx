import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Home, TrendingUp } from "lucide-react"

const cases = [
  {
    title: "网约车投资方案对比",
    description: "同样投入50万元，三种不同的现金流安排，哪种方案更优？",
    icon: Car,
    scenarios: [
      { name: "方案一", irr: "5.2%", description: "稳定收入，每年10万" },
      { name: "方案二", irr: "7.5%", description: "前期高收入，后期低收入" },
      { name: "方案三", irr: "5.9%", description: "前期更高收入，总收入更少但IRR更高" },
    ],
    insight: "早期收回的现金发挥了金钱的时间价值，方案二虽然总收入相同，但IRR最高。",
  },
  {
    title: "彩票中奖选择",
    description: "中奖2亿美元：立即领取9000万还是30年分期领取2亿？",
    icon: TrendingUp,
    scenarios: [
      { name: "一次性", irr: "约4-5%", description: "立即获得9000万美元" },
      { name: "分期付款", irr: "约2-3%", description: "30年总共2亿美元" },
    ],
    insight: "多数人选择一次性领取是正确的，因为可以立即投资获得更高回报。",
  },
  {
    title: "房租押金的隐性成本",
    description: "租房时不应只看租金高低，押金的资金占用也存在机会成本。",
    icon: Home,
    scenarios: [
      { name: "方案A", irr: "月租5000，押金1万", description: "看似便宜的选择" },
      { name: "方案B", irr: "月租5200，押金5000", description: "考虑机会成本后可能更优" },
    ],
    insight: "押金虽然会退回，但资金占用期间的机会成本不可忽视。",
  },
]

export function CaseStudies() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">实战案例分析</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">通过真实案例，看金融知识如何指导实际决策</p>
        </div>

        <div className="space-y-8">
          {cases.map((caseStudy) => (
            <Card key={caseStudy.title} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <caseStudy.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{caseStudy.title}</CardTitle>
                    <CardDescription className="text-gray-600">{caseStudy.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {caseStudy.scenarios.map((scenario) => (
                    <div key={scenario.name} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{scenario.name}</h4>
                        <Badge variant="secondary">{scenario.irr}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{scenario.description}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1">关键洞察：</p>
                  <p className="text-sm text-blue-800">{caseStudy.insight}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
