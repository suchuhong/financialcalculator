"use client"

import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-blue-600 mb-6">
            {t('subtitle')}
          </p>
          <p className="text-gray-600 mb-8">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/tools`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {t('startUsingTools')}
            </Link>
            <Link
              href={`/${locale}/knowledge`}
              className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {t('learnFinance')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 