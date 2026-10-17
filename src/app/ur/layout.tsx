import type { ReactNode } from 'react'
import SiteShell from '@/views/SiteShell'

// Urdu — every page under /ur/: /ur/, /ur/explore/, /ur/demo/.

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell locale="ur">{children}</SiteShell>
}
