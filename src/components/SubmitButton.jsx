import { motion } from 'framer-motion';

export default function SubmitButton({ disabled, onClick }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
      <motion.button
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: '#CA001B',
          color: '#FFFFFF',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          padding: '14px 56px',
          borderRadius: 9999,
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.35 : 1,
          outline: 'none',
          boxShadow: disabled ? 'none' : '0 4px 16px rgba(202, 0, 27, 0.3)',
          letterSpacing: '0.01em',
          transition: 'opacity 0.2s, box-shadow 0.2s',
        }}
        whileHover={
          !disabled
            ? { scale: 1.03, boxShadow: '0 6px 24px rgba(202, 0, 27, 0.4)' }
            : {}
        }
        whileTap={!disabled ? { scale: 0.97 } : {}}
      >
        Submit
      </motion.button>
    </div>
  );
}
