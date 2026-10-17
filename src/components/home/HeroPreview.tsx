import type { CSSProperties } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'

// A glimpse of AMCO ERP, drawn in HTML and CSS rather than as a screenshot:
// it is sharp at every size, costs no image download, and translates with the
// rest of the page. The figures are illustrative.

type Props = {
  dict: Dictionary['hero']['preview']
}

const rows = [
  { code: '0101', name: 'Cash & Bank', debit: '1,245,000', credit: '', width: 82 },
  { code: '0102', name: 'Trade Receivable', debit: '864,300', credit: '', width: 58 },
  { code: '0301', name: 'Trade Payable', debit: '', credit: '702,800', width: 47 },
  { code: '0601', name: 'Sales Revenue', debit: '', credit: '1,406,500', width: 93 }
]

const bars = [38, 52, 44, 66, 58, 74, 90]

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function HeroPreview({ dict }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgb(255_179_71/0.18),transparent)]" />

      {/* trial balance. The top and bottom padding are the room the two floating
          cards sit in, so neither ever covers a figure. */}
      <div className="relative mt-7 rounded-3xl border border-white/10 bg-ink-850/90 px-4 pt-11 pb-16 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] sm:px-6 sm:pt-12 sm:pb-20">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-fg-1">{dict.title}</p>
            <p className="text-xs text-fg-4">{dict.period}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
            <span aria-hidden="true">✓</span>
            {dict.balanced}
          </span>
        </div>

        <div className="mt-4 space-y-2.5" dir="ltr">
          {rows.map((row, i) => (
            <div key={row.code} className="rounded-xl bg-white/[0.03] px-3 py-2.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="min-w-0 truncate text-fg-2">
                  <span className="text-fg-4 tabular-nums">{row.code}</span> {row.name}
                </span>
                <span className={`shrink-0 font-semibold tabular-nums ${row.debit ? 'text-fg-1' : 'text-accent'}`}>
                  {row.debit || row.credit}
                </span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`bar-grow h-full rounded-full ${row.debit ? 'bg-sky-400/70' : 'bg-accent/80'}`}
                  style={{ width: `${row.width}%`, ...delay(500 + i * 120) }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 text-xs">
          <div>
            <p className="text-fg-4">{dict.debit}</p>
            <p className="mt-0.5 font-bold text-fg-1 tabular-nums" dir="ltr">Rs 2,109,300</p>
          </div>
          <div className="text-end">
            <p className="text-fg-4">{dict.credit}</p>
            <p className="mt-0.5 font-bold text-fg-1 tabular-nums" dir="ltr">Rs 2,109,300</p>
          </div>
        </div>
      </div>

      {/* sales — floats over the bottom corner */}
      <div className="float relative -mt-12 ms-auto me-3 w-[64%] max-w-[17rem] rounded-2xl border border-white/10 bg-ink-800 p-3.5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] sm:-mt-16 sm:me-[-0.75rem] sm:p-4">
        <p className="truncate text-[11px] text-fg-4">{dict.sales}</p>
        <p className="mt-0.5 text-lg font-extrabold text-fg-1 tabular-nums" dir="ltr" style={{ fontFamily: 'var(--font-jakarta)' }}>
          Rs 1.41M <span className="text-xs font-semibold text-emerald-300">+18%</span>
        </p>
        <div className="mt-2 flex h-10 items-end gap-1" dir="ltr" aria-hidden="true">
          {bars.map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-accent-strong to-accent" style={{ height: `${h}%`, opacity: 0.45 + i * 0.08 }} />
          ))}
        </div>
      </div>

      {/* FBR chip — floats on the other side */}
      <div
        className="float absolute top-0 start-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-ink-800 px-3 py-2.5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] sm:start-6"
        style={{ animationDelay: '-3s' }}
      >
        <span aria-hidden="true" className="grid h-8 w-8 shrink-0 grid-cols-3 gap-0.5 rounded-md bg-white p-1">
          {[1, 0, 1, 0, 1, 0, 1, 1, 0].map((on, i) => (
            <span key={i} className={on ? 'bg-ink-950' : ''} />
          ))}
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] text-fg-4">{dict.invoice}</span>
          <span className="block text-xs font-semibold text-emerald-300">{dict.accepted}</span>
        </span>
      </div>
    </div>
  )
}
