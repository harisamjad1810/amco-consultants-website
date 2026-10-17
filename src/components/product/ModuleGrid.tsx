import type { CSSProperties } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'

// The modules, one card each, on the light ground.

type Props = {
  dict: Dictionary['product']['modules']
}

// One icon per module, in the dictionary's order.
const icons = [
  'M4 13h6V4H4zm10 7h6v-9h-6zM4 20h6v-5H4zm10-11h6V4h-6z',
  'M3 6h18l-2 12H5zM8 6V4h8v2',
  'M6 2h12l2 6H4zm-2 6v12h16V8M9 12h6',
  'M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4',
  'M4 20V8l5 3V8l5 3V4h6v16z',
  'M4 19h16M6 15V9m4 6V5m4 10v-4m4 4V7',
  'M12 3v6m0 0H6v4m6-4h6v4M4 13h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',
  'M5 20V10m5 10V4m5 16v-7m5 7V9',
  'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z',
  'M9 11a4 4 0 100-8 4 4 0 000 8zm-6 10a6 6 0 0112 0M17 11a3 3 0 100-6m4 16a5 5 0 00-4-5',
  'M12 15a3 3 0 100-6 3 3 0 000 6zm7-3l2-1-2-4-2 1-2-2V4h-4v2l-2 2-2-1-2 4 2 1v0l-2 1 2 4 2-1 2 2v2h4v-2l2-2 2 1 2-4z',
  'M4 6h16M4 12h10M4 18h7'
]

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function ModuleGrid({ dict }: Props) {
  return (
    <section id="modules" className="py-20 sm:py-24">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.24em] text-accent-deep uppercase rtl:text-sm rtl:tracking-normal">{dict.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(1.5rem,1.05rem+1.9vw,2.3rem)] leading-tight font-extrabold tracking-tight text-text-1 rtl:leading-[1.75] rtl:font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            {dict.title}
          </h2>
          <p className="mt-4 text-text-3 rtl:leading-[2.1]">{dict.body}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((item, index) => (
            <li
              key={item.title}
              className="reveal group rounded-2xl border border-line bg-surface p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_40px_-24px_rgb(11_18_32/0.25)]"
              style={delay((index % 4) * 70)}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-wash text-accent-deep transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={icons[index % icons.length]} />
                </svg>
              </span>
              <h3 className="mt-4 font-bold text-text-1 rtl:font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-3 rtl:leading-[2]">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
