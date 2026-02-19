import { motion, AnimatePresence } from 'framer-motion';
import { CHARACTERS } from '../data/script';

function PersonSVG({ color, width = 90, height = 225 }) {
  return (
    <svg
      viewBox="0 0 120 300"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="60" cy="290" rx="30" ry="6" fill={color} opacity="0.18" />
      {/* Head */}
      <circle cx="60" cy="36" r="26" fill={color} />
      {/* Neck */}
      <rect x="50" y="60" width="20" height="14" rx="6" fill={color} />
      {/* Torso */}
      <path
        d="M24 86 C24 76, 96 76, 96 86 L92 185 C92 192, 28 192, 28 185 Z"
        fill={color}
      />
      {/* Left Arm */}
      <path
        d="M24 86 C16 88, 6 130, 12 158 C16 162, 24 156, 22 148 L28 96"
        fill={color}
        opacity="0.9"
      />
      {/* Right Arm */}
      <path
        d="M96 86 C104 88, 114 130, 108 158 C104 162, 96 156, 98 148 L92 96"
        fill={color}
        opacity="0.9"
      />
      {/* Left Leg */}
      <path d="M38 185 L34 268 C34 276, 54 276, 52 268 L50 185" fill={color} />
      {/* Right Leg */}
      <path d="M70 185 L68 268 C68 276, 88 276, 86 268 L82 185" fill={color} />
      {/* Left Shoe */}
      <ellipse cx="42" cy="274" rx="14" ry="7" fill={color} opacity="0.85" />
      {/* Right Shoe */}
      <ellipse cx="78" cy="274" rx="14" ry="7" fill={color} opacity="0.85" />
    </svg>
  );
}

export default function CharacterFigure({ character, large = false }) {
  if (!character) return null;

  const charData = CHARACTERS[character.id];
  if (!charData) return null;

  const isLeft = character.side === 'left';
  const svgW = large ? 112 : 90;
  const svgH = large ? 280 : 225;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={character.id + '-' + character.side}
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
          <PersonSVG
            color={charData.placeholderColor}
            width={svgW}
            height={svgH}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
