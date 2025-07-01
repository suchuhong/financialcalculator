import { ToolsGrid } from "@/components/tools-grid"
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from "next"

type Props = {
  params: Promise<{ locale: string }>
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const {locale} = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.tools',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords')
  }
}

export default function ToolsPage() {
  const t = useTranslations('tools');
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900">{t('professionalTools')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('toolsDescription')}</p>
      </div>
      <ToolsGrid />
    </div>
  )
} 