import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Home, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl"; // 1. 导入钩子

// 2. 仅保留非文本的元数据：ID 和图标
const caseDetails = [
  { id: "rideShare", icon: Car },
  { id: "lottery", icon: TrendingUp },
  { id: "rentDeposit", icon: Home },
];

export function CaseStudies() {
  // 3. 使用钩子获取翻译函数
  const t = useTranslations("CaseStudies");

  // 4. 动态组合元数据和从 JSON 获取的完整翻译对象
  const cases = caseDetails.map(detail => {
    // 使用 t.raw() 获取整个案例的翻译对象（包括 scenarios 数组）
    const translatedCase = t.raw(`cases.${detail.id}`);
    return {
      ...detail, // id, icon
      ...translatedCase, // title, description, insight, scenarios
    };
  });

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="space-y-12">
          {cases.map((caseStudy) => (
            <Card key={caseStudy.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gray-50/70">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <caseStudy.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{caseStudy.title}</CardTitle>
                    <CardDescription className="text-gray-600">{caseStudy.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {caseStudy.scenarios.map((scenario: any) => ( // 使用 any 类型或定义一个更具体的类型
                    <div key={scenario.name} className="border rounded-lg p-4 bg-background">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{scenario.name}</h4>
                        <Badge variant="secondary">{scenario.irr}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{scenario.description}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-1">{t('insightLabel')}</p>
                  <p className="text-sm text-blue-800">{caseStudy.insight}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}