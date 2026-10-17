import type { CSSProperties } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'

// The five tax authorities, each with an honest status. Only FBR and PRA file
// live from AMCO ERP today; KPRA and BRA have declaration pages; SRB is coming.
// The status text is in the dictionary, so changing a claim is a copy edit.

type Props = {
  dict: Dictionary['tax']
  /** `dark` sits inside a night-sky band, `light` on the paper ground. */
  tone?: 'dark' | 'light'
}

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function TaxAuthorities({ dict, tone = 'light' }: Props) {
  const dark = tone === 'dark'

  return (
    <div>
      <div className="reveal mx-auto max-w-2xl text-center">
        <p className={`text-xs font-bold tracking-[0.24em] uppercase rtl:text-sm rtl:tracking-normal ${dark ? 'text-accent' : 'text-accent-deep'}`}>
          {dict.eyebrow}
        </p>
        <h2
          className={`mt-3 text-[clamp(1.5rem,1.05rem+1.9vw,2.3rem)] leading-tight font-extrabold tracking-tight rtl:leading-[1.75] rtl:font-bold ${dark ? 'text-fg-1' : 'text-text-1'}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {dict.title}
        </h2>
        <p className={`mt-4 text-base leading-relaxed rtl:leading-[2.1] ${dark ? 'text-fg-3' : 'text-text-3'}`}>{dict.body}</p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-5">
        {dict.authorities.map((authority, index) => {
          const live = authority.status === 'live'
          const soon = authority.status === 'soon'
          return (
            <li
              key={authority.code}
              className={`reveal flex flex-col gap-3 rounded-2xl border p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-5 ${
                dark ? 'border-white/10 bg-white/[0.04]' : 'border-line bg-surface shadow-[0_1px_2px_rgb(11_18_32/0.04)]'
              } ${soon ? 'opacity-80' : ''}`}
              style={delay(index * 70)}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  dir="ltr"
                  className={`rounded-xl px-2.5 py-1.5 text-lg font-extrabold tracking-tight ${
                    live ? 'bg-accent text-accent-ink' : dark ? 'bg-white/10 text-fg-1' : 'bg-paper text-text-1'
                  }`}
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {authority.code}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap rtl:text-xs ${
                    live
                      ? 'bg-ok-wash text-ok'
                      : soon
                        ? dark ? 'bg-white/10 text-fg-3' : 'bg-paper text-text-3'
                        : 'bg-accent-wash text-accent-deep'
                  }`}
                >
                  {live && (
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="marker-halo absolute inline-flex h-full w-full rounded-full bg-ok" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
                    </span>
                  )}
                  {dict.status[authority.status]}
                </span>
              </div>
              <div>
                <p className={`text-sm leading-snug font-semibold rtl:leading-[1.9] ${dark ? 'text-fg-1' : 'text-text-1'}`}>{authority.name}</p>
                <p className={`mt-1 text-xs rtl:text-sm ${dark ? 'text-fg-4' : 'text-text-3'}`}>{authority.note}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
