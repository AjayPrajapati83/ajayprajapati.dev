export default function ScanlineOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 178, 0.012) 2px,
          rgba(0, 255, 178, 0.012) 4px
        )`,
        mixBlendMode: 'screen',
      }}
    />
  )
}
