import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://financialcalculator.site',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en',
          de: 'https://financialcalculator.site/zh',
        },
      },
    },
    {
      url: 'https://financialcalculator.site/cases',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en/cases',
          de: 'https://financialcalculator.site/zh/cases',
        },
      },
    },
    {
      url: 'https://financialcalculator.site/knowledge',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en/knowledge',
          de: 'https://financialcalculator.site/zh/knowledge',
        },
      },
    },
    {
      url: 'https://financialcalculator.site/tools',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en/tools',
          de: 'https://financialcalculator.site/zh/tools',
        },
      },
    },
    {
      url: 'https://financialcalculator.site/tools/breakeven-calculator',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en/tools/breakeven-calculator',
          de: 'https://financialcalculator.site/zh/tools/breakeven-calculator',
        },
      },
    },
    {
      url: 'https://financialcalculator.site/tools/future-value',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en/tools/future-value',
          de: 'https://financialcalculator.site/zh/tools/future-value',
        },
      },
    },
    {
      url: 'https://financialcalculator.site/tools/irr-calculator',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en/tools/irr-calculator',
          de: 'https://financialcalculator.site/zh/tools/irr-calculator',
        },
      },
    },
    {
      url: 'https://financialcalculator.site/tools/loan-calculator',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en/tools/loan-calculator',
          de: 'https://financialcalculator.site/zh/tools/loan-calculator',
        },
      },
    },
    {
      url: 'https://financialcalculator.site/tools/opportunity-cost',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en/tools/opportunity-cost',
          de: 'https://financialcalculator.site/zh/tools/opportunity-cost',
        },
      },
    },
    {
      url: 'https://financialcalculator.site/tools/present-value',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://financialcalculator.site/en/tools/present-value',
          de: 'https://financialcalculator.site/zh/tools/present-value',
        },
      },
    },
  ]
}