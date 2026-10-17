import Link from 'next/link'
import Backdrop from '@/components/layout/Backdrop'
import Logo from '@/components/brand/Logo'
import { fontVariables } from '@/lib/fonts'

// Built as `out/404.html`; nginx serves it for any address that is not a page.

export default function NotFound() {
  return (
    <html lang="en" dir="ltr" className={`${fontVariables} bg-ink-950`}>
      <body className="bg-transparent">
        <Backdrop />
        <div className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
          <Logo />
          <p className="font-[family-name:var(--font-display)] text-7xl font-extrabold text-gradient-accent">404</p>
          <p className="text-fg-3">This page does not exist.</p>
          <p lang="ur" dir="rtl" className="font-[family-name:var(--font-urdu)] text-lg text-fg-3">
            یہ صفحہ موجود نہیں۔
          </p>
          <div className="flex gap-4">
            <Link href="/" className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink">
              Home
            </Link>
            <Link href="/ur/" lang="ur" className="rounded-full border border-white/15 px-6 py-3 font-[family-name:var(--font-urdu)] text-fg-1">
              ہوم
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
