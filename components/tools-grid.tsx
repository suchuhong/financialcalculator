import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, TrendingUp, PieChart, Banknote, Target } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl"; // 1. 导入 useTranslations 钩子

// 2. 将非文本数据（元数据）分离出来
// 我们添加一个 id，用于在 JSON 文件中查找对应的文本
const toolDetails = [
  {
    id: "presentValue",
    icon: DollarSign,
    href: "/tools/present-value",
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: "futureValue",
    icon: TrendingUp,
    href: "/tools/future-value",
    color: "text-green-600 bg-green-100",
  },
  {
    id: "irr",
    icon: Target,
    href: "/tools/irr-calculator",
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: "loan",
    icon: Calculator,
    href: "/tools/loan-calculator",
    color: "text-orange-600 bg-orange-100",
  },
  {
    id: "breakeven",
    icon: PieChart,
    href: "/tools/breakeven-calculator",
    color: "text-red-600 bg-red-100",
  },
  {
    id: "opportunityCost",
    icon: Banknote,
    href: "/tools/opportunity-cost",
    color: "text-indigo-600 bg-indigo-100",
  },
];

export function ToolsGrid() {
  // 3. 使用钩子获取翻译函数，并指定命名空间 "ToolsGrid"
  const t = useTranslations("ToolsGrid");

  // 4. 动态地将翻译文本和元数据组合起来
  const tools = toolDetails.map(tool => ({
    ...tool,
    title: t(`tools.${tool.id}.title`),
    description: t(`tools.${tool.id}.description`),
  }));

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          {/* 5. 使用翻译函数替换硬编码文本 */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 现在的 tools 数组已经是根据当前语言动态生成的了 */}
          {tools.map((tool) => (
            <Card key={tool.href} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex-grow">
                <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="text-gray-600 pt-2">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={tool.href}>{t('buttonText')}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}