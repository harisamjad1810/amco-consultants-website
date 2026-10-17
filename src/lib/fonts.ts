import { Inter, Plus_Jakarta_Sans, Sora } from 'next/font/google'

// Latin fonts are downloaded at BUILD time and served from our own domain, so
// the live site makes no request to Google.
//
// ⚠️ The Urdu font (Noto Nastaliq Urdu) is NOT loaded through next/font. It is
// a ~235 KB file, and next/font can only preload a font for every page or for
// none — so either every English visitor downloads it, or Urdu visitors get it
// late and the headline redraws. It is a plain @font-face in globals.css
// (`public/fonts/noto-nastaliq-urdu.woff2`), and the locale layout preloads it
// on Urdu pages only.

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-jakarta',
  display: 'swap'
})

// Sora is the logo's own typeface (the AMCO wordmark), one weight only.
export const sora = Sora({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-sora',
  display: 'swap'
})

export const fontVariables = `${inter.variable} ${jakarta.variable} ${sora.variable}`

export const URDU_FONT_URL = '/fonts/noto-nastaliq-urdu.woff2'
