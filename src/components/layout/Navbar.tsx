'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import Logo from '@/components/brand/Logo'
import LanguageSwitcher from '@/components/language/LanguageSwitcher'
import type { Dictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { demoPath, explorePath, homePath, teamPath, whyPath } from '@/lib/paths'
import { ERP_LOGIN_URL } from '@/lib/site'

// Over the dark hero the bar is transparent with white text. Once the page
// scrolls it lifts into a floating glass pill with dark text and a thin amber
// line showing how far down the page you are. On the home page the link of the
// section on screen (Why AMCO, Our team) lights up as you scroll past it.
// "Free demo" is the bar's main button and goes to /demo/ from every page.

type Props = {
  locale: Locale
  dict: Dictionary['nav']
}

type NavLink = { key: string; href: string; label: string; active: boolean; icon: ReactNode }

const icon = (path: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path}
  </svg>
)

const ICONS = {
  product: icon(<><rect x="3" y="4" width="18" height="14" rx="2.5" /><path d="M8 21h8M12 18v3M7 9h4M7 13h7" /></>),
  why: icon(<><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>),
  team: icon(<><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.3c2.3.1 4 1.6 4.5 4.2" /></>),
  signIn: icon(<path d="M7 17 17 7M9 7h8v8" />)
}

export default function Navbar({ locale, dict }: Props) {
  const pathname = usePathname() || ''
  const home = homePath(locale)
  const onHome = pathname === home || pathname === home.replace(/\/$/, '')
  const onExplore = pathname.includes('/explore')
  const onDemo = pathname.includes('/demo')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [section, setSection] = useState<string | null>(null)
  const progress = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Passive listener + one update per frame: scrolling is never held up by
    // this. The progress line is written straight to the element, so it does
    // not re-render the bar on every frame.
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
      const room = document.documentElement.scrollHeight - window.innerHeight
      if (progress.current) progress.current.style.transform = `scaleX(${room > 0 ? Math.min(1, window.scrollY / room) : 0})`
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    // Which home-page section is on screen: the band across the middle of the
    // window decides, so a link lights up as its section reaches the reader.
    setSection(null)
    if (!onHome) return
    const targets = ['why', 'team'].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!targets.length) return
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setSection(visible.has('team') ? 'team' : visible.has('why') ? 'why' : null)
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [onHome])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const light = scrolled || menuOpen
  const tone = light ? 'light' : 'dark'
  const links: NavLink[] = [
    { key: 'product', href: explorePath(locale), label: dict.product, active: onExplore, icon: ICONS.product },
    { key: 'why', href: whyPath(locale), label: dict.why, active: section === 'why', icon: ICONS.why },
    { key: 'team', href: teamPath(locale), label: dict.team, active: section === 'team', icon: ICONS.team }
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-0 sm:px-3">
      <div
        className={`relative mx-auto transition-[max-width,margin,border-radius,background-color,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] ${
          light
            ? 'max-w-6xl border-b border-line bg-surface/85 shadow-[0_18px_50px_-24px_rgb(11_18_32/0.45)] backdrop-blur-xl sm:mt-3 sm:rounded-2xl sm:border'
            : 'max-w-[90rem] border-b border-transparent sm:mt-0'
        }`}
      >
        <nav
          className={`flex items-center justify-between gap-3 px-4 transition-[height] duration-500 sm:px-6 ${
            light ? 'h-16' : 'h-16 sm:h-[4.75rem]'
          }`}
        >
          <Link href={home} aria-label="AMCO Consultants" className="shrink-0" onClick={() => setMenuOpen(false)}>
            <Logo tone={tone} className={`transition-[height] duration-500 ${light ? 'h-11' : 'h-12'}`} />
          </Link>

          <ul
            className={`hidden items-center gap-0.5 rounded-full border p-1 transition-colors duration-300 lg:flex ${
              light ? 'border-line bg-paper/70' : 'border-white/10 bg-white/[0.04] backdrop-blur-sm'
            }`}
          >
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  aria-current={link.active ? (link.key === 'product' ? 'page' : 'location') : undefined}
                  className={`group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-[color,background-color,box-shadow] duration-300 ${
                    link.active
                      ? light
                        ? 'bg-surface text-accent-deep shadow-[0_4px_14px_-6px_rgb(11_18_32/0.3)]'
                        : 'bg-white/[0.12] text-fg-1 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]'
                      : light
                        ? 'text-text-2 hover:bg-surface hover:text-text-1'
                        : 'text-fg-2 hover:bg-white/[0.07] hover:text-fg-1'
                  }`}
                >
                  <span className={`transition-colors duration-300 ${link.active ? 'text-accent' : 'opacity-60 group-hover:text-accent group-hover:opacity-100'}`}>
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <LanguageSwitcher current={locale} label={dict.language} tone={tone} />
            <a
              href={ERP_LOGIN_URL}
              className={`hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors xl:inline-flex ${
                light ? 'text-text-2 hover:text-accent-deep' : 'text-fg-2 hover:text-fg-1'
              }`}
            >
              {dict.tryErp}
              <span className="rtl:-scale-x-100">{ICONS.signIn}</span>
            </a>
            <a
              href={demoPath(locale)}
              aria-current={onDemo ? 'page' : undefined}
              className="btn btn-accent group relative hidden min-h-10 gap-2 overflow-hidden px-5 text-sm sm:inline-flex"
            >
              <span aria-hidden="true" className="nav-shine pointer-events-none absolute inset-0" />
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-ink/50 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-ink/80" />
              </span>
              <span className="relative">{dict.demo}</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? dict.close : dict.menu}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
                light ? 'border-line bg-surface text-text-1' : 'border-white/15 text-fg-1'
              }`}
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span className={`absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
                <span className={`absolute inset-x-0 bottom-0 h-0.5 rounded bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </nav>

        {/* How far down the page the reader is — only on the floating bar. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-4 bottom-0 h-[2px] overflow-hidden rounded-full transition-opacity duration-300 sm:inset-x-6 ${light && !menuOpen ? 'opacity-100' : 'opacity-0'}`}
        >
          <span
            ref={progress}
            className="block h-full w-full origin-left bg-gradient-to-r from-accent-strong via-accent to-accent-deep rtl:origin-right"
            style={{ transform: 'scaleX(0)' }}
          />
        </span>

        {/* Mobile and tablet menu: opens under the bar. Kept in the page (not
            unmounted) so the open and the close are both animated. */}
        <div
          id="mobile-menu"
          className={`grid transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
            menuOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 border-t border-line px-4 pt-3 pb-4 sm:px-6">
              {links.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  aria-current={link.active ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition-colors ${
                    link.active ? 'bg-accent-wash text-accent-deep' : 'text-text-1 hover:bg-paper'
                  }`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${link.active ? 'bg-accent text-accent-ink' : 'bg-paper text-accent-deep'}`}>
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href={demoPath(locale)} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="btn btn-accent w-full">
                  {dict.demo}
                </a>
                <a href={ERP_LOGIN_URL} tabIndex={menuOpen ? 0 : -1} className="btn btn-ghost-light w-full">
                  {dict.tryErp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
