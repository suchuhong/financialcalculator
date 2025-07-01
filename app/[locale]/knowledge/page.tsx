import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, Calculator, TrendingUp, AlertTriangle, BookOpen, Target, PieChart } from "lucide-react"

type Props = {
  params: Promise<{ locale: string }>
}
 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const {locale} = await params;
  
  const t = await getTranslations({
    locale,
    namespace: 'metadata.knowledge',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords')
  }
}

const knowledgeBase = [
  {
    id: "time-value-of-money",
    titleKey: "knowledge.timeValue.title",
    categoryKey: "knowledge.categories.basic",
    difficultyKey: "knowledge.difficulty.beginner",
    icon: Clock,
    descriptionKey: "knowledge.timeValue.description",

    coreFormula: {
      nameKey: "knowledge.timeValue.formula.name",
      formula: "FV = PV × (1 + r)^n",
      variables: [
        { symbol: "FV", meaningKey: "knowledge.timeValue.formula.variables.fv" },
        { symbol: "PV", meaningKey: "knowledge.timeValue.formula.variables.pv" },
        { symbol: "r", meaningKey: "knowledge.timeValue.formula.variables.r" },
        { symbol: "n", meaningKey: "knowledge.timeValue.formula.variables.n" },
      ],
    },

    practicalApplications: [
      {
        scenarioKey: "knowledge.timeValue.applications.investment.scenario",
        descriptionKey: "knowledge.timeValue.applications.investment.description",
        exampleKey: "knowledge.timeValue.applications.investment.example",
      },
      {
        scenarioKey: "knowledge.timeValue.applications.loan.scenario",
        descriptionKey: "knowledge.timeValue.applications.loan.description",
        exampleKey: "knowledge.timeValue.applications.loan.example",
      },
      {
        scenarioKey: "knowledge.timeValue.applications.retirement.scenario",
        descriptionKey: "knowledge.timeValue.applications.retirement.description",
        exampleKey: "knowledge.timeValue.applications.retirement.example",
      },
    ],

    keyInsightsKeys: [
      "knowledge.timeValue.insights.1",
      "knowledge.timeValue.insights.2",
      "knowledge.timeValue.insights.3",
      "knowledge.timeValue.insights.4",
    ],

    referencesKeys: [
      "knowledge.timeValue.references.1",
      "knowledge.timeValue.references.2",
      "knowledge.timeValue.references.3",
    ],
  },

  {
    id: "present-value",
    titleKey: "knowledge.presentValue.title",
    categoryKey: "knowledge.categories.core",
    difficultyKey: "knowledge.difficulty.intermediate",
    icon: DollarSign,
    descriptionKey: "knowledge.presentValue.description",

    coreFormula: {
      nameKey: "knowledge.presentValue.formula.name",
      formula: "PV = FV / (1 + r)^n",
      variables: [
        { symbol: "PV", meaningKey: "knowledge.presentValue.formula.variables.pv" },
        { symbol: "FV", meaningKey: "knowledge.presentValue.formula.variables.fv" },
        { symbol: "r", meaningKey: "knowledge.presentValue.formula.variables.r" },
        { symbol: "n", meaningKey: "knowledge.presentValue.formula.variables.n" },
      ],
    },

    calculationSteps: {
      titleKey: "knowledge.presentValue.steps.title",
      steps: [
        {
          step: 1,
          titleKey: "knowledge.presentValue.steps.1.title",
          descriptionKey: "knowledge.presentValue.steps.1.description",
          exampleKey: "knowledge.presentValue.steps.1.example",
        },
        {
          step: 2,
          titleKey: "knowledge.presentValue.steps.2.title",
          descriptionKey: "knowledge.presentValue.steps.2.description",
          exampleKey: "knowledge.presentValue.steps.2.example",
        },
        {
          step: 3,
          titleKey: "knowledge.presentValue.steps.3.title",
          descriptionKey: "knowledge.presentValue.steps.3.description",
          exampleKey: "knowledge.presentValue.steps.3.example",
        },
        {
          step: 4,
          titleKey: "knowledge.presentValue.steps.4.title",
          descriptionKey: "knowledge.presentValue.steps.4.description",
          exampleKey: "knowledge.presentValue.steps.4.example",
        },
      ],
    },

    practicalApplications: [
      {
        scenarioKey: "knowledge.presentValue.applications.bond.scenario",
        descriptionKey: "knowledge.presentValue.applications.bond.description",
        exampleKey: "knowledge.presentValue.applications.bond.example",
      },
      {
        scenarioKey: "knowledge.presentValue.applications.project.scenario",
        descriptionKey: "knowledge.presentValue.applications.project.description",
        exampleKey: "knowledge.presentValue.applications.project.example",
      },
      {
        scenarioKey: "knowledge.presentValue.applications.realestate.scenario",
        descriptionKey: "knowledge.presentValue.applications.realestate.description",
        exampleKey: "knowledge.presentValue.applications.realestate.example",
      },
    ],

    keyInsightsKeys: [
      "knowledge.presentValue.insights.1",
      "knowledge.presentValue.insights.2",
      "knowledge.presentValue.insights.3",
      "knowledge.presentValue.insights.4",
    ],

    referencesKeys: [
      "knowledge.presentValue.references.1",
      "knowledge.presentValue.references.2",
      "knowledge.presentValue.references.3",
    ],
  },

  {
    id: "future-value",
    titleKey: "knowledge.futureValue.title",
    categoryKey: "knowledge.categories.core",
    difficultyKey: "knowledge.difficulty.intermediate",
    icon: TrendingUp,
    descriptionKey: "knowledge.futureValue.description",

    coreFormula: {
      nameKey: "knowledge.futureValue.formula.name",
      formula: "FV = PV × (1 + r)^n",
      variables: [
        { symbol: "FV", meaningKey: "knowledge.futureValue.formula.variables.fv" },
        { symbol: "PV", meaningKey: "knowledge.futureValue.formula.variables.pv" },
        { symbol: "r", meaningKey: "knowledge.futureValue.formula.variables.r" },
        { symbol: "n", meaningKey: "knowledge.futureValue.formula.variables.n" },
      ],
    },

    practicalApplications: [
      {
        scenarioKey: "knowledge.futureValue.applications.retirement.scenario",
        descriptionKey: "knowledge.futureValue.applications.retirement.description",
        exampleKey: "knowledge.futureValue.applications.retirement.example",
      },
      {
        scenarioKey: "knowledge.futureValue.applications.education.scenario",
        descriptionKey: "knowledge.futureValue.applications.education.description",
        exampleKey: "knowledge.futureValue.applications.education.example",
      },
      {
        scenarioKey: "knowledge.futureValue.applications.investment.scenario",
        descriptionKey: "knowledge.futureValue.applications.investment.description",
        exampleKey: "knowledge.futureValue.applications.investment.example",
      },
    ],

    keyInsightsKeys: [
      "knowledge.futureValue.insights.1",
      "knowledge.futureValue.insights.2",
      "knowledge.futureValue.insights.3",
      "knowledge.futureValue.insights.4",
    ],

    referencesKeys: [
      "knowledge.futureValue.references.1",
      "knowledge.futureValue.references.2",
      "knowledge.futureValue.references.3",
    ],
  },

  {
    id: "irr",
    titleKey: "knowledge.irr.title",
    categoryKey: "knowledge.categories.advanced",
    difficultyKey: "knowledge.difficulty.advanced",
    icon: Target,
    descriptionKey: "knowledge.irr.description",

    coreFormula: {
      nameKey: "knowledge.irr.formula.name",
      formula: "NPV = Σ[CFt/(1+IRR)^t] - C0 = 0",
      variables: [
        { symbol: "CFt", meaningKey: "knowledge.irr.formula.variables.cft" },
        { symbol: "IRR", meaningKey: "knowledge.irr.formula.variables.irr" },
        { symbol: "C0", meaningKey: "knowledge.irr.formula.variables.c0" },
        { symbol: "t", meaningKey: "knowledge.irr.formula.variables.t" },
      ],
    },

    practicalApplications: [
      {
        scenarioKey: "knowledge.irr.applications.project.scenario",
        descriptionKey: "knowledge.irr.applications.project.description",
        exampleKey: "knowledge.irr.applications.project.example",
      },
      {
        scenarioKey: "knowledge.irr.applications.mutuallyExclusive.scenario",
        descriptionKey: "knowledge.irr.applications.mutuallyExclusive.description",
        exampleKey: "knowledge.irr.applications.mutuallyExclusive.example",
      },
      {
        scenarioKey: "knowledge.irr.applications.bond.scenario",
        descriptionKey: "knowledge.irr.applications.bond.description",
        exampleKey: "knowledge.irr.applications.bond.example",
      },
    ],

    keyInsightsKeys: [
      "knowledge.irr.insights.1",
      "knowledge.irr.insights.2",
      "knowledge.irr.insights.3",
      "knowledge.irr.insights.4",
    ],

    referencesKeys: [
      "knowledge.irr.references.1",
      "knowledge.irr.references.2",
      "knowledge.irr.references.3",
    ],
  },

  {
    id: "discount-rate",
    titleKey: "knowledge.discountRate.title",
    categoryKey: "knowledge.categories.basic",
    difficultyKey: "knowledge.difficulty.intermediate",
    icon: PieChart,
    descriptionKey: "knowledge.discountRate.description",

    coreFormula: {
      nameKey: "knowledge.discountRate.formula.name",
      formula: "Discount Rate = Risk-free Rate + Risk Premium",
      variables: [
        { symbol: "Risk-free Rate", meaningKey: "knowledge.discountRate.formula.variables.riskFree" },
        { symbol: "Risk Premium", meaningKey: "knowledge.discountRate.formula.variables.riskPremium" },
      ],
    },

    practicalApplications: [
      {
        scenarioKey: "knowledge.discountRate.applications.realestate.scenario",
        descriptionKey: "knowledge.discountRate.applications.realestate.description",
        exampleKey: "knowledge.discountRate.applications.realestate.example",
      },
      {
        scenarioKey: "knowledge.discountRate.applications.acquisition.scenario",
        descriptionKey: "knowledge.discountRate.applications.acquisition.description",
        exampleKey: "knowledge.discountRate.applications.acquisition.example",
      },
      {
        scenarioKey: "knowledge.discountRate.applications.project.scenario",
        descriptionKey: "knowledge.discountRate.applications.project.description",
        exampleKey: "knowledge.discountRate.applications.project.example",
      },
    ],

    keyInsightsKeys: [
      "knowledge.discountRate.insights.1",
      "knowledge.discountRate.insights.2",
      "knowledge.discountRate.insights.3",
      "knowledge.discountRate.insights.4",
    ],

    referencesKeys: [
      "knowledge.discountRate.references.1",
      "knowledge.discountRate.references.2",
      "knowledge.discountRate.references.3",
    ],
  },
]

