import type { Locale } from '@/i18n/config'

// Every address on the site, in one place. English is the default and has no
// prefix (amcoconsultants.tech/, /explore/, /demo/); Urdu lives under /ur/.
// trailingSlash is on in next.config, so every path ends in "/".

export const prefix = (locale: Locale) => (locale === 'en' ? '' : `/${locale}`)

export const homePath = (locale: Locale) => `${prefix(locale)}/`
export const explorePath = (locale: Locale) => `${prefix(locale)}/explore/`
export const demoPath = (locale: Locale) => `${prefix(locale)}/demo/`
export const teamPath = (locale: Locale) => `${homePath(locale)}#team`
export const whyPath = (locale: Locale) => `${homePath(locale)}#why`
