import { motion, AnimatePresence } from 'framer-motion';
import { CHARACTERS } from '../data/script';

/* ─── Default standing pose ─── */
function PersonSVG({ color, width = 90, height = 225 }) {
  return (
    <svg
      viewBox="0 0 120 300"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="290" rx="30" ry="6" fill={color} opacity="0.18" />
      <circle cx="60" cy="36" r="26" fill={color} />
      <rect x="50" y="60" width="20" height="14" rx="6" fill={color} />
      <path
        d="M24 86 C24 76, 96 76, 96 86 L92 185 C92 192, 28 192, 28 185 Z"
        fill={color}
      />
      <path
        d="M24 86 C16 88, 6 130, 12 158 C16 162, 24 156, 22 148 L28 96"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M96 86 C104 88, 114 130, 108 158 C104 162, 96 156, 98 148 L92 96"
        fill={color}
        opacity="0.9"
      />
      <path d="M38 185 L34 268 C34 276, 54 276, 52 268 L50 185" fill={color} />
      <path d="M70 185 L68 268 C68 276, 88 276, 86 268 L82 185" fill={color} />
      <ellipse cx="42" cy="274" rx="14" ry="7" fill={color} opacity="0.85" />
      <ellipse cx="78" cy="274" rx="14" ry="7" fill={color} opacity="0.85" />
    </svg>
  );
}

/* ─── Thinking pose: hand raised to chin ─── */
function PersonThinkingSVG({ color, width = 90, height = 225 }) {
  return (
    <svg
      viewBox="0 0 120 300"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="290" rx="30" ry="6" fill={color} opacity="0.18" />
      <circle cx="60" cy="36" r="26" fill={color} />
      {/* Thought dots */}
      <circle cx="92" cy="16" r="3" fill={color} opacity="0.35" />
      <circle cx="100" cy="6" r="4.5" fill={color} opacity="0.25" />
      <rect x="50" y="60" width="20" height="14" rx="6" fill={color} />
      <path
        d="M24 86 C24 76, 96 76, 96 86 L92 185 C92 192, 28 192, 28 185 Z"
        fill={color}
      />
      {/* Left arm — raised to chin */}
      <path
        d="M24 86 C16 84, 10 70, 20 52 C24 46, 36 50, 32 58 L28 96"
        fill={color}
        opacity="0.9"
      />
      {/* Right arm — normal */}
      <path
        d="M96 86 C104 88, 114 130, 108 158 C104 162, 96 156, 98 148 L92 96"
        fill={color}
        opacity="0.9"
      />
      <path d="M38 185 L34 268 C34 276, 54 276, 52 268 L50 185" fill={color} />
      <path d="M70 185 L68 268 C68 276, 88 276, 86 268 L82 185" fill={color} />
      <ellipse cx="42" cy="274" rx="14" ry="7" fill={color} opacity="0.85" />
      <ellipse cx="78" cy="274" rx="14" ry="7" fill={color} opacity="0.85" />
    </svg>
  );
}

/* ─── Confused pose: arms spread, question mark ─── */
function PersonConfusedSVG({ color, width = 90, height = 225, showQuestionMark }) {
  return (
    <svg
      viewBox="0 0 120 300"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="290" rx="30" ry="6" fill={color} opacity="0.18" />
      <circle cx="60" cy="36" r="26" fill={color} />
      {/* Question mark above head */}
      {showQuestionMark && (
        <text
          x="60"
          y="6"
          textAnchor="middle"
          fill={color}
          opacity="0.5"
          fontSize="20"
          fontWeight="800"
          fontFamily="Montserrat, sans-serif"
        >
          ?
        </text>
      )}
      <rect x="50" y="60" width="20" height="14" rx="6" fill={color} />
      <path
        d="M24 86 C24 76, 96 76, 96 86 L92 185 C92 192, 28 192, 28 185 Z"
        fill={color}
      />
      {/* Left arm — raised out */}
      <path
        d="M24 86 C14 82, 0 100, 4 120 C6 126, 18 122, 16 114 L28 96"
        fill={color}
        opacity="0.9"
      />
      {/* Right arm — raised out */}
      <path
        d="M96 86 C106 82, 120 100, 116 120 C114 126, 102 122, 104 114 L92 96"
        fill={color}
        opacity="0.9"
      />
      <path d="M38 185 L34 268 C34 276, 54 276, 52 268 L50 185" fill={color} />
      <path d="M70 185 L68 268 C68 276, 88 276, 86 268 L82 185" fill={color} />
      <ellipse cx="42" cy="274" rx="14" ry="7" fill={color} opacity="0.85" />
      <ellipse cx="78" cy="274" rx="14" ry="7" fill={color} opacity="0.85" />
    </svg>
  );
}

export default function CharacterFigure({ character, large = false, mood, showQuestionMark }) {
  if (!character) return null;

  const charData = CHARACTERS[character.id];
  if (!charData) return null;

  const isLeft = character.side === 'left';
  const svgW = large ? 112 : 90;
  const svgH = large ? 280 : 225;

  // Choose pose based on mood
  let SvgComponent = PersonSVG;
  const svgProps = { color: charData.placeholderColor, width: svgW, height: svgH };
  if (mood === 'thinking') {
    SvgComponent = PersonThinkingSVG;
  } else if (mood === 'confused') {
    SvgComponent = PersonConfusedSVG;
    svgProps.showQuestionMark = showQuestionMark;
  }

  return (
    <>
      {/* Desktop: full SVG figure */}
      <AnimatePresence mode="wait">
        <motion.div
          key={character.id + '-' + character.side + '-' + (mood || 'default')}
          style={{
            position: 'fixed',
            bottom: 0,
            [isLeft ? 'left' : 'right']: large ? 48 : 24,
            zIndex: 30,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className="hidden lg:flex"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SvgComponent {...svgProps} />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile/tablet: name badge pill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={character.id + '-badge-' + character.side}
          style={{
            position: 'fixed',
            bottom: 16,
            [isLeft ? 'left' : 'right']: 16,
            zIndex: 30,
            pointerEvents: 'none',
          }}
          className="flex lg:hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: 9999,
              boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
              border: `2px solid ${charData.placeholderColor}20`,
            }}
          >
            {/* Mini avatar circle */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: charData.placeholderColor,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                color: charData.placeholderColor,
                whiteSpace: 'nowrap',
              }}
            >
              {charData.name}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
