import type { CSSProperties, ReactNode } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { explorePath } from '@/lib/paths'

// AMCO ERP on the light ground, as a bento grid: every feature card carries a
// small drawing of what it does (a balanced trial balance, the five tax
// authorities, a statement, FIFO cost layers, an approval), and the last tile
// is the way into the product page. A server component; the cards fade up
// through the shared `.reveal` class (RevealObserver).
//
// The figures in the drawings are illustrative and add up — the trial balance
// really balances — because an accountant reading this page will check.

type Props = {
  locale: Locale
  dict: Dictionary['erp']
  tax: Dictionary['tax']
}

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

// One icon per feature, in the same order as the dictionary's list.
const icons = [
  'M7 3h7l4 4v14H7zM14 3v4h4M10 13l2 2 3-4',
  'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zm-3 9l2 2 4-4',
  'M5 20V10m5 10V4m5 16v-7m5 7V9',
  'M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4',
  'M16 11a4 4 0 1 0-8 0M4 21a8 8 0 0 1 16 0M18 8l2 2 3-3'
]

// debit, credit — per ledger row; the totals below are their sums
const ledgerRows: [string, string][] = [
  ['', '1,240,000'],
  ['860,000', ''],
  ['552,400', ''],
  ['', '172,400']
]

const bars = [38, 52, 46, 64, 72, 88]

const layers = [
  { width: '100%', qty: '40', rate: '118.00' },
  { width: '78%', qty: '30', rate: '121.50' },
  { width: '54%', qty: '25', rate: '124.00' }
]

const statusTone = {
  live: 'bg-ok-wash text-ok',
  declarations: 'bg-accent-wash text-accent-deep',
  soon: 'bg-paper text-text-3'
} as const

const dotTone = {
  live: 'bg-ok',
  declarations: 'bg-accent-strong',
  soon: 'bg-text-3/50'
} as const

function Card({ index, className = '', children }: { index: number; className?: string; children: ReactNode }) {
  return (
    <li
      className={`reveal group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgb(11_18_32/0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_28px_60px_-28px_rgb(11_18_32/0.3)] sm:p-7 ${className}`}
      style={delay((index % 3) * 90)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -end-24 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgb(255_179_71/0.22),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </li>
  )
}

function Heading({ index, icon, title, body }: { index: number; icon: string; title: string; body: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-wash text-accent-deep transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={icon} />
        </svg>
      </span>
        <span aria-hidden="true" className="text-xs font-bold tracking-widest text-text-3/70" dir="ltr">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-text-1 rtl:font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-text-3 rtl:leading-[2.1]">{body}</p>
    </div>
  )
}

// The drawings are decoration: the card's own text already says what each shows.
function Visual({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className={`rounded-2xl border border-line p-4 text-[0.8rem] ${className || 'bg-paper'}`}>
      {children}
    </div>
  )
}

const tick = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5 9-10" />
  </svg>
)

