import type { CSSProperties } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'

// "Built by Chartered Accountants" — the firm's story, as a dark inset card on
// the light page, so the site alternates light and dark as it scrolls.

type Props = {
  dict: Dictionary['ca']
}

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function CaBand({ dict }: Props) {
  return (
    <section id="why" className="pb-20 sm:pb-28">
      <div className="container-page">
        <div className="reveal night-sky relative overflow-hidden rounded-[2rem] px-6 py-12 text-fg-2 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="grid-lines absolute inset-0" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.24em] text-accent uppercase rtl:text-sm rtl:tracking-normal">{dict.eyebrow}</p>
              <h2
                className="mt-3 text-[clamp(1.5rem,1rem+2vw,2.4rem)] leading-tight font-extrabold tracking-tight text-fg-1 rtl:leading-[1.75] rtl:font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {dict.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg rtl:leading-[2.1]">{dict.body}</p>
            </div>

            <ul className="grid gap-3">
              {dict.points.map((point, index) => (
                <li
                  key={point}
                  className="reveal flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
                  style={delay(150 + index * 100)}
                >
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-ink">
                    ✓
                  </span>
                  <span className="font-semibold text-fg-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
