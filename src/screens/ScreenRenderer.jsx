import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import QuestionPanel from '../components/QuestionPanel';
import StageTransitionCard from '../components/StageTransitionCard';

export default function ScreenRenderer({
  screen,
  selectedOptions,
  feedbackState,
  inputLocked,
  onSelect,
  onSubmit,
  onAdvance,
  onRestart,
}) {
  if (!screen) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 76px)',
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: 18,
            color: '#9CA3AF',
          }}
        >
          Simulation unavailable.
        </p>
      </div>
    );
  }

  switch (screen.type) {
    case 'intro':
      return <IntroScreen screen={screen} onAdvance={onAdvance} />;

    case 'transition':
      return (
        <StageTransitionCard
          stageNumber={screen.stageNumber}
          stageTitle={screen.stageTitle}
          preLabel={screen.preLabel}
          body={screen.body}
          ctaLabel={screen.ctaLabel}
          onAdvance={onAdvance}
        />
      );

    case 'info':
      return <InfoScreen screen={screen} onAdvance={onAdvance} />;

    case 'question':
      return (
        <div style={{ padding: '48px 24px 60px' }}>
          <QuestionPanel
            preText={screen.preText}
            question={screen.question}
            options={screen.options}
            multiSelect={screen.multiSelect}
            selectedOptions={selectedOptions}
            inputLocked={inputLocked}
            feedbackState={feedbackState}
            onSelect={onSelect}
            onSubmit={onSubmit}
          />
        </div>
      );

    case 'completion':
      return <CompletionScreen screen={screen} onRestart={onRestart} />;

    default:
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 76px)',
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: '#9CA3AF',
            }}
          >
            Unknown screen type.
          </p>
        </div>
      );
  }
}

/* ─── Hook: Enter key advances on non-question screens ─── */
function useEnterKeyAdvance(onAdvance) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Enter') onAdvance();
    },
    [onAdvance]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);
}

/* ─── Pill CTA (red bg) ─── */
function RedCTA({ label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        backgroundColor: '#CA001B',
        color: '#FFFFFF',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700,
        fontSize: 15,
        padding: '14px 48px',
        borderRadius: 10,
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0 4px 16px rgba(202, 0, 27, 0.3)',
      }}
      whileHover={{ scale: 1.02, backgroundColor: '#A8001A' }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  );
}

/* ─── SVG Trophy Icon (replaces emoji) ─── */
function TrophyIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 12h28v4c0 10-6 20-14 24-8-4-14-14-14-24v-4z"
        fill="#22C55E"
        opacity="0.9"
      />
      <path
        d="M18 16h-4c-2 0-4 2-4 4v2c0 4 3 8 8 8v-4c-2 0-4-2-4-4v-2h4v-4z"
        fill="#22C55E"
        opacity="0.6"
      />
      <path
        d="M46 16h4c2 0 4 2 4 4v2c0 4-3 8-8 8v-4c2 0 4-2 4-4v-2h-4v-4z"
        fill="#22C55E"
        opacity="0.6"
      />
      <rect x="28" y="38" width="8" height="10" rx="2" fill="#0891B2" />
      <rect x="20" y="48" width="24" height="6" rx="3" fill="#0891B2" opacity="0.8" />
      <path
        d="M32 18l2.5 5 5.5.8-4 3.9.9 5.3-4.9-2.6-4.9 2.6.9-5.3-4-3.9 5.5-.8z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );
}

/* ─── INTRO SCREEN ─── */
function IntroScreen({ screen, onAdvance }) {
  useEnterKeyAdvance(onAdvance);
  const bodyArray = Array.isArray(screen.body) ? screen.body : [screen.body];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 76px)',
        background: 'linear-gradient(135deg, #1B2B5E 0%, #6B1535 50%, #CA001B 100%)',
        marginLeft: -40,
        marginRight: -40,
        padding: '60px 24px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 620 }}>
        {screen.heading && (
          <motion.h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: 52,
              color: '#FFFFFF',
              marginBottom: 24,
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            {screen.heading}
          </motion.h1>
        )}

        <div style={{ marginBottom: 40 }}>
          {bodyArray.map((line, i) => (
            <motion.p
              key={i}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: 18,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.9,
                marginBottom: i < bodyArray.length - 1 ? 4 : 0,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.button
          onClick={onAdvance}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#CA001B',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            padding: '14px 48px',
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.02, backgroundColor: '#F5F5F5' }}
          whileTap={{ scale: 0.97 }}
        >
          {screen.ctaLabel || 'Continue'}
        </motion.button>
      </div>
    </div>
  );
}

