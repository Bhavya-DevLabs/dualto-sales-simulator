import { useState, useEffect } from 'react';
import { CHARACTERS } from '../data/script';

const BASE = import.meta.env.BASE_URL;

const IMAGE_MAP = {
  sales: {
    default:  { file: 'sales-confident.png', facing: 'left' },
    thinking: { file: 'sales-excited.png',   facing: 'straight' },
    confused: { file: 'sales-stressed.png',  facing: 'straight' },
    nervous:  { file: 'sales-nervous.png',   facing: 'right' },
  },
  it: {
    default: { file: 'it-lead.png', facing: 'left' },
  },
  biomed: {
    default: { file: 'biomed-lead.png', facing: 'straight' },
  },
  purchase: {
    default: { file: 'purchase-head.png', facing: 'straight' },
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

export default function CharacterFigure({ character, mood, screenType, screenId }) {
  const [bgReady, setBgReady] = useState(false);

  // Reset bgReady on screen change, then re-trigger after 300ms
  useEffect(() => {
    setBgReady(false);
    const t = setTimeout(() => setBgReady(true), 300);
    return () => clearTimeout(t);
  }, [screenId]);

  if (!character) return null;

  // Only show characters on info, intro, and completion screens
  if (!['info', 'intro', 'completion'].includes(screenType)) return null;

  const charData = CHARACTERS[character.id];
  if (!charData) return null;

  const imageInfo = getImageInfo(character.id, mood);
  if (!imageInfo) return null;

  const isLeft = character.side === 'left';
  const mirror = needsMirror(imageInfo.facing, character.side);
  const src = `${BASE}characters/${imageInfo.file}`;

  const mirrorTransform = mirror ? 'scaleX(-1)' : 'none';

  return (
    <>
      {/* Keyframe animation injected once */}
      <style>{`
        @keyframes characterSlideUp {
          from { opacity: 0; transform: translateY(40px) ${mirrorTransform === 'scaleX(-1)' ? 'scaleX(-1)' : ''}; }
          to   { opacity: 1; transform: translateY(0) ${mirrorTransform === 'scaleX(-1)' ? 'scaleX(-1)' : ''}; }
        }
      `}</style>

      {/* Desktop: full character image */}
      {bgReady && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: isLeft ? 0 : 'auto',
            right: isLeft ? 'auto' : 0,
            zIndex: 10,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
          className="hidden lg:block"
        >
          <img
            src={src}
            alt={charData.name}
            style={{
              height: 'calc(100vh - 60px)',
              width: 'auto',
              maxWidth: '28vw',
              objectFit: 'contain',
              objectPosition: 'bottom',
              transform: mirrorTransform,
              pointerEvents: 'none',
              display: 'block',
              animation: 'characterSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
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
            animation: 'characterSlideUp 0.35s ease-out forwards',
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
