import type { CSSProperties } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { ERP_VIDEOS } from '@/lib/erp-videos'

// Videos of AMCO ERP. Each video downloads only when it is played
// (`preload="none"`), so the page stays light however many are added.

type Props = {
  locale: Locale
  dict: Dictionary['product']['videos']
}

export default function VideoSection({ locale, dict }: Props) {
  return (
    <section id="videos" className="night-sky relative overflow-hidden py-20 text-fg-2 sm:py-24">
      <div aria-hidden="true" className="grid-lines absolute inset-0" />
      <div className="container-page relative">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.24em] text-accent uppercase rtl:text-sm rtl:tracking-normal">{dict.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(1.5rem,1.05rem+1.9vw,2.3rem)] leading-tight font-extrabold tracking-tight text-fg-1 rtl:leading-[1.75] rtl:font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            {dict.title}
          </h2>
          <p className="mt-4 text-fg-3 rtl:leading-[2.1]">{dict.body}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ERP_VIDEOS.length
            ? ERP_VIDEOS.map((video) => (
                <figure key={video.src} className="reveal overflow-hidden rounded-2xl border border-white/10 bg-ink-850">
                  <video controls preload="none" playsInline poster={video.poster} className="aspect-video w-full bg-black">
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <figcaption className="px-4 py-3 text-sm font-semibold text-fg-1">{video.title[locale]}</figcaption>
                </figure>
              ))
            : dict.placeholders.map((title, index) => (
                <div key={title} className="reveal overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]" style={{ '--delay': `${index * 90}ms` } as CSSProperties}>
                  <div className="relative flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgb(255_179_71/0.18),transparent_60%)]">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10" aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="ms-1 h-6 w-6 text-fg-1" fill="currentColor">
                        <path d="M8 5.5v13l10.5-6.5z" />
                      </svg>
                    </span>
                    <span className="absolute bottom-3 start-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-fg-2 rtl:text-xs">{dict.soon}</span>
                  </div>
                  <p className="px-4 py-3 text-sm font-semibold text-fg-1 rtl:leading-[1.9]">{title}</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}