export default function ErpShowcase({ locale, dict, tax }: Props) {
  const [books, taxFeature, statements, stock, roles] = dict.features
  const v = dict.visual

  return (
    <section id="erp" className="py-20 sm:py-28">
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

        <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* 01 — the books: a trial balance that balances */}
          <Card index={0} className="md:col-span-2">
            <div className="grid gap-6 sm:grid-cols-[1fr_1.1fr] sm:items-center">
              <Heading index={0} icon={icons[0]} title={books.title} body={books.body} />
              <Visual className="bg-surface">
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-line pb-2 text-[0.7rem] font-semibold tracking-wide text-text-3 uppercase rtl:text-xs rtl:tracking-normal">
                  <span />
                  <span className="min-w-[4.6rem] text-end">{v.debit}</span>
                  <span className="min-w-[4.6rem] text-end">{v.credit}</span>
                </div>
                {v.ledger.map((row, i) => (
                  <div key={row} className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-line/70 py-1.5 text-text-2">
                    <span>{row}</span>
                    <span className="min-w-[4.6rem] text-end tabular-nums" dir="ltr">{ledgerRows[i][0] || '—'}</span>
                    <span className="min-w-[4.6rem] text-end tabular-nums" dir="ltr">{ledgerRows[i][1] || '—'}</span>
                  </div>
                ))}
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 pt-2 font-bold text-text-1">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-ok-wash px-2.5 py-0.5 text-[0.72rem] font-semibold text-ok">
                    {tick}
                    {v.balanced}
                  </span>
                  <span className="min-w-[4.6rem] text-end tabular-nums" dir="ltr">1,412,400</span>
                  <span className="min-w-[4.6rem] text-end tabular-nums" dir="ltr">1,412,400</span>
                </div>
              </Visual>
            </div>
          </Card>

          {/* 02 — the five tax authorities, with their real status */}
          <Card index={1} className="lg:row-span-2">
            <Heading index={1} icon={icons[1]} title={taxFeature.title} body={taxFeature.body} />
            <Visual className="mt-6 flex flex-1 flex-col gap-2 bg-surface">
              {tax.authorities.map((authority) => (
                <div key={authority.code} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-3 py-2.5">
                  <span className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${dotTone[authority.status]}`} />
                    <span className="font-bold tracking-wide text-text-1" dir="ltr">{authority.code}</span>
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap rtl:text-xs ${statusTone[authority.status]}`}>
                    {tax.status[authority.status]}
                  </span>
                </div>
              ))}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ok/25 bg-ok-wash px-3 py-2.5">
                <span className="font-semibold text-text-1">
                  {v.invoice} <span className="tabular-nums text-text-3" dir="ltr">SL-0108</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-ok rtl:text-xs">
                  {tick}
                  {v.accepted}
                </span>
              </div>
              <div className="mt-auto flex items-center gap-3 pt-3">
                <svg viewBox="0 0 21 21" className="h-12 w-12 shrink-0 rounded-md bg-surface p-1 text-text-1 ring-1 ring-line" shapeRendering="crispEdges">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2zM14 0h7v7h-7zm1 1v5h5V1zm1 1h3v3h-3zM0 14h7v7H0zm1 1v5h5v-5zm1 1h3v3H2zM9 0h2v2H9zm0 3h1v3H9zm2 1h2v2h-2zM8 8h3v1H8zm4 0h2v2h-2zm3 1h3v1h-3zm4-1h2v3h-2zM9 10h2v3H9zm-9-1h2v2H0zm3 0h3v1H3zm9 3h3v2h-3zm4 0h1v4h-1zm2 2h3v2h-3zM9 15h3v1H9zm4 1h2v3h-2zm-4 2h2v3H9zm7 1h5v2h-5z"
                  />
                </svg>
                <span className="text-[0.75rem] leading-snug text-text-3 rtl:text-xs rtl:leading-[1.9]">{tax.body}</span>
              </div>
            </Visual>
          </Card>

          {/* 03 — statements */}
          <Card index={2}>
            <Heading index={2} icon={icons[2]} title={statements.title} body={statements.body} />
            <Visual className="mt-6 bg-paper">
              <div className="flex flex-wrap gap-1.5">
                {v.statements.map((name, i) => (
                  <span
                    key={name}
                    className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold rtl:text-xs ${i === 1 ? 'bg-text-1 text-fg-1' : 'border border-line bg-surface text-text-3'}`}
                  >
                    {name}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex h-20 items-end gap-2" dir="ltr">
                {bars.map((height, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-t-md transition-colors duration-500 ${i === bars.length - 1 ? 'bg-accent' : 'bg-accent/35 group-hover:bg-accent/55'}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-2.5">
                <span className="text-text-3">{v.netProfit}</span>
                <span className="font-bold whitespace-nowrap text-ok tabular-nums" dir="ltr">Rs 2,486,900 ↑</span>
              </div>
            </Visual>
          </Card>

          {/* 04 — stock and costing: FIFO layers */}
          <Card index={3}>
            <Heading index={3} icon={icons[3]} title={stock.title} body={stock.body} />
            <Visual className="mt-6 bg-paper">
              <div className="inline-flex rounded-full border border-line bg-surface p-0.5 text-[0.7rem] font-semibold rtl:text-xs">
                <span className="rounded-full bg-text-1 px-3 py-1 text-fg-1">{v.fifo}</span>
                <span className="px-3 py-1 text-text-3">{v.average}</span>
              </div>
              <p className="mt-3 text-[0.7rem] font-semibold tracking-wide text-text-3 uppercase rtl:text-xs rtl:tracking-normal">{v.layers}</p>
              <div className="mt-2 grid gap-1.5">
                {layers.map((layer, i) => (
                  <div
                    key={layer.rate}
                    className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-[0.75rem] font-semibold tabular-nums ${i === 0 ? 'bg-accent text-accent-ink' : 'bg-accent-wash text-accent-deep'}`}
                    style={{ width: layer.width }}
                    dir="ltr"
                  >
                    <span>{layer.qty} ×</span>
                    <span>{layer.rate}</span>
                  </div>
                ))}
              </div>
            </Visual>
          </Card>

          {/* 05 — roles and approvals */}
          <Card index={4} className="lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-[1fr_1.1fr] sm:items-center">
              <Heading index={4} icon={icons[4]} title={roles.title} body={roles.body} />
              <Visual className="bg-surface">
                <div className="flex flex-wrap gap-2">
                  {v.roles.map((role, i) => (
                    <span key={role} className="flex items-center gap-2 rounded-full border border-line bg-paper py-1 ps-1 pe-3">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-bold ${['bg-accent text-accent-ink', 'bg-ink-800 text-fg-1', 'bg-ok text-fg-1'][i % 3]}`}
                        dir="ltr"
                      >
                        {['AR', 'SK', 'MN'][i % 3]}
                      </span>
                      <span className="font-semibold text-text-2">{role}</span>
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5">
                  <span className="font-bold text-text-1 tabular-nums" dir="ltr">SI-0114</span>
                  <span className="rounded-full bg-accent-wash px-2.5 py-0.5 text-[0.7rem] font-semibold text-accent-deep rtl:text-xs">{v.awaiting}</span>
                  <span className="text-text-3 rtl:rotate-180">→</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ok-wash px-2.5 py-0.5 text-[0.7rem] font-semibold text-ok rtl:text-xs">
                    {tick}
                    {v.approved}
                  </span>
                </div>
              </Visual>
            </div>
          </Card>

          {/* the way in */}
          <li
            className="reveal night-sky relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 text-fg-2 md:col-span-2 lg:col-span-1 sm:p-7"
            style={delay(180)}
          >
            <div aria-hidden="true" className="grid-lines absolute inset-0" />
            <div className="relative">
              <h3 className="text-xl font-extrabold text-fg-1 rtl:font-bold rtl:leading-[1.8]" style={{ fontFamily: 'var(--font-display)' }}>
                {v.ctaTitle}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-3 rtl:leading-[2.1]">{v.ctaBody}</p>
            </div>
            <a href={explorePath(locale)} className="btn btn-accent relative mt-6 self-start">
              {dict.cta}
              <span aria-hidden="true" className="rtl:rotate-180">→</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
