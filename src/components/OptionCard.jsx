import { motion } from 'framer-motion';
import {
  Wifi,
  ClipboardList,
  Zap,
  Monitor,
  LayoutDashboard,
  Mail,
  Users,
  ChevronRight,
} from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

function getIconForLabel(label) {
  const l = label.toLowerCase();
  if (/connectiv|network|ethernet|sso|url|wifi|tether|federation|lan|wired/i.test(l)) return Wifi;
  if (/clinical|hcp|evaluation|hospital|it review|it assessment|review|brochure|whitepaper|brief|cybersecurity|privacy|technical brochure/i.test(l)) return ClipboardList;
  if (/activation|go-live|mac|whitelist|greenlisted|verified|authorised|whitelisted/i.test(l)) return Zap;
  if (/install|device|assembl|module|screen|energy|communication|equipment|ethovk|footswitch|usb|sensor|adapter|brightness|font|volume|colour|profile|output/i.test(l)) return Monitor;
  if (/polyphonic|fleet|account|form|intake|purchase|po |order/i.test(l)) return LayoutDashboard;
  if (/email|inbox|send|techsupport/i.test(l)) return Mail;
  if (/team|stakeholder|specialist|support|biomed|it lead|kol|nurse|sales|apac|distributor|marketing|service|surgeon|contact|rep|purchase head|scrub/i.test(l)) return Users;
  return ChevronRight;
}

const shakeVariants = {
  shake: {
    x: [0, -8, 8, -6, 6, 0],
    transition: { duration: 0.4 },
  },
  idle: { x: 0 },
};

export default function OptionCard({
  option,
  isSelected,
  isDisabled,
  shouldShake,
  onSelect,
  cardLayout,
}) {
  const Icon = getIconForLabel(option.label);
  const hasImage = !!option.image;

  const isVerticalLarge = cardLayout === 'vertical-large';
  const isFourColumn = cardLayout === 'four-column';

  // Image height: 75% larger (140px) for four-column, double (160px) for vertical-large portrait cards
  const imgHeight = isFourColumn ? 140 : isVerticalLarge ? 160 : 80;
  // Vertical-large: 320px min-height ensures cards are taller than their ~280px width in 3-col grid
  const cardMinHeight = hasImage
    ? (isVerticalLarge ? 320 : isFourColumn ? 200 : 140)
    : 100;
  const cardPadding = isVerticalLarge ? '24px 16px' : hasImage ? '16px 12px' : '20px';

  const handleSelect = () => {
    if (!isDisabled) onSelect(option.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: cardMinHeight,
        padding: cardPadding,
        backgroundColor: isSelected ? '#ECFEFF' : '#FFFFFF',
        borderRadius: 16,
        border: isSelected ? '2px solid #0891B2' : '1.5px solid #CCFBF1',
        boxShadow: isSelected
          ? '0 4px 16px rgba(8, 145, 178, 0.12)'
          : '0 2px 12px rgba(19, 78, 74, 0.06)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        outline: 'none',
        userSelect: 'none',
        transition: 'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
      whileHover={
        !isDisabled
          ? {
              scale: 1.015,
              boxShadow: '0 6px 24px rgba(19, 78, 74, 0.12)',
            }
          : {}
      }
      whileTap={!isDisabled ? { scale: 0.985 } : {}}
      animate={shouldShake ? 'shake' : 'idle'}
      variants={shakeVariants}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
    >
      {hasImage ? (
        /* Image container: fixed height, bottom-aligned so characters stand on same ground */
        <div
          style={{
            height: imgHeight,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginBottom: 8,
            flexShrink: 0,
          }}
        >
          <img
            src={`${BASE}${option.image}`}
            alt={option.label}
            style={{
              maxHeight: '100%',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              transform: option.imageScale ? `scale(${option.imageScale})` : undefined,
            }}
            draggable={false}
          />
        </div>
      ) : (
        /* Icon circle — centered above text (default) */
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: isSelected ? '#CFFAFE' : '#EEF2FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            transition: 'background-color 0.2s',
          }}
        >
          <Icon
            size={20}
            color={isSelected ? '#0891B2' : '#134E4A'}
            strokeWidth={2}
          />
        </div>
      )}

      {/* Label — centered */}
      <span
        style={{
          fontFamily: "'Noto Sans', sans-serif",
          fontWeight: 500,
          fontSize: 15,
          color: '#134E4A',
          lineHeight: 1.45,
          textAlign: 'center',
        }}
      >
        {option.label}
      </span>
    </motion.div>
  );
}
