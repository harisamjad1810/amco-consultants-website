'use client'

import { useState, type CSSProperties } from 'react'

// One real AMCO ERP screen with numbered markers on it, and the legend that
// explains each one. Hovering, focusing or tapping either a marker or its
// legend line highlights the pair.
//
// The marker positions are MEASURED, not typed: the capture script
// (scratchpad erp-capture.mjs) read where each element sits on the live screen
// and wrote `src/lib/erp-screens.json` beside the image. Re-capture both
// together whenever the ERP screens change.

export type Mark = { key: string; text: string }
export type Point = { key: string; x: number; y: number }

type Props = {
  id: string
  tag: string
  title: string
  body: string
  marks: Mark[]
  points: Point[]
  width: number
  height: number
  /** "View full size" in the page's language. */
  fullSize: string
  reverse?: boolean
  eager?: boolean
}

export default function AnnotatedShot({ id, tag, title, body, marks, points, width, height, fullSize, reverse = false, eager = false }: Props) {
  const [active, setActive] = useState<number | null>(null)
  const placed = marks
    .map((mark, index) => ({ ...mark, index, point: points.find((p) => p.key === mark.key) }))
    .filter((mark) => mark.point)

  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`reveal lg:col-span-4 ${reverse ? 'lg:order-2' : ''}`}>
        <span className="inline-flex rounded-full bg-accent-wash px-3 py-1 text-xs font-bold tracking-wide text-accent-deep uppercase rtl:text-sm rtl:tracking-normal">{tag}</span>
        <h3 className="mt-4 text-[clamp(1.3rem,1rem+1.2vw,1.75rem)] leading-snug font-extrabold text-text-1 rtl:leading-[1.8] rtl:font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
        <p className="mt-3 leading-relaxed text-text-3 rtl:leading-[2.1]">{body}</p>

        <ol className="mt-6 grid gap-1.5">
          {placed.map((mark) => (
            <li key={mark.key}>
              <button
                type="button"
                onMouseEnter={() => setActive(mark.index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(mark.index)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(active === mark.index ? null : mark.index)}
                aria-describedby={`${id}-shot`}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-start transition-colors ${active === mark.index ? 'bg-accent-wash' : 'hover:bg-paper'}`}
              >
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${active === mark.index ? 'bg-text-1 text-fg-1' : 'bg-accent text-accent-ink'}`}>
                  {mark.index + 1}
                </span>
                <span className="text-[0.95rem] leading-snug text-text-2 rtl:leading-[1.9]">{mark.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <figure className={`reveal lg:col-span-8 ${reverse ? 'lg:order-1' : ''}`} style={{ '--delay': '120ms' } as CSSProperties}>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_70px_-35px_rgb(11_18_32/0.45)]">
          {/* a browser frame, so it reads as a screen rather than a picture */}
          <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ms-3 truncate rounded-md bg-surface px-2.5 py-0.5 text-[11px] text-text-3" dir="ltr">amcoerp.com</span>
          </div>
          {/* Screens are left-to-right whatever the page language, so the
              markers are positioned in LTR too. */}
          <div className="relative" dir="ltr" id={`${id}-shot`}>
            <img
              src={`/erp/${id}.webp`}
              alt={title}
              width={width}
              height={height}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className="block h-auto w-full"
            />
            {placed.map((mark) => {
              const on = active === mark.index
              return (
                <button
                  key={mark.key}
                  type="button"
                  aria-label={`${mark.index + 1}. ${mark.text}`}
                  onMouseEnter={() => setActive(mark.index)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(mark.index)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(on ? null : mark.index)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${mark.point!.x}%`, top: `${mark.point!.y}%`, zIndex: on ? 3 : 2 }}
                >
                  <span aria-hidden="true" className={`marker-halo absolute inset-0 rounded-full ${on ? 'bg-text-1/30' : 'bg-accent/50'}`} />
                  <span
                    className={`relative flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow-[0_4px_12px_rgb(0_0_0/0.25)] ring-2 ring-white transition-transform duration-200 sm:h-7 sm:w-7 sm:text-xs ${
                      on ? 'scale-125 bg-text-1 text-fg-1' : 'bg-accent text-accent-ink group-hover:scale-110'
                    }`}
                  >
                    {mark.index + 1}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
        <figcaption className="mt-3 text-end">
          <a href={`/erp/${id}.webp`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep hover:text-text-1">
            {fullSize}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-8 8M10 6H5v13h13v-5" /></svg>
          </a>
        </figcaption>
      </figure>
    </article>
  )
}
