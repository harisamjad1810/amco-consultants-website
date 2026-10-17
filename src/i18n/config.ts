// The one list of languages the site speaks. Every route, the switcher, the
// language dialog and the saved preference read it from here.

export const locales = ['en', 'ur'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeMeta: Record<Locale, { label: string; native: string; dir: 'ltr' | 'rtl'; htmlLang: string }> = {
  en: { label: 'English', native: 'English', dir: 'ltr', htmlLang: 'en' },
  ur: { label: 'Urdu', native: 'اردو', dir: 'rtl', htmlLang: 'ur' }
}

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as readonly string[]).includes(value)
