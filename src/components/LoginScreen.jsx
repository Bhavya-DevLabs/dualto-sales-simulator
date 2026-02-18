import { useState } from 'react';
import { motion } from 'framer-motion';

const REGIONS = ['North', 'South', 'East', 'West', 'Central'];

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');

  const isValid = name.trim().length > 0 && region.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    const user = { name: name.trim(), region };
    localStorage.setItem('dualto_user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#CA001B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        zIndex: 500,
      }}
    >
      <motion.div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: 48,
          maxWidth: 480,
          width: '100%',
          boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <h1
            style={{
              fontFamily: "'Montserrat', 'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 28,
              color: '#CA001B',
              margin: 0,
              letterSpacing: '0.04em',
            }}
          >
            DUALTO
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p
            style={{
              fontFamily: "'Montserrat', 'Noto Sans', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: '#666666',
              margin: 0,
            }}
          >
            Onboarding Simulator
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            backgroundColor: '#E0E0E0',
            marginBottom: 32,
          }}
        />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: 12,
                border: '1.5px solid #E0E0E0',
                fontFamily: "'Montserrat', 'Noto Sans', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: '#134E4A',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#CA001B'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E0E0E0'; }}
            />
          </div>

          {/* Region select */}
          <div style={{ marginBottom: 28 }}>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: 12,
                border: '1.5px solid #E0E0E0',
                fontFamily: "'Montserrat', 'Noto Sans', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: region ? '#134E4A' : '#9CA3AF',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                boxSizing: 'border-box',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                paddingRight: 44,
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#CA001B'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E0E0E0'; }}
            >
              <option value="" disabled>Sales Region</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!isValid}
            style={{
              width: '100%',
              padding: 16,
              borderRadius: 9999,
              border: 'none',
              backgroundColor: '#CA001B',
              color: '#FFFFFF',
              fontFamily: "'Montserrat', 'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              cursor: isValid ? 'pointer' : 'not-allowed',
              opacity: isValid ? 1 : 0.4,
              outline: 'none',
              transition: 'opacity 0.2s, transform 0.15s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              if (isValid) e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Start Simulation &rarr;
          </button>
        </form>
      </motion.div>
    </div>
  );
}
