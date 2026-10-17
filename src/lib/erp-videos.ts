// AMCO ERP videos for the product page — one per language.
//
// English pages play the English video and Urdu pages the Urdu one. The files
// live in `public/videos/` (MP4, H.264, "faststart" so playback begins before
// the whole file arrives). To replace one, overwrite the file under the same
// name. Set a language to `null` and its page shows "Video coming soon" cards.
//
// Source: D:\Projects\AMCO-ERP-Videos\out\drafts (AMCO-ERP-Long{English,Urdu}-DRAFT.mp4)

import type { Locale } from '@/i18n/config'

export type ErpVideo = {
  src: string
  poster?: string
  title: string
}

export const ERP_VIDEOS: Record<Locale, ErpVideo | null> = {
  en: { src: '/videos/amco-erp-tour-en.mp4', title: 'A guided tour of AMCO ERP' },
  ur: { src: '/videos/amco-erp-tour-ur.mp4', title: 'ایمکو ای آر پی کا رہنما جائزہ' }
}
