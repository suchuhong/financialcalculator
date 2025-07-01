"use client"

import {useTranslations} from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-gray-100 py-10 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-gray-600 font-medium mb-3">
              © {new Date().getFullYear()} Financial Tools. {t('allRightsReserved')}
            </h3>
            <p className="text-sm text-gray-500">
              {t('investmentWarning')}
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a href="mailto:contact@finance-tools.com" className="text-blue-600 hover:underline">
              {t('contactUs')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 