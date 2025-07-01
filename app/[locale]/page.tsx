import type { Metadata } from "next"
import { getTranslations } from 'next-intl/server';
import { HeroSection } from "@/components/hero-section"
import { ToolsGrid } from "@/components/tools-grid"
import { KnowledgePreview } from "@/components/knowledge-preview"
import { CaseStudies } from "@/components/case-studies"

type Props = {
  params: Promise<{ locale: string }>
}
 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const {locale} = await params;
  
  const t = await getTranslations({
    locale,
    namespace: 'metadata.home',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('og.title'),
      description: t('og.description'),
      type: t('og.type'),
    },
  }
}

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ToolsGrid />
      <KnowledgePreview />
      <CaseStudies />
    </main>
  )
}
