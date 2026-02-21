import { motion } from 'framer-motion';

export default function AdminControls({ onSkip }) {
  return (
    <motion.button
      onClick={onSkip}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 90,
        padding: '10px 20px',
        backgroundColor: 'rgba(19, 78, 74, 0.55)',
        color: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        fontFamily: "'Noto Sans', sans-serif",
        fontWeight: 500,
        fontSize: 13,
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        backdropFilter: 'blur(8px)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(19, 78, 74, 0.75)' }}
      whileTap={{ scale: 0.95 }}
    >
      Skip Screen <span style={{ lineHeight: 1, display: 'inline-flex', alignItems: 'center' }}>→</span>
    </motion.button>
  );
}
