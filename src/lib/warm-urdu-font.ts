// Starts downloading the Nastaliq font before the visitor arrives on an Urdu
// page, so the switch does not show plain text first. The @font-face rule
// already exists (globals.css); `load()` just fetches the files now
// instead of waiting for Urdu text to need them. Safe to call repeatedly — a
// face that is loading or loaded is skipped.

let warmed = false

export function warmUrduFont(): void {
  if (warmed || typeof document === 'undefined' || !('fonts' in document)) return
  warmed = true
  document.fonts.forEach((face) => {
    if (face.family.includes('Nastaliq') && face.status === 'unloaded') {
      face.load().catch(() => {
        // A failed warm-up is harmless: the font is fetched normally when needed.
      })
    }
  })
}
