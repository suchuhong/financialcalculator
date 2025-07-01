import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, TrendingDown, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl"; // 1. 导入钩子

// 2. 将非文本的元数据（图标、颜色等）分离出来
const conceptDetails = [
  {
    id: "timeValue",
    icon: Clock,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: "presentFutureValue",
    icon: DollarSign,
    color: "text-green-600 bg-green-100",
  },
  {
    id: "irr",
    icon: TrendingDown,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: "misconceptions",
    icon: AlertTriangle,
    color: "text-red-600 bg-red-100",
  },
];

export function KnowledgePreview() {
  // 3. 使用钩子获取翻译函数
  const t = useTranslations("KnowledgePreview");

  // 4. 动态组合元数据和翻译文本
  const concepts = conceptDetails.map(concept => ({
    ...concept,
    title: t(`concepts.${concept.id}.title`),
    description: t(`concepts.${concept.id}.description`),
    example: t(`concepts.${concept.id}.example`),
  }));

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          {/* 5. 替换所有硬编码的文本 */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {concepts.map((concept) => (
            <Card key={concept.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${concept.color} flex items-center justify-center mb-4`}>
                  <concept.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{concept.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed pt-2">{concept.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">{t('exampleLabel')}</p>
                  <p className="text-sm text-gray-600 mt-1">{concept.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/knowledge">{t('buttonText')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}