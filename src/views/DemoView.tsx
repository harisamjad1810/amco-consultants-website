import type { CSSProperties } from 'react'
import DemoForm from '@/components/shared/DemoForm'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

// /demo/ — the free-demo request on a page of its own. A dark opening band
// (the navbar is drawn white over it, as on every other page), then the form
// beside "what happens next", rising out of the band's bottom edge.

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function DemoView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const page = dict.demoPage

  return (
    <>
      <section className="night-sky relative overflow-hidden pt-28 pb-36 text-fg-2 sm:pt-32 sm:pb-40 lg:pt-36">
        <div aria-hidden="true" className="grid-lines absolute inset-0" />
        <div aria-hidden="true" className="absolute -top-24 start-1/2 h-72 w-[42rem] max-w-full -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(255_179_71/0.22),transparent)] rtl:translate-x-1/2" />
        <div className="container-page relative mx-auto max-w-3xl text-center">
          <p
            className="rise inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.08] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-accent uppercase rtl:text-xs rtl:tracking-normal"
            style={delay(0)}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {page.eyebrow}
          </p>
          <h1
            className="rise mt-6 text-[clamp(1.9rem,1.1rem+3.2vw,3.3rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-fg-1 rtl:mt-8 rtl:leading-[1.65] rtl:font-bold rtl:tracking-normal"
            style={{ fontFamily: 'var(--font-display)', ...delay(80) }}
          >
            {page.title}
          </h1>
          <p className="rise mx-auto mt-5 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg rtl:leading-[2.1]" style={delay(180)}>
            {page.body}
          </p>
          <ul className="rise mt-8 flex flex-wrap justify-center gap-2.5" style={delay(260)}>
            {dict.demo.points.map((point) => (
              <li key={point} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-sm text-fg-2">
                <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-ink">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="demo" className="relative -mt-24 pb-20 sm:-mt-28 sm:pb-28">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
            <div className="rise order-2 rounded-3xl border border-line bg-surface p-6 shadow-[0_24px_60px_-30px_rgb(11_18_32/0.35)] sm:p-8 lg:order-1" style={delay(420)}>
              <p className="text-xs font-bold tracking-[0.24em] text-accent-deep uppercase rtl:text-sm rtl:tracking-normal">{page.stepsEyebrow}</p>
              <h2
                className="mt-2 text-xl font-extrabold tracking-tight text-text-1 sm:text-2xl rtl:mt-3 rtl:leading-[1.7] rtl:font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {page.stepsTitle}
              </h2>
              <ol className="relative mt-6 grid gap-6">
                <span aria-hidden="true" className="absolute start-[1.1rem] top-3 bottom-3 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent" />
                {page.steps.map((step, index) => (
                  <li key={step.title} className="relative flex gap-4">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-accent-ink shadow-[0_6px_16px_-6px_rgb(245_158_44/0.8)]" dir="ltr">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-text-1 rtl:leading-[1.9]">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-text-3 rtl:leading-[2.1]">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 rounded-2xl border border-accent/30 bg-accent-wash px-4 py-3 text-sm text-text-2 rtl:leading-[2]">{page.note}</p>
            </div>

            <div className="rise order-1 rounded-3xl border border-line bg-surface p-5 shadow-[0_30px_80px_-30px_rgb(11_18_32/0.45)] sm:p-8 lg:order-2" style={delay(340)}>
              <h2 className="text-lg font-extrabold text-text-1 sm:text-xl rtl:font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                {page.formTitle}
              </h2>
              <p className="mt-1 mb-6 text-sm text-text-3 rtl:leading-[2]">{page.formBody}</p>
              <DemoForm locale={locale} dict={dict.demo} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
