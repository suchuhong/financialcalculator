import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, TrendingUp, AlertTriangle } from "lucide-react"

type Props = {
  params: Promise<{ locale: string }>
}
 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const {locale} = await params;
  
  const t = await getTranslations({
    locale,
    namespace: 'metadata.cases',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords')
  }
}

const detailedCases = [
  {
    id: "rideshare-investment",
    titleKey: "cases.rideshare.title",
    descriptionKey: "cases.rideshare.description",
    icon: Car,
    categoryKey: "cases.categories.investment",
    difficultyKey: "cases.difficulty.intermediate",
    scenarios: [
      {
        nameKey: "cases.rideshare.scenario1.name",
        investment: 500000,
        cashFlows: [
          { year: 1, amount: 100000, descriptionKey: "cases.rideshare.scenario1.cf1" },
          { year: 2, amount: 100000, descriptionKey: "cases.rideshare.scenario1.cf2" },
          { year: 3, amount: 100000, descriptionKey: "cases.rideshare.scenario1.cf3" },
          { year: 4, amount: 100000, descriptionKey: "cases.rideshare.scenario1.cf4" },
          { year: 5, amount: 190000, descriptionKey: "cases.rideshare.scenario1.cf5" },
        ],
        irr: 5.2,
        totalReturn: 590000,
        analysisKey: "cases.rideshare.scenario1.analysis",
      },
      {
        nameKey: "cases.rideshare.scenario2.name",
        investment: 500000,
        cashFlows: [
          { year: 1, amount: 200000, descriptionKey: "cases.rideshare.scenario2.cf1" },
          { year: 2, amount: 200000, descriptionKey: "cases.rideshare.scenario2.cf2" },
          { year: 3, amount: 50000, descriptionKey: "cases.rideshare.scenario2.cf3" },
          { year: 4, amount: 50000, descriptionKey: "cases.rideshare.scenario2.cf4" },
          { year: 5, amount: 90000, descriptionKey: "cases.rideshare.scenario2.cf5" },
        ],
        irr: 7.5,
        totalReturn: 590000,
        analysisKey: "cases.rideshare.scenario2.analysis",
      },
      {
        nameKey: "cases.rideshare.scenario3.name",
        investment: 500000,
        cashFlows: [
          { year: 1, amount: 200000, descriptionKey: "cases.rideshare.scenario3.cf1" },
          { year: 2, amount: 200000, descriptionKey: "cases.rideshare.scenario3.cf2" },
          { year: 3, amount: 40000, descriptionKey: "cases.rideshare.scenario3.cf3" },
          { year: 4, amount: 40000, descriptionKey: "cases.rideshare.scenario3.cf4" },
          { year: 5, amount: 90000, descriptionKey: "cases.rideshare.scenario3.cf5" },
        ],
        irr: 5.9,
        totalReturn: 570000,
        analysisKey: "cases.rideshare.scenario3.analysis",
      },
    ],
    keyInsightsKeys: [
      "cases.rideshare.insights.1",
      "cases.rideshare.insights.2",
      "cases.rideshare.insights.3",
      "cases.rideshare.insights.4",
    ],
    practicalApplicationKey: "cases.rideshare.practicalApplication",
  },
  {
    id: "lottery-choice",
    titleKey: "cases.lottery.title",
    descriptionKey: "cases.lottery.description",
    icon: TrendingUp,
    categoryKey: "cases.categories.presentValue",
    difficultyKey: "cases.difficulty.advanced",
    scenarios: [
      {
        nameKey: "cases.lottery.scenario1.name",
        amount: 90000000,
        descriptionKey: "cases.lottery.scenario1.description",
        advantagesKeys: [
          "cases.lottery.scenario1.advantages.1",
          "cases.lottery.scenario1.advantages.2",
          "cases.lottery.scenario1.advantages.3",
          "cases.lottery.scenario1.advantages.4"
        ],
        disadvantagesKeys: [
          "cases.lottery.scenario1.disadvantages.1",
          "cases.lottery.scenario1.disadvantages.2",
          "cases.lottery.scenario1.disadvantages.3"
        ],
        expectedReturnKey: "cases.lottery.scenario1.expectedReturn",
      },
      {
        nameKey: "cases.lottery.scenario2.name",
        amount: 200000000,
        descriptionKey: "cases.lottery.scenario2.description",
        advantagesKeys: [
          "cases.lottery.scenario2.advantages.1",
          "cases.lottery.scenario2.advantages.2",
          "cases.lottery.scenario2.advantages.3",
          "cases.lottery.scenario2.advantages.4"
        ],
        disadvantagesKeys: [
          "cases.lottery.scenario2.disadvantages.1",
          "cases.lottery.scenario2.disadvantages.2",
          "cases.lottery.scenario2.disadvantages.3",
          "cases.lottery.scenario2.disadvantages.4"
        ],
        presentValueKey: "cases.lottery.scenario2.presentValue",
      },
    ],
    calculation: {
      titleKey: "cases.lottery.calculation.title",
      methodKey: "cases.lottery.calculation.method",
      formulaKey: "cases.lottery.calculation.formula",
      assumptionsKeys: [
        "cases.lottery.calculation.assumptions.1",
        "cases.lottery.calculation.assumptions.2",
        "cases.lottery.calculation.assumptions.3"
      ],
      resultKey: "cases.lottery.calculation.result",
      conclusionKey: "cases.lottery.calculation.conclusion",
    },
    keyInsightsKeys: [
      "cases.lottery.insights.1",
      "cases.lottery.insights.2",
      "cases.lottery.insights.3",
      "cases.lottery.insights.4",
    ],
  },
  // 其他案例可以按照类似方式添加...
];

