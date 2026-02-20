import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackOverlay({ feedbackState, message, onDismiss }) {
  const isVisible = feedbackState === 'correct' || feedbackState === 'wrong';
  const isCorrect = feedbackState === 'correct';

  // Escape key to dismiss overlay (both correct and wrong)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isVisible) {
        onDismiss();
      }
    },
    [isVisible, onDismiss]
  );

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isVisible, handleKeyDown]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={onDismiss}
          role="dialog"
          aria-modal="true"
          aria-label={isCorrect ? 'Correct answer' : 'Wrong answer'}
        >
          {/* Backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(19, 78, 74, 0.75)',
            }}
          />

          {/* Card */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 10,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              padding: '56px 64px',
              maxWidth: 480,
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              textAlign: 'center',
              boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
            }}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Icon circle */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: isCorrect ? '#22C55E' : '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isCorrect
                  ? '0 8px 24px rgba(34, 197, 94, 0.3)'
                  : '0 8px 24px rgba(239, 68, 68, 0.3)',
              }}
            >
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                {isCorrect ? '\u2713' : '\u2715'}
              </span>
            </div>

            {/* Title */}
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                color: '#134E4A',
                margin: 0,
              }}
            >
              {isCorrect ? 'Correct!' : 'Not quite...'}
            </p>

            {/* Message */}
            <p
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: 1.7,
                color: '#4A5568',
                margin: 0,
              }}
            >
              {message}
            </p>

            <p
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                color: '#9CA3AF',
                marginTop: 8,
              }}
            >
              {isCorrect ? 'Tap anywhere to continue' : 'Tap anywhere to try again'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
