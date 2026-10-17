import { useId } from 'react'

// The AMCO Consultants logo — the stacked mark (globe, rising amber line,
// AMCO / CONSULTANTS). The original files are `public/brand/
// amco-logo-stacked-green.svg` and `…-white.svg`; this is the same drawing
// inline, so it can switch between the two as the navbar changes ground.
// Every page draws the logo through this file.
//
// ⚠️ The mask id comes from useId: the logo is on the page more than once
// (navbar, footer, language dialog), and a mask referenced by id from inside
// a hidden copy stops working in Chrome. The fonts are set through `style`,
// because an SVG font-family ATTRIBUTE does not resolve var().

type LogoProps = {
  className?: string
  // `dark` = drawn on a dark ground (the white logo); `light` = on paper (green).
  tone?: 'dark' | 'light'
}

const palette = {
  light: { globe: '#154445', globeOpacity: 0.55, word: '#154445', sub: '#3D6F70' },
  dark: { globe: '#FFFFFF', globeOpacity: 0.82, word: '#FFFFFF', sub: '#D3D3D3' }
}

export default function Logo({ className = 'h-12', tone = 'dark' }: LogoProps) {
  const mask = `amco-band-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const c = palette[tone]

  return (
    <svg
      viewBox="20 25 360 250"
      className={`block w-auto shrink-0 ${className}`}
      role="img"
      aria-label="AMCO Consultants"
      style={{ direction: 'ltr' }}
    >
      <mask id={mask}>
        <rect x="0" y="0" width="400" height="300" fill="#fff" />
        <rect x="20" y="128" width="360" height="122" fill="#000" />
      </mask>
      <g
        mask={`url(#${mask})`}
        fill="none"
        stroke={c.globe}
        strokeOpacity={c.globeOpacity}
        strokeWidth="2.4"
        style={{ transition: 'stroke 0.3s' }}
      >
        <circle cx="200" cy="150" r="115" />
        <ellipse cx="200" cy="150" rx="38" ry="115" />
        <ellipse cx="200" cy="150" rx="76" ry="115" />
        <line x1="200" y1="35" x2="200" y2="265" />
        <line x1="85" y1="150" x2="315" y2="150" />
        <line x1="91.5" y1="112" x2="308.5" y2="112" />
        <line x1="91.5" y1="188" x2="308.5" y2="188" />
        <line x1="113.7" y1="74" x2="286.3" y2="74" />
        <line x1="113.7" y1="226" x2="286.3" y2="226" />
      </g>
      <polyline
        points="95,118 125,112 152,88 186,84 216,74 250,68 276,73 294,90"
        fill="none"
        stroke="#E9A23B"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="200"
        y="200"
        textAnchor="middle"
        fontSize="86"
        fontWeight="700"
        fill={c.word}
        style={{ fontFamily: "var(--font-sora), Sora, 'Segoe UI', system-ui, Arial, sans-serif", transition: 'fill 0.3s' }}
      >
        AMCO
      </text>
      <text
        x="196.5"
        y="238"
        textAnchor="middle"
        fontSize="19"
        fontWeight="500"
        letterSpacing="7"
        fill={c.sub}
        style={{ fontFamily: "var(--font-inter), Inter, 'Segoe UI', system-ui, Arial, sans-serif", transition: 'fill 0.3s' }}
      >
        CONSULTANTS
      </text>
    </svg>
  )
}