export default function CasesPage() {
  const t = useTranslations();
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900">{t('tools.realCaseAnalysis')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('cases.description')}</p>
      </div>

      <div className="space-y-12">
        {detailedCases.map((caseStudy) => (
          <Card key={caseStudy.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <caseStudy.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-2xl">{t(caseStudy.titleKey)}</CardTitle>
                      <Badge variant="secondary">{t(caseStudy.categoryKey)}</Badge>
                      <Badge variant="outline">{t(caseStudy.difficultyKey)}</Badge>
                    </div>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {t(caseStudy.descriptionKey)}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-8">
              {/* 方案对比 */}
              {caseStudy.scenarios && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{t('cases.scenarioComparison')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudy.scenarios.map((scenario, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg">{t(scenario.nameKey)}</h4>
                          {'irr' in scenario && scenario.irr && (
                            <Badge className="bg-green-100 text-green-800">IRR: {scenario.irr}%</Badge>
                          )}
                        </div>

                        {/* 现金流显示 */}
                        {'cashFlows' in scenario && scenario.cashFlows && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">{t('cases.cashFlows')}：</p>
                            <div className="space-y-1">
                              {scenario.cashFlows.map((flow) => (
                                <div key={flow.year} className="flex justify-between text-sm">
                                  <span>{t(flow.descriptionKey)}</span>
                                  <span className="font-mono">{flow.amount}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 优缺点显示 */}
                        {scenario.advantagesKeys && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-green-700">{t('cases.advantages')}：</p>
                            <ul className="text-sm text-green-600 space-y-1">
                              {scenario.advantagesKeys.map((advantageKey, advIndex) => (
                                <li key={advIndex}>• {t(advantageKey)}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {scenario.disadvantagesKeys && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-red-700">{t('cases.disadvantages')}：</p>
                            <ul className="text-sm text-red-600 space-y-1">
                              {scenario.disadvantagesKeys.map((disadvantageKey, disIndex) => (
                                <li key={disIndex}>• {t(disadvantageKey)}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {scenario.analysisKey && (
                          <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">{t(scenario.analysisKey)}</div>
                        )}

                        {scenario.expectedReturnKey && (
                          <div className="bg-blue-50 p-3 rounded text-sm text-blue-700">{t(scenario.expectedReturnKey)}</div>
                        )}
                        
                        {scenario.presentValueKey && (
                          <div className="bg-blue-50 p-3 rounded text-sm text-blue-700">{t(scenario.presentValueKey)}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 详细计算 */}
              {caseStudy.calculation && (
                <div className="mb-8 bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">{t(caseStudy.calculation.titleKey)}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-blue-800">{t('cases.calculationMethod')}：</p>
                      <p className="text-blue-700">{t(caseStudy.calculation.methodKey)}</p>
                    </div>
                    {caseStudy.calculation.formulaKey && (
                      <div>
                        <p className="font-medium text-blue-800">{t('cases.formula')}：</p>
                        <p className="font-mono text-blue-700 bg-white p-2 rounded">{t(caseStudy.calculation.formulaKey)}</p>
                      </div>
                    )}
                    {caseStudy.calculation.assumptionsKeys && (
                      <div>
                        <p className="font-medium text-blue-800">{t('cases.assumptions')}：</p>
                        <ul className="list-disc list-inside text-blue-700 space-y-1">
                          {caseStudy.calculation.assumptionsKeys.map((assumptionKey, index) => (
                            <li key={index}>{t(assumptionKey)}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <p className="font-medium text-blue-900">{t('cases.conclusion')}：</p>
                      <p className="text-blue-800">{t(caseStudy.calculation.conclusionKey)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 关键洞察 */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {t('cases.keyInsights')}
                </h3>
                <ul className="space-y-2">
                  {caseStudy.keyInsightsKeys.map((insightKey, index) => (
                    <li key={index} className="flex items-start space-x-2 text-green-800">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{t(insightKey)}</span>
                    </li>
                  ))}
                </ul>
                {caseStudy.practicalApplicationKey && (
                  <div className="mt-4 p-4 bg-white rounded border-l-4 border-green-500">
                    <p className="font-medium text-green-900">{t('cases.practicalApplication')}：</p>
                    <p className="text-green-800">{t(caseStudy.practicalApplicationKey)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 