import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { demoPath, explorePath, homePath } from '@/lib/paths'
import { SITE_URL } from '@/lib/site'

// Page titles, descriptions and the language alternates. The alternates tell
// Google the English and Urdu pages are translations of each other, so an Urdu
// searcher is shown the Urdu page and vice versa. English is the x-default.

type Page = 'home' | 'explore' | 'demo'

const PATHS: Record<Page, (locale: Locale) => string> = { home: homePath, explore: explorePath, demo: demoPath }

export function pageMetadata(locale: Locale, page: Page): Metadata {
  const dict = getDictionary(locale)
  const text =
    page === 'explore' ? dict.product.meta : page === 'demo' ? dict.demoPage.meta : dict.meta
  const path = PATHS[page]
  return {
    metadataBase: new URL(SITE_URL),
    title: text.title,
    description: text.description,
    alternates: {
      canonical: path(locale),
      languages: { en: path('en'), ur: path('ur'), 'x-default': path('en') }
    },
    openGraph: {
      title: text.title,
      description: text.description,
      url: path(locale),
      siteName: 'AMCO Consultants',
      locale: locale === 'ur' ? 'ur_PK' : 'en_PK',
      type: 'website',
      ...(page === 'explore' ? { images: ['/erp/dashboard.webp'] } : {})
    }
  }
}
