import type { CSSProperties } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { demoPath } from '@/lib/paths'
import { ERP_LOGIN_URL } from '@/lib/site'

// The product page's dark opening band, with the dashboard screenshot rising
// out of it. A server component; the entrance is CSS (`.rise`).

type Props = {
  locale: Locale
  dict: Dictionary['product']['hero']
}

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function ProductHero({ locale, dict }: Props) {
  return (
    <section className="night-sky relative overflow-hidden pt-28 text-fg-2 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="grid-lines absolute inset-0" />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="rise inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-accent uppercase rtl:text-xs rtl:tracking-normal" style={delay(0)}>
            {dict.eyebrow}
          </p>
          <h1
            className="rise mt-6 text-[clamp(1.9rem,1.1rem+3.2vw,3.4rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-fg-1 rtl:leading-[1.65] rtl:font-bold rtl:tracking-normal"
            style={{ fontFamily: 'var(--font-display)', ...delay(80) }}
          >
            {dict.title}
          </h1>
          <p className="rise mx-auto mt-5 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg rtl:leading-[2.1]" style={delay(180)}>
            {dict.body}
          </p>
          <div className="rise mt-8 flex flex-col justify-center gap-3 sm:flex-row" style={delay(260)}>
            <a href={demoPath(locale)} className="btn btn-accent">
              {dict.primaryCta}
              <span aria-hidden="true" className="rtl:rotate-180">→</span>
            </a>
            <a href={ERP_LOGIN_URL} className="btn btn-ghost-dark">
              {dict.secondaryCta}
            </a>
          </div>

          <dl className="rise mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4" style={delay(340)}>
            {dict.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse bg-ink-950/80 px-3 py-3.5">
                <dt className="mt-0.5 text-[11px] text-fg-4 sm:text-xs">{stat.label}</dt>
                <dd className="text-lg font-extrabold text-fg-1 sm:text-xl" dir="ltr" style={{ fontFamily: 'var(--font-jakarta)' }}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The dashboard, cropped by the band's bottom edge so it reads as
            "the product starts here". */}
        <div className="rise relative mx-auto mt-12 max-w-5xl" style={delay(420)}>
          <div aria-hidden="true" className="absolute -inset-x-10 -top-10 h-40 bg-[radial-gradient(closest-side,rgb(255_179_71/0.25),transparent)]" />
          <div className="relative overflow-hidden rounded-t-2xl border border-b-0 border-white/15 bg-ink-850 p-1.5 pb-0 shadow-[0_-20px_80px_-30px_rgb(255_179_71/0.35)] sm:p-2.5 sm:pb-0">
            <img
              src="/erp/dashboard.webp"
              alt=""
              width={1440}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full rounded-t-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
