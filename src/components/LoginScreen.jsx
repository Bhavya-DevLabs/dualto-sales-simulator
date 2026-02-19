import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const REGIONS = ['North', 'South', 'East', 'West', 'Central'];

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [regionFocused, setRegionFocused] = useState(false);

  const isValid = name.trim().length > 0 && region.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    const user = { name: name.trim(), region };
    localStorage.setItem('dualto_user', JSON.stringify(user));
    onLogin(user);
  };

  const inputBase = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1.5px solid #E5E7EB',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
    fontSize: 15,
    color: '#1A1A1A',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    backgroundColor: '#FFFFFF',
  };

  const inputFocusStyle = {
    borderColor: '#CA001B',
    boxShadow: '0 0 0 3px rgba(202,0,27,0.1)',
  };

  const labelStyle = {
    display: 'block',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    color: '#374151',
    marginBottom: 6,
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #1B2B5E 0%, #6B1535 50%, #CA001B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        minHeight: '100vh',
        zIndex: 500,
      }}
    >
      <motion.div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: '48px 40px',
          maxWidth: 460,
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 26,
            color: '#1B2B5E',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Welcome to DUALTO
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: '#6B7280',
            textAlign: 'center',
            margin: 0,
            marginTop: 8,
            marginBottom: 32,
          }}
        >
          Enter your details to begin
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name field */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              style={{
                ...inputBase,
                ...(nameFocused ? inputFocusStyle : {}),
              }}
            />
          </div>

          {/* Region field */}
          <div>
            <label style={labelStyle}>Your Sales Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              onFocus={() => setRegionFocused(true)}
              onBlur={() => setRegionFocused(false)}
              style={{
                ...inputBase,
                color: region ? '#1A1A1A' : '#9CA3AF',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                paddingRight: 44,
                ...(regionFocused ? inputFocusStyle : {}),
              }}
            >
              <option value="" disabled>Select your region</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={!isValid}
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 10,
              border: 'none',
              backgroundColor: '#CA001B',
              color: '#FFFFFF',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              cursor: isValid ? 'pointer' : 'not-allowed',
              opacity: isValid ? 1 : 0.45,
              outline: 'none',
              marginTop: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'opacity 0.2s, background-color 0.2s',
            }}
            whileHover={isValid ? { scale: 1.01, backgroundColor: '#A8001A' } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
          >
            <Play size={16} fill="#FFFFFF" strokeWidth={0} />
            Start Simulation
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
