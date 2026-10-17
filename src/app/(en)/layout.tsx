import type { ReactNode } from 'react'
import SiteShell from '@/views/SiteShell'

// English — the default language, at the root of the site: /, /explore/, /demo/.

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>
}
