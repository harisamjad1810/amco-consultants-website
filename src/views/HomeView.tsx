import Hero from '@/components/home/Hero'
import ErpShowcase from '@/components/home/ErpShowcase'
import CaBand from '@/components/home/CaBand'
import TeamSection from '@/components/home/TeamSection'
import TaxAuthorities from '@/components/shared/TaxAuthorities'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

// Dark hero → light features → the tax authorities → dark Chartered
// Accountants band → our team. The free-demo form has its own page (/demo/);
// the footer's call-to-action card leads there from every page.

export default function HomeView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  return (
    <>
      <Hero locale={locale} dict={dict.hero} />
      <ErpShowcase locale={locale} dict={dict.erp} tax={dict.tax} />
      <section id="tax" className="pb-20 sm:pb-28">
        <div className="container-page">
          <TaxAuthorities dict={dict.tax} />
        </div>
      </section>
      <CaBand dict={dict.ca} />
      <TeamSection locale={locale} dict={dict.team} />
    </>
  )
}
