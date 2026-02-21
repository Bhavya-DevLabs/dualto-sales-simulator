import { motion } from 'framer-motion';
import CtaLabel from './CtaLabel';

export default function StageTransitionCard({
  stageNumber,
  stageTitle,
  preLabel,
  body,
  ctaLabel,
  onAdvance,
}) {
  return (
    <motion.div
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
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        {/* Pre-label text */}
        {preLabel && (
          <motion.p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
              marginBottom: 24,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          >
            {preLabel}
          </motion.p>
        )}

        {/* STAGE X */}
        <motion.h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 72,
            color: '#FFFFFF',
            lineHeight: 1,
            marginBottom: 12,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
        >
          STAGE {stageNumber}
        </motion.h1>

        {/* Title */}
        <motion.p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 28,
            color: '#FFFFFF',
            lineHeight: 1.3,
            whiteSpace: 'pre-line',
            marginBottom: 28,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease: 'easeOut' }}
        >
          {stageTitle}
        </motion.p>

        {/* Divider */}
        <motion.div
          style={{
            width: 200,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            margin: '0 auto 32px',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        />

        {/* Body */}
        {body && (
          <motion.p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              marginBottom: 40,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.6, ease: 'easeOut' }}
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
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            padding: '14px 48px',
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.7, ease: 'easeOut' }}
          whileHover={{ scale: 1.02, backgroundColor: '#F5F5F5' }}
          whileTap={{ scale: 0.97 }}
        >
          <CtaLabel>{ctaLabel || 'Continue'}</CtaLabel>
        </motion.button>
      </div>
    </motion.div>
  );
}
