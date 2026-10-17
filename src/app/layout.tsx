import type { ReactNode } from 'react'
import './globals.css'

// The real <html> is drawn one level down — by `(en)/layout.tsx` (English, at
// the root) and `ur/layout.tsx` (Urdu, right to left), both through
// `views/SiteShell.tsx`. This layout only exists to load the stylesheet once.

export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
