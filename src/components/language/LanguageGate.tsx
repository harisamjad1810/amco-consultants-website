'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import LanguageDialog from './LanguageDialog'
import { readSavedLocale, saveLocale, swapLocaleInPath } from '@/lib/language-preference'
import type { Locale } from '@/i18n/config'

// Decides whether the language dialog appears. Every page already has a
// language (English at the root, Urdu under /ur/), so:
//
//   no saved choice -> ask, a moment after the page has painted
//   a saved choice  -> stay; the address they opened wins
//
// A returning Urdu visitor who opens the bare domain is sent to /ur/ by the
// inline head script in SiteShell, before anything is drawn — not here.
// The check runs in an effect, so the server HTML never contains the dialog
// and a returning visitor never sees it flash.

type Props = {
  current: Locale
}

export default function LanguageGate({ current }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (readSavedLocale()) return
    // The other language's page is fetched now, while the visitor reads the
    // dialog, so whichever they pick opens without a wait.
    router.prefetch(swapLocaleInPath(window.location.pathname, current === 'en' ? 'ur' : 'en'))
    const timer = window.setTimeout(() => setOpen(true), 700)
    return () => window.clearTimeout(timer)
  }, [current, router])

  const choose = useCallback(
    (locale: Locale) => {
      saveLocale(locale)
      setOpen(false)
      if (locale !== current) router.push(swapLocaleInPath(pathname, locale), { scroll: false })
    },
    [current, pathname, router]
  )

  // Closing the dialog keeps the page's language — and remembers it, so the
  // visitor is not asked again on every page.
  const dismiss = useCallback(() => {
    saveLocale(current)
    setOpen(false)
  }, [current])

  return <LanguageDialog open={open} current={current} onChoose={choose} onDismiss={dismiss} />
}
