import ProductHero from '@/components/product/ProductHero'
import ModuleGrid from '@/components/product/ModuleGrid'
import AnnotatedShot from '@/components/product/AnnotatedShot'
import VideoSection from '@/components/product/VideoSection'
import TaxAuthorities from '@/components/shared/TaxAuthorities'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import screens from '@/lib/erp-screens.json'

// /explore/ — AMCO ERP in detail: dark hero with the dashboard → light modules
// → the tour of real screens → the tax authorities → videos.

type ScreenData = { width: number; height: number; markers: { key: string; x: number; y: number }[] }
const SCREENS = screens as Record<string, ScreenData>

export default function ExploreView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const tour = dict.product.tour

  return (
    <>
      <ProductHero locale={locale} dict={dict.product.hero} />
      <ModuleGrid dict={dict.product.modules} />

      <section id="tour" className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="container-page">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.24em] text-accent-deep uppercase rtl:text-sm rtl:tracking-normal">{tour.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(1.5rem,1.05rem+1.9vw,2.3rem)] leading-tight font-extrabold tracking-tight text-text-1 rtl:leading-[1.75] rtl:font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {tour.title}
            </h2>
            <p className="mt-4 text-text-3 rtl:leading-[2.1]">{tour.body}</p>
          </div>

          <div className="mt-14 grid gap-20 sm:gap-24">
            {tour.screens.map((screen, index) => {
              const data = SCREENS[screen.id]
              if (!data) return null
              return (
                <AnnotatedShot
                  key={screen.id}
                  id={screen.id}
                  tag={screen.tag}
                  title={screen.title}
                  body={screen.body}
                  marks={screen.marks}
                  points={data.markers}
                  width={data.width}
                  height={data.height}
                  fullSize={tour.fullSize}
                  reverse={index % 2 === 1}
                />
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page">
          <TaxAuthorities dict={dict.tax} />
        </div>
      </section>

      <VideoSection locale={locale} dict={dict.product.videos} />
      {/* light ground between the dark videos band and the dark footer */}
      <div aria-hidden="true" className="h-16 sm:h-24" />
    </>
  )
}
