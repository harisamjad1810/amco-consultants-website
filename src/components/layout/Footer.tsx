import Logo from '@/components/brand/Logo'
import type { Dictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { demoPath, explorePath, homePath } from '@/lib/paths'
import { ERP_LOGIN_URL } from '@/lib/site'

// The footer, on the same dark sky as the hero: a demo call-to-action card,
// then the brand, the site's links, the tax authorities and a bottom bar.
// Only real pages and anchors are linked — no contact details are invented
// here; add them to the dictionaries once the firm supplies them.

type Props = {
  locale: Locale
  dict: Dictionary['footer']
  tax: Dictionary['tax']
}

const statusDot = {
  live: 'bg-emerald-400',
  declarations: 'bg-accent',
  soon: 'bg-fg-4'
} as const

export default function Footer({ locale, dict, tax }: Props) {
  const year = new Date().getFullYear()
  const home = homePath(locale)
  const erp = explorePath(locale)
  const demo = demoPath(locale)

  const columns = [
    {
      heading: dict.explore,
      links: [
        { href: home, label: dict.links.home },
        { href: `${home}#why`, label: dict.links.why },
        { href: `${home}#team`, label: dict.links.team },
        { href: demo, label: dict.links.demo }
      ]
    },
    {
      heading: dict.productHeading,
      links: [
        { href: erp, label: dict.links.overview },
        { href: `${erp}#modules`, label: dict.links.modules },
        { href: `${erp}#tour`, label: dict.links.tour },
        { href: `${erp}#videos`, label: dict.links.videos },
        { href: `${home}#tax`, label: dict.links.tax }
      ]
    }
  ]

  return (
    <footer className="night-sky relative overflow-hidden text-fg-2">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />

      <div className="container-page relative pt-16 pb-8 sm:pt-20">
        {/* call to action */}
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 sm:p-10">
          <div aria-hidden="true" className="absolute -top-24 end-0 h-56 w-2/3 bg-[radial-gradient(closest-side,rgb(255_179_71/0.28),transparent)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-[0.24em] text-accent uppercase rtl:text-sm rtl:tracking-normal rtl:leading-loose">{dict.ctaEyebrow}</p>
              <h2
                className="mt-2 rtl:mt-3 text-[clamp(1.4rem,1rem+1.6vw,2.1rem)] leading-tight font-extrabold tracking-tight text-fg-1 rtl:leading-[1.7] rtl:font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {dict.ctaTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-3 sm:text-base rtl:leading-[2.1]">{dict.ctaBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={demo} className="btn btn-accent">
                {dict.ctaButton}
              </a>
              <a href={ERP_LOGIN_URL} className="btn btn-ghost-dark">
                {dict.signIn}
                <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* brand, links, authorities */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <a href={home} aria-label="AMCO Consultants" className="inline-block">
              <Logo tone="dark" className="h-20" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-3 rtl:leading-[2.1]">{dict.tagline}</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {dict.badge}
            </span>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="text-sm font-bold text-fg-1">{column.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="group inline-flex items-center text-sm text-fg-3 transition-colors hover:text-fg-1">
                      <span aria-hidden="true" className="h-px w-0 bg-accent transition-[width,margin] duration-300 group-hover:me-2 group-hover:w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <p className="text-sm font-bold text-fg-1">{dict.authoritiesHeading}</p>
            <p className="mt-2 text-xs leading-relaxed text-fg-4 rtl:leading-[2]">{dict.authoritiesNote}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tax.authorities.map((authority) => (
                <li
                  key={authority.code}
                  title={`${authority.name} · ${tax.status[authority.status]}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${statusDot[authority.status]}`} aria-hidden="true" />
                  <span className="text-xs font-bold tracking-wide text-fg-1" dir="ltr">{authority.code}</span>
                  <span className="text-[0.7rem] text-fg-4">{tax.status[authority.status]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-fg-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} AMCO Consultants. {dict.rights}
          </p>
          <p className="sm:text-center">{dict.reviewed}</p>
          <a href="#" className="inline-flex items-center gap-1.5 self-start font-semibold text-fg-3 transition-colors hover:text-accent sm:self-auto">
            {dict.backToTop}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
