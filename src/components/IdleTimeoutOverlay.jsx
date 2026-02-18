import { motion, AnimatePresence } from 'framer-motion';

export default function IdleTimeoutOverlay({ isIdle, onDismiss }) {
  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          onClick={onDismiss}
          role="dialog"
          aria-modal="true"
          aria-label="Session paused"
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(19, 78, 74, 0.92)',
            }}
          />
          <motion.div
            style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 32px' }}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
          >
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                color: '#FFFFFF',
                marginBottom: 16,
              }}
            >
              Session paused.
            </p>
            <p
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              Click to rejoin the simulation.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
