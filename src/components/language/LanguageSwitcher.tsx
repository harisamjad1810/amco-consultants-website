'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localeMeta, type Locale } from '@/i18n/config'
import { saveLocale, swapLocaleInPath } from '@/lib/language-preference'
import { warmUrduFont } from '@/lib/warm-urdu-font'

// The EN | اردو pill in the top bar. Each side is a real <Link>, so Next.js
// fetches the other language's page in the background as soon as the pill is
// on screen — the switch then has nothing left to download.
//
// ⚠️ The word اردو here is drawn in the SYSTEM font, not Nastaliq. Drawing it in
// Nastaliq would make every English visitor download the ~230 KB Urdu font just
// to show four letters. Instead the font starts downloading the moment a
// visitor shows intent — hover, touch or keyboard focus on the Urdu side.

type Props = {
  current: Locale
  label: string
  // `dark` while the bar sits over the dark hero, `light` once it has turned white.
  tone: 'dark' | 'light'
}

export default function LanguageSwitcher({ current, label, tone }: Props) {
  const pathname = usePathname()
  const idle = tone === 'dark' ? 'text-fg-3 hover:text-fg-1' : 'text-text-3 hover:text-text-1'
  const frame = tone === 'dark' ? 'border-white/15 bg-white/[0.06]' : 'border-line bg-paper'

  return (
    <div role="group" aria-label={label} dir="ltr" className={`relative grid grid-cols-2 rounded-full border p-1 transition-colors duration-300 ${frame}`}>
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-accent shadow-[0_6px_16px_-6px_rgb(245_158_44/0.8)] transition-transform duration-300 ease-[var(--ease-out-expo)]"
        style={{ transform: current === 'ur' ? 'translateX(100%)' : 'none' }}
      />
      {(['en', 'ur'] as const).map((locale) => {
        const active = locale === current
        const isUrdu = locale === 'ur'
        return (
          <Link
            key={locale}
            href={swapLocaleInPath(pathname, locale)}
            onClick={() => saveLocale(locale)}
            onPointerEnter={isUrdu ? warmUrduFont : undefined}
            onTouchStart={isUrdu ? warmUrduFont : undefined}
            onFocus={isUrdu ? warmUrduFont : undefined}
            aria-current={active ? 'true' : undefined}
            lang={localeMeta[locale].htmlLang}
            scroll={false}
            className={`relative z-10 flex h-8 min-w-11 items-center justify-center rounded-full px-2.5 transition-colors duration-300 ${
              active ? 'text-accent-ink' : idle
            } ${isUrdu ? 'text-sm font-semibold' : 'text-xs font-bold tracking-wider'}`}
            style={{ fontFamily: isUrdu ? 'system-ui, sans-serif' : 'var(--font-jakarta)' }}
          >
            {isUrdu ? localeMeta.ur.native : 'EN'}
          </Link>
        )
      })}
    </div>
  )
}
