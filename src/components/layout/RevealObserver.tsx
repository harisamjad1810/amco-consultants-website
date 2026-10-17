'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// One observer for the whole page. Any element with class `reveal` fades up
// the first time it scrolls into view (the CSS is in globals.css). This is all
// the JavaScript the scroll animations cost — no animation library.

export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)')
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
