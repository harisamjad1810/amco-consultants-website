// AMCO ERP videos for the product page.
//
// To add one: put the file in `public/videos/` (MP4, H.264, ideally under
// 15 MB) with a poster image beside it, and add an entry here. While this list
// is empty the page shows "Video coming soon" cards instead.
//
//   { src: '/videos/tour.mp4', poster: '/videos/tour.jpg',
//     title: { en: 'A quick tour of AMCO ERP', ur: 'ایمکو ای آر پی کا مختصر جائزہ' } }

export type ErpVideo = {
  src: string
  poster?: string
  title: { en: string; ur: string }
}

export const ERP_VIDEOS: ErpVideo[] = []