export default function KnowledgePage() {
  const t = useTranslations();
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900">{t('tools.systematicKnowledge')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('knowledge.description')}</p>
      </div>

      <div className="space-y-12">
        {knowledgeBase.map((knowledge) => (
          <Card key={knowledge.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <knowledge.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-2xl">{t(knowledge.titleKey)}</CardTitle>
                    <Badge variant="secondary">{t(knowledge.categoryKey)}</Badge>
                    <Badge variant="outline">{t(knowledge.difficultyKey)}</Badge>
                  </div>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {t(knowledge.descriptionKey)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-8 space-y-8">
              {/* 核心公式 */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  {t(knowledge.coreFormula.nameKey)}
                </h3>
                <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                  <p className="font-mono text-lg text-blue-800 mb-4">{knowledge.coreFormula.formula}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {knowledge.coreFormula.variables.map((variable, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="font-mono font-semibold text-blue-700 w-12">{variable.symbol}</span>
                        <span className="text-gray-700">= {t(variable.meaningKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 计算步骤 */}
              {knowledge.calculationSteps && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{t(knowledge.calculationSteps.titleKey)}</h3>
                  <div className="space-y-4">
                    {knowledge.calculationSteps.steps.map((step, index) => (
                      <div key={index} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{t(step.titleKey)}</h4>
                          <p className="text-gray-600 mb-2">{t(step.descriptionKey)}</p>
                          <div className="bg-white p-3 rounded border-l-4 border-green-500">
                            <p className="text-sm text-green-800">
                              <strong>{t('knowledge.example')}：</strong>
                              {t(step.exampleKey)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 实际应用 */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('knowledge.practicalApplications')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {knowledge.practicalApplications.map((application, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2 text-green-800">{t(application.scenarioKey)}</h4>
                      <p className="text-gray-600 mb-3">{t(application.descriptionKey)}</p>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-sm text-green-800">
                          <strong>{t('knowledge.example')}：</strong>
                          {t(application.exampleKey)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 关键洞察 */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {t('knowledge.keyInsights')}
                </h3>
                <ul className="space-y-2">
                  {knowledge.keyInsightsKeys.map((insightKey, index) => (
                    <li key={index} className="flex items-start space-x-2 text-green-800">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{t(insightKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 参考文献 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {t('knowledge.references')}
                </h3>
                <ul className="space-y-2">
                  {knowledge.referencesKeys.map((referenceKey, index) => (
                    <li key={index} className="text-gray-700">
                      {index + 1}. {t(referenceKey)}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 