import { motion } from 'framer-motion';

export default function StageTransitionCard({
  stageNumber,
  stageTitle,
  preLabel,
  body,
  ctaLabel,
  onAdvance,
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B2B5E',
        padding: '60px 20px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        {/* Pre-label text (e.g. "Time to start with") */}
        {preLabel && (
          <motion.p
            style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
              marginBottom: 24,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {preLabel}
          </motion.p>
        )}

        {/* NOW ENTERING */}
        <motion.p
          style={{
            fontFamily: "'Noto Sans', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 20,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          NOW ENTERING
        </motion.p>

        {/* STAGE X */}
        <motion.h1
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: 72,
            color: '#FFFFFF',
            lineHeight: 1,
            marginBottom: 12,
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          STAGE {stageNumber}
        </motion.h1>

        {/* Title */}
        <motion.p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 600,
            fontSize: 28,
            color: '#FFFFFF',
            lineHeight: 1.3,
            whiteSpace: 'pre-line',
            marginBottom: 28,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          {stageTitle}
        </motion.p>

        {/* Divider */}
        <motion.div
          style={{
            width: 200,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #0891B2, transparent)',
            margin: '0 auto 32px',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* Body (legacy field, some screens may still use it) */}
        {body && (
          <motion.p
            style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              marginBottom: 40,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {body}
          </motion.p>
        )}

        {/* CTA */}
        <motion.button
          onClick={onAdvance}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#1B2B5E',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            padding: '14px 48px',
            borderRadius: 9999,
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {ctaLabel || 'Continue'}
        </motion.button>
      </div>
    </div>
  );
}
