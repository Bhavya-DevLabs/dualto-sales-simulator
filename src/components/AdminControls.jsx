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
      }}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(19, 78, 74, 0.75)' }}
      whileTap={{ scale: 0.95 }}
    >
      Skip Screen &rarr;
    </motion.button>
  );
}
