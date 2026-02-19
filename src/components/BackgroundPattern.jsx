export default function BackgroundPattern() {
  const icons = []
  const cols = Math.ceil(window.innerWidth / 65) + 1
  const rows = Math.ceil(window.innerHeight / 65) + 1

  const iconShapes = [
    // WiFi
    (x, y) => (
      <g key={`wifi-${x}-${y}`} transform={`translate(${x},${y})`} stroke="#1B2B5E" strokeWidth="1.8" fill="none" opacity="0.18">
        <path d="M2 8 C5 5 9 3 14 3 C19 3 23 5 26 8"/>
        <path d="M5 12 C8 9 11 7.5 14 7.5 C17 7.5 20 9 23 12"/>
        <path d="M9 16 C11 14 12.5 13 14 13 C15.5 13 17 14 19 16"/>
        <circle cx="14" cy="20" r="1.8" fill="#1B2B5E" stroke="none"/>
      </g>
    ),
    // Medical cross
    (x, y) => (
      <g key={`cross-${x}-${y}`} transform={`translate(${x},${y})`} stroke="#CA001B" strokeWidth="1.8" fill="none" opacity="0.16">
        <rect x="8" y="2" width="7" height="19" rx="1.5"/>
        <rect x="2" y="8" width="19" height="7" rx="1.5"/>
      </g>
    ),
    // Clipboard
    (x, y) => (
      <g key={`clip-${x}-${y}`} transform={`translate(${x},${y})`} stroke="#1B2B5E" strokeWidth="1.8" fill="none" opacity="0.17">
        <rect x="3" y="4" width="16" height="20" rx="2"/>
        <rect x="7" y="1" width="8" height="5" rx="1.5"/>
        <line x1="7" y1="11" x2="15" y2="11"/>
        <line x1="7" y1="15" x2="15" y2="15"/>
        <line x1="7" y1="19" x2="12" y2="19"/>
      </g>
    ),
    // Heartbeat
    (x, y) => (
      <g key={`hb-${x}-${y}`} transform={`translate(${x},${y})`} stroke="#CA001B" strokeWidth="1.8" fill="none" opacity="0.16">
        <polyline points="1,12 6,12 9,5 12,19 15,8 18,14 21,12 26,12"/>
      </g>
    ),
    // Hospital
    (x, y) => (
      <g key={`hosp-${x}-${y}`} transform={`translate(${x},${y})`} stroke="#1B2B5E" strokeWidth="1.8" fill="none" opacity="0.16">
        <rect x="2" y="7" width="19" height="16" rx="1"/>
        <path d="M7 23 L7 15 Q7 14 8 14 L14 14 Q15 14 15 15 L15 23"/>
        <line x1="2" y1="12" x2="21" y2="12"/>
        <rect x="8" y="2" width="7" height="5" rx="1"/>
      </g>
    ),
    // Gear
    (x, y) => (
      <g key={`gear-${x}-${y}`} transform={`translate(${x},${y})`} stroke="#1B2B5E" strokeWidth="1.8" fill="none" opacity="0.17">
        <circle cx="11" cy="11" r="3.5"/>
        <path d="M11 2v2.5M11 19v2.5M2 11h2.5M19 11h2.5M4.5 4.5l1.8 1.8M16.7 16.7l1.8 1.8M17.5 4.5l-1.8 1.8M6.3 16.7l-1.8 1.8"/>
      </g>
    ),
    // Lightning
    (x, y) => (
      <g key={`bolt-${x}-${y}`} transform={`translate(${x},${y})`} stroke="#CA001B" strokeWidth="2" fill="none" opacity="0.16">
        <polyline points="15,2 8,13 14,13 7,24"/>
      </g>
    ),
    // Shield
    (x, y) => (
      <g key={`shield-${x}-${y}`} transform={`translate(${x},${y})`} stroke="#1B2B5E" strokeWidth="1.8" fill="none" opacity="0.16">
        <path d="M11 2 L20 6 L20 13 C20 18 16 22 11 23 C6 22 2 18 2 13 L2 6 Z"/>
        <polyline points="6,12 10,16 17,9"/>
      </g>
    ),
  ]

  let iconIndex = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * 65
      const y = row * 65
      const shape = iconShapes[iconIndex % iconShapes.length]
      icons.push(shape(x, y))
      iconIndex++
    }
  }

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons}
    </svg>
  )
}
