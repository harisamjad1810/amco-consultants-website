import { isLocale, type Locale } from '@/i18n/config'

// The visitor's saved language. Kept in BOTH a cookie and localStorage:
// the cookie is what nginx can read to send a returning visitor straight to
// their language before any JavaScript runs; localStorage survives a browser
// that clears cookies on close. Either one being present is enough.

const KEY = 'amco_lang'
const ONE_YEAR = 60 * 60 * 24 * 365

export function readSavedLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage.getItem(KEY)
    if (isLocale(stored)) return stored
  } catch {
    // Storage can be blocked (private mode, site data disabled); the cookie may still work.
  }
  const match = document.cookie.match(/(?:^|;\s*)amco_lang=([^;]+)/)
  const fromCookie = match ? decodeURIComponent(match[1]) : null
  return isLocale(fromCookie) ? fromCookie : null
}

export function saveLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, locale)
  } catch {
    // Ignored — the cookie below still records the choice.
  }
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${KEY}=${locale}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax${secure}`
}

// `/explore/` <-> `/ur/explore/`. Keeps the visitor on the same page when they
// switch language. English has no prefix; Urdu is the first segment.
export function swapLocaleInPath(pathname: string, next: Locale): string {
  const path = pathname || '/'
  const parts = path.split('/')
  const rest = isLocale(parts[1]) ? '/' + parts.slice(2).join('/') : path
  return next === 'en' ? rest : `/${next}${rest}`
}
