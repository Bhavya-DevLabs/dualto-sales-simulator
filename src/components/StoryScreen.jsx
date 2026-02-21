import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import CtaLabel from './CtaLabel';

const BASE = import.meta.env.BASE_URL;

const ASSET_MAP = {
  'hospital-federation': {
    file: 'assets/hospital-federation.png',
    alt: 'Hospital Federation Form',
    maxWidth: '560px',
  },
  'mac-address': {
    file: 'assets/mac-address.jpeg',
    alt: 'MAC Address explanation',
    maxWidth: '560px',
  },
  'url-list': {
    file: 'assets/url-list.png',
    alt: 'Required URLs for whitelisting',
    maxWidth: '560px',
  },
  'polyphonic-setup': {
    file: 'assets/polyphonic-setup.png',
    alt: 'Polyphonic Fleet setup screen',
    maxWidth: '560px',
  },
};

export default function StoryScreen({
  lines,
  onComplete,
  ctaLabel = 'Continue →',
  externalLink,
  showAsset,
  linesAfter,
}) {
  const asset = showAsset ? ASSET_MAP[showAsset] : null;
  const totalLines = lines.length + (linesAfter ? linesAfter.length : 0);
  const [visibleCount, setVisibleCount] = useState(1);
  const allVisible = visibleCount >= totalLines;

  const handleNext = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 1, totalLines));
  }, [totalLines]);

  // Enter key: reveal next line or complete
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter') {
        if (allVisible) {
          onComplete();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [allVisible, onComplete, handleNext]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 76px)',
        backgroundColor: '#1B2B5E',
        marginLeft: -40,
        marginRight: -40,
        padding: '60px 24px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 680, width: '100%' }}>
        {/* Editorial label */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div style={{ width: 32, height: 2, backgroundColor: '#CA001B', marginBottom: 8 }} />
          <span
            style={{
              color: '#CA001B',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            MISSION BRIEF
          </span>
        </div>

        {/* Lines — revealed one at a time */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            marginBottom: 40,
          }}
        >
          <AnimatePresence>
            {lines.slice(0, visibleCount).map((line, i) => (
              <motion.p
                key={`before-${i}`}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: 20,
                  color: '#FFFFFF',
                  lineHeight: 1.8,
                  textAlign: 'center',
                  maxWidth: 640,
                  margin: '0 auto',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        {/* Asset image — shown after all "before" lines are visible */}
        {visibleCount >= lines.length && asset && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ marginBottom: 20 }}
          >
            <img
              src={`${BASE}${asset.file}`}
              alt={asset.alt}
              style={{
                maxWidth: asset.maxWidth,
                width: '90%',
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                margin: '0 auto 24px auto',
                display: 'block',
              }}
            />
          </motion.div>
        )}

        {/* Lines after asset — revealed after asset */}
        {linesAfter && visibleCount > lines.length && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              marginBottom: 40,
            }}
          >
            <AnimatePresence>
              {linesAfter.slice(0, visibleCount - lines.length).map((line, i) => (
                <motion.p
                  key={`after-${i}`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: 20,
                    color: '#FFFFFF',
                    lineHeight: 1.8,
                    textAlign: 'center',
                    maxWidth: 640,
                    margin: '0 auto',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {line}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* External link button — only when all lines are visible */}
        {allVisible && externalLink && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ marginBottom: 20 }}
          >
            <a
              href={externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 36px',
                borderRadius: 10,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: '#FFFFFF',
                border: '2px solid rgba(255,255,255,0.4)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
              }}
            >
              <CtaLabel>{externalLink.label}</CtaLabel>
              <ExternalLinkIcon size={15} strokeWidth={2} />
            </a>
          </motion.div>
        )}

        {/* Navigation button — switches from Next to Continue */}
        <AnimatePresence mode="wait">
          {!allVisible ? (
            <motion.button
              key="next-btn"
              onClick={handleNext}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#1B2B5E',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                padding: '12px 40px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              whileHover={{ scale: 1.02, backgroundColor: '#F0F0F0' }}
              whileTap={{ scale: 0.97 }}
            >
              Next <span style={{ lineHeight: 1, display: 'inline-flex', alignItems: 'center' }}>→</span>
            </motion.button>
          ) : (
            <motion.button
              key="continue-btn"
              onClick={onComplete}
              style={{
                backgroundColor: '#CA001B',
                color: '#FFFFFF',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                padding: '12px 40px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(202, 0, 27, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              whileHover={{ scale: 1.02, backgroundColor: '#A8001A' }}
              whileTap={{ scale: 0.97 }}
            >
              <CtaLabel>{ctaLabel}</CtaLabel>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
