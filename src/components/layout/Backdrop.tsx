// The dark night behind the splash page and the 404 page. Static gradients
// only — nothing animated, nothing blurred — so it costs nothing to draw.

export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="night-sky absolute inset-0" />
      <div className="grid-lines absolute inset-0" />
    </div>
  )
}
