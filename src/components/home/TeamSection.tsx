import type { CSSProperties } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { TEAM } from '@/lib/team'

// "Our team" — the people behind the firm and the product, on the light
// ground. The people themselves are in `src/lib/team.ts`; this file only lays
// them out.

type Props = {
  locale: Locale
  dict: Dictionary['team']
}

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function TeamSection({ locale, dict }: Props) {
  return (
    <section id="team" className="pb-20 sm:pb-28">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.24em] text-accent-deep uppercase rtl:text-sm rtl:tracking-normal">{dict.eyebrow}</p>
          <h2
            className="mt-3 text-[clamp(1.6rem,1.1rem+2vw,2.5rem)] leading-tight font-extrabold tracking-tight text-text-1 rtl:leading-[1.7] rtl:font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {dict.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-3 sm:text-lg rtl:leading-[2.1]">{dict.body}</p>
        </div>

        {/* flex (not grid) so an unfilled last row is centred */}
        <ul className="mt-12 flex flex-wrap justify-center gap-5">
          {TEAM.map((member, index) => (
            <li
              key={member.photo + member.name.en}
              className="reveal group relative w-full overflow-hidden rounded-3xl min-[480px]:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)] border border-line bg-surface shadow-[0_1px_2px_rgb(11_18_32/0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgb(11_18_32/0.35)]"
              style={delay((index % 4) * 90)}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
                <img
                  src={member.photo}
                  alt={member.name[locale]}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink-950/80 to-transparent" />
                {member.credential && (
                  <span className="absolute top-3 start-3 rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-bold tracking-wide text-accent-ink" dir="ltr">
                    {member.credential}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-lg font-bold text-fg-1 rtl:font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                    {member.name[locale]}
                  </p>
                  <p className="mt-0.5 text-sm text-fg-2 rtl:mt-1">{member.role[locale]}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
