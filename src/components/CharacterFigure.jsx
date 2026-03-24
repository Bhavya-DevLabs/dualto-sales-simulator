import { useState, useEffect } from 'react';
import { CHARACTERS } from '../data/script';

const BASE = import.meta.env.BASE_URL;

/*
 * TODO (PIC 07): One screen shows the WRONG character.
 * The user will confirm which screen has the incorrect character and
 * which character image should replace it. When confirmed:
 *   1. Go to src/data/script.js
 *   2. Find the screen entry with the wrong character.id
 *   3. Change the character.id and/or characterMood to the correct values.
 *   4. If the new character needs a new mood variant, add it to IMAGE_MAP below.
 * Character sizing is already standardized via --character-height / --character-max-width
 * CSS variables in index.css (PIC 04 fix).
 */
const IMAGE_MAP = {
  sales: {
    default:  { file: 'sales-confident.png', facing: 'left' },
    thinking: { file: 'sales-excited.png',   facing: 'straight' },
    confused: { file: 'sales-stressed.png',  facing: 'straight' },
    nervous:  { file: 'sales-nervous.png',   facing: 'right' },
  },
  it: {
    default:  { file: 'it-lead.png',    facing: 'left' },
    confused: { file: 'it-confused.png', facing: 'straight' },
  },
  biomed: {
    default:  { file: 'biomed-lead.png',     facing: 'straight' },
    thumbsup: { file: 'biomed-thumbsup.png', facing: 'straight' },
  },
  purchase: {
    default: { file: 'purchase-head.png', facing: 'straight' },
  },
  specialist: {
    default: { file: 'dualto-specialist.png', facing: 'straight' },
  },
};

function getImageInfo(charId, mood) {
  const charMap = IMAGE_MAP[charId];
  if (!charMap) return null;
  return charMap[mood || 'default'] || charMap.default || null;
}

function needsMirror(naturalFacing, placementSide) {
  if (naturalFacing === 'straight') return false;
  return naturalFacing !== placementSide;
}

function SingleCharacter({ character, mood, bgReady }) {
  const charData = CHARACTERS[character.id];
  if (!charData) return null;

  const imageInfo = getImageInfo(character.id, mood);
  if (!imageInfo) return null;

  const isLeft = character.side === 'left';
  const mirror = needsMirror(imageInfo.facing, character.side);
  const src = `${BASE}characters/${imageInfo.file}`;
  const mirrorTransform = mirror ? 'scaleX(-1)' : 'none';
  const animName = `charSlide-${character.id}-${character.side}`;

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          from { opacity: 0; transform: translateY(40px) ${mirror ? 'scaleX(-1)' : ''}; }
          to   { opacity: 1; transform: translateY(0) ${mirror ? 'scaleX(-1)' : ''}; }
        }
      `}</style>

      {/* Desktop: full character image */}
      {bgReady && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: isLeft ? '12vw' : 'auto',
            right: isLeft ? 'auto' : '12vw',
            zIndex: 10,
            pointerEvents: 'none',
          }}
          className="hidden lg:block"
        >
          <img
            src={src}
            alt={charData.name}
            style={{
              height: 'var(--character-height, calc(65vh - 60px))',
              width: 'auto',
              maxWidth: 'var(--character-max-width, 22vw)',
              objectFit: 'contain',
              objectPosition: 'bottom',
              transform: mirrorTransform,
              pointerEvents: 'none',
              display: 'block',
              animation: `${animName} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
            }}
            draggable={false}
          />
        </div>
      )}

      {/* Mobile/tablet: name badge pill */}
      {bgReady && (
        <div
          style={{
            position: 'fixed',
            bottom: 16,
            left: isLeft ? 16 : 'auto',
            right: isLeft ? 'auto' : 16,
            zIndex: 10,
            pointerEvents: 'none',
            animation: `${animName} 0.35s ease-out forwards`,
          }}
          className="flex lg:hidden"
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
        </div>
      )}
    </>
  );
}

export default function CharacterFigure({
  character,
  mood,
  secondCharacter,
  secondMood,
  screenType,
  screenId,
}) {
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    setBgReady(false);
    const t = setTimeout(() => setBgReady(true), 300);
    return () => clearTimeout(t);
  }, [screenId]);

  if (!character) return null;

  // Show characters on info, intro, completion, AND question screens
  if (!['info', 'intro', 'completion', 'question'].includes(screenType)) return null;

  return (
    <>
      <SingleCharacter character={character} mood={mood} bgReady={bgReady} />
      {secondCharacter && (
        <SingleCharacter character={secondCharacter} mood={secondMood} bgReady={bgReady} />
      )}
    </>
  );
}