/* ─── INFO SCREEN ─── */
function InfoScreen({ screen, onAdvance }) {
  useEnterKeyAdvance(onAdvance);
  const bodyArray = Array.isArray(screen.body) ? screen.body : [screen.body];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 76px)',
        padding: '40px 20px',
        backgroundColor: '#EEF2FF',
        marginLeft: -40,
        marginRight: -40,
      }}
    >
      <motion.div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: '40px 48px',
          maxWidth: 720,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 4px 24px rgba(27, 43, 94, 0.10)',
        }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Micro label */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              backgroundColor: '#1B2B5E',
              color: '#FFFFFF',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '6px 18px',
              borderRadius: 9999,
            }}
          >
            MISSION BRIEF
          </div>
        </div>

        {/* Body paragraphs */}
        <div style={{ marginBottom: screen.stakeholders ? 24 : 36 }}>
          {bodyArray.map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: 17,
                color: '#134E4A',
                lineHeight: 1.8,
                textAlign: 'center',
                marginBottom: i < bodyArray.length - 1 ? 18 : 0,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Stakeholder pills */}
        {screen.stakeholders && screen.stakeholders.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 36,
            }}
          >
            {screen.stakeholders.map((name) => (
              <span
                key={name}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#EEF1F8',
                  color: '#1B2B5E',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '8px 18px',
                  borderRadius: 9999,
                  border: '1px solid #C5CDE8',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {screen.externalLink && (
            <a
              href={screen.externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 36px',
                borderRadius: 10,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: '#1B2B5E',
                border: '2px solid #1B2B5E',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1B2B5E';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#1B2B5E';
              }}
            >
              {screen.externalLink.label}
              <ExternalLink size={15} strokeWidth={2} style={{ marginLeft: 6, verticalAlign: 'middle' }} />
            </a>
          )}
          <RedCTA label={screen.ctaLabel || 'Continue'} onClick={onAdvance} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Confetti particles for completion ─── */
const CONFETTI_COLORS = ['#CA001B', '#1B2B5E', '#22C55E', '#0891B2', '#FFFFFF', '#F59E0B'];

function ConfettiParticle({ index }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 1.2;
  const duration = 2.5 + Math.random() * 2;
  const size = 6 + Math.random() * 6;
  const rotate = Math.random() * 360;
  const isCircle = index % 3 === 0;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: -20,
        left: `${left}%`,
        width: size,
        height: isCircle ? size : size * 2.5,
        backgroundColor: color,
        borderRadius: isCircle ? '50%' : 2,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      initial={{ opacity: 1, y: 0, rotate, scale: 0 }}
      animate={{
        opacity: [1, 1, 0],
        y: [0, window.innerHeight * 0.85],
        rotate: rotate + 360 + Math.random() * 180,
        x: [0, (Math.random() - 0.5) * 200],
        scale: [0, 1, 0.6],
      }}
      transition={{
        duration,
        delay: 0.2 + delay,
        ease: 'easeOut',
      }}
    />
  );
}

function ConfettiBurst() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <ConfettiParticle key={i} index={i} />
      ))}
    </div>
  );
}

/* ─── COMPLETION SCREEN ─── */
function CompletionScreen({ screen, onRestart }) {
  const bodyArray = Array.isArray(screen.body) ? screen.body : [screen.body];

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 76px)',
        background: 'linear-gradient(135deg, #1B2B5E 0%, #6B1535 50%, #CA001B 100%)',
        marginLeft: -40,
        marginRight: -40,
        padding: '60px 24px',
        overflow: 'hidden',
      }}
    >
      <ConfettiBurst />

      <div style={{ textAlign: 'center', maxWidth: 580, position: 'relative', zIndex: 1 }}>
        {/* Trophy with pulse glow */}
        <motion.div
          style={{
            lineHeight: 1,
            marginBottom: 24,
            display: 'inline-block',
            filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.4))',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [0.5, 1.15, 1] }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <TrophyIcon />
        </motion.div>

        <motion.h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 48,
            color: '#FFFFFF',
            marginBottom: 28,
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {screen.heading}
        </motion.h1>

        <motion.div
          style={{ marginBottom: 44 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
        >
          {bodyArray.map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: 18,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.7,
                marginBottom: i < bodyArray.length - 1 ? 12 : 0,
              }}
            >
              {line}
            </p>
          ))}
        </motion.div>

        <motion.button
          onClick={onRestart}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#CA001B',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            padding: '14px 48px',
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.02, backgroundColor: '#F5F5F5' }}
          whileTap={{ scale: 0.97 }}
        >
          Restart Simulation
        </motion.button>
      </div>
    </div>
  );
}
