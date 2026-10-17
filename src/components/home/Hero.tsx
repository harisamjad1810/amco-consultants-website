import type { CSSProperties } from 'react'
import HeroPreview from './HeroPreview'
import type { Dictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { demoPath, explorePath } from '@/lib/paths'

// The dark opening band. A server component: it ships no JavaScript, and its
// entrance is CSS (`.rise`), so the headline is on screen with the first paint
// rather than after a script has loaded and run.

type Props = {
  locale: Locale
  dict: Dictionary['hero']
}

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function Hero({ locale, dict }: Props) {
  return (
    <section className="night-sky relative overflow-hidden pt-28 pb-16 text-fg-2 sm:pt-32 sm:pb-24 lg:pt-36">
      <div aria-hidden="true" className="grid-lines absolute inset-0" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <p
            className="rise inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.08] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-accent uppercase rtl:text-xs rtl:tracking-normal"
            style={delay(0)}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {dict.eyebrow}
          </p>

          <h1
            className="mt-6 text-[clamp(2rem,1.1rem+3.8vw,3.75rem)] leading-[1.08] font-extrabold tracking-[-0.025em] text-fg-1 rtl:mt-8 rtl:leading-[1.65] rtl:font-bold rtl:tracking-normal"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="rise block" style={delay(80)}>
              {dict.titleLead}
            </span>
            <span className="rise text-gradient-accent block" style={delay(180)}>
              {dict.titleAccent}
            </span>
          </h1>

          <p className="rise mt-6 max-w-xl text-base leading-relaxed text-fg-3 sm:text-lg rtl:leading-[2.1]" style={delay(280)}>
            {dict.body}
          </p>

          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(380)}>
            <a href={explorePath(locale)} className="btn btn-accent group">
              {dict.primaryCta}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                →
              </span>
            </a>
            <a href={demoPath(locale)} className="btn btn-ghost-dark">
              {dict.secondaryCta}
            </a>
          </div>

          <dl className="rise mt-10 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] rtl:divide-x-reverse" style={delay(480)}>
            {dict.stats.map((stat) => (
              <div key={stat.label} className="min-w-0 px-3 py-3.5 sm:px-5 sm:py-4">
                <dt className="text-[11px] leading-tight text-fg-4 sm:text-xs">{stat.label}</dt>
                <dd className="mt-1 text-base font-extrabold text-fg-1 sm:text-xl" dir="ltr" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise" style={delay(300)}>
          <HeroPreview dict={dict.preview} />
        </div>
      </div>
    </section>
  )
}
