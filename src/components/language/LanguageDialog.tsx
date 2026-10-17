'use client'

import { useEffect, useRef } from 'react'
import Logo from '@/components/brand/Logo'
import { getDictionary } from '@/i18n/get-dictionary'
import { localeMeta, locales, type Locale } from '@/i18n/config'
import { warmUrduFont } from '@/lib/warm-urdu-font'

// The first thing a new visitor sees. We do not know their language yet, so
// the dialog speaks BOTH — every line in English and in Urdu, each in its own
// script. The entrance is CSS (`dialog-in` in globals.css), staggered by a
// per-element delay.

type Props = {
  open: boolean
  current: Locale | null
  onChoose: (locale: Locale) => void
  // Only offered when the visitor is already on a page in some language.
  // On the splash page there is nothing behind the dialog to return to.
  onDismiss?: () => void
}

const enter = (delay: number) => ({ animation: `dialog-in 0.6s var(--ease-out-expo) ${delay}ms both` })

export default function LanguageDialog({ open, current, onChoose, onDismiss }: Props) {
  const firstButton = useRef<HTMLButtonElement>(null)
  const en = getDictionary('en').languageDialog
  const ur = getDictionary('ur').languageDialog

  useEffect(() => {
    if (!open) return
    warmUrduFont()
    const timer = window.setTimeout(() => firstButton.current?.focus({ preventScroll: true }), 350)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onDismiss) onDismiss()
    }
    window.addEventListener('keydown', onKey)
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = previous
    }
  }, [open, onDismiss])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ animation: 'fade-in 0.3s ease-out both' }}>
      <div className="absolute inset-0 bg-ink-950/75 backdrop-blur-sm" onClick={onDismiss} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-dialog-title"
        className="night-sky relative w-full max-w-[460px] overflow-hidden rounded-[28px] border border-white/10 p-6 shadow-[0_40px_100px_-20px_rgb(0_0_0/0.8)] sm:p-9"
        style={enter(0)}
      >
        <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="flex justify-center" style={enter(80)}>
          <Logo tone="dark" />
        </div>

        <div className="mt-6 text-center" style={enter(160)}>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            {en.eyebrow}
            <span className="mx-2 text-fg-4">·</span>
            <span lang="ur" dir="rtl" className="tracking-normal normal-case" style={{ fontFamily: 'var(--font-urdu)' }}>
              {ur.eyebrow}
            </span>
          </p>
          <h2 id="language-dialog-title" className="mt-3 text-[1.6rem] leading-tight font-extrabold text-fg-1 sm:text-3xl" style={{ fontFamily: 'var(--font-jakarta)' }}>
            {en.title}
          </h2>
          <p lang="ur" dir="rtl" className="mt-1 text-lg leading-[2] text-fg-2 sm:text-xl" style={{ fontFamily: 'var(--font-urdu)' }}>
            {ur.title}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4" style={enter(240)}>
          {locales.map((locale, index) => {
            const meta = localeMeta[locale]
            const isUrdu = locale === 'ur'
            const active = current === locale
            return (
              <button
                key={locale}
                ref={index === 0 ? firstButton : undefined}
                type="button"
                onClick={() => onChoose(locale)}
                className={`group relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border px-3 py-5 transition duration-300 hover:-translate-y-1 active:scale-[0.98] ${
                  active ? 'border-accent/60 bg-accent/10' : 'border-white/10 bg-white/[0.04] hover:border-accent/50 hover:bg-accent/[0.08]'
                }`}
              >
                <span
                  lang={meta.htmlLang}
                  dir={meta.dir}
                  className={`text-fg-1 ${isUrdu ? 'text-[1.7rem] leading-[1.8]' : 'text-[1.4rem] leading-[1.8] font-extrabold'}`}
                  style={{ fontFamily: isUrdu ? 'var(--font-urdu)' : 'var(--font-jakarta)' }}
                >
                  {meta.native}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-fg-4 uppercase transition-colors group-hover:text-accent">
                  {meta.label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 text-center text-xs text-fg-4" style={enter(320)}>
          <p>{en.remember}</p>
          <p lang="ur" dir="rtl" className="text-sm leading-[2]" style={{ fontFamily: 'var(--font-urdu)' }}>
            {ur.remember}
          </p>
        </div>
      </div>
    </div>
  )
}
