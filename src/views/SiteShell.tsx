import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RevealObserver from '@/components/layout/RevealObserver'
import LanguageGate from '@/components/language/LanguageGate'
import { getDictionary } from '@/i18n/get-dictionary'
import { localeMeta, type Locale } from '@/i18n/config'
import { fontVariables, URDU_FONT_URL } from '@/lib/fonts'

// The <html> of every page, in one language. English pages are at the root
// (`app/(en)/…` → `/`, `/explore/`, `/demo/`); Urdu pages under `app/ur/…`.
// Both route groups draw their pages through this one shell.

// Runs before the first paint, and only when the page is opened directly:
//  • marks the page JavaScript-capable, which lets `.reveal` elements start
//    hidden (without JavaScript the class is never added and nothing hides);
//  • on the English home page, sends a visitor who chose Urdu before straight
//    to /ur/ — before anything is drawn, so there is no flash of English;
//  • on an Urdu page, starts the Nastaliq download alongside everything else,
//    so the headline is drawn in it first time rather than redrawn later.
// ⚠️ The font preload is issued HERE, not as a <link rel="preload"> element.
// React hoists such a link into a resource hint, and the English page's
// background prefetch of /ur/ carried it across — so every English visitor
// downloaded the 235 KB Urdu font. React never executes this inline script
// for a prefetched or client-rendered page, so it fires on a real Urdu visit only.
const headScript = (locale: Locale) =>
  locale === 'ur'
    ? "document.documentElement.classList.add('js');" +
      "var l=document.createElement('link');l.rel='preload';l.as='font';l.type='font/woff2';" +
      `l.crossOrigin='anonymous';l.href='${URDU_FONT_URL}';document.head.appendChild(l)`
    : "document.documentElement.classList.add('js');" +
      "if(location.pathname==='/'){var s=null;try{s=localStorage.getItem('amco_lang')}catch(e){}" +
      "if(!s){var m=document.cookie.match(/(?:^|; *)amco_lang=([^;]+)/);s=m&&m[1]}" +
      "if(s==='ur')location.replace('/ur/'+location.hash)}"

export default function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale)
  const meta = localeMeta[locale]

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript(locale) }} />
      </head>
      <body>
        <Navbar locale={locale} dict={dict.nav} />
        <main className="page-in">{children}</main>
        <Footer locale={locale} dict={dict.footer} tax={dict.tax} />
        <RevealObserver />
        <LanguageGate current={locale} />
      </body>
    </html>
  )
}
