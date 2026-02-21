import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionPanel from '../components/QuestionPanel';
import StageTransitionCard from '../components/StageTransitionCard';
import StoryScreen from '../components/StoryScreen';
import CtaLabel from '../components/CtaLabel';

/** Fisher-Yates shuffle (returns a new array) */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ScreenRenderer({
  screen,
  selectedOptions,
  feedbackState,
  inputLocked,
  charSide,
  onSelect,
  onSubmit,
  onAdvance,
  onRestart,
}) {
  // Two-phase state: for question screens with preText,
  // show story first, then the question.
  const [storyComplete, setStoryComplete] = useState(false);

  // Shuffle options once per question screen (Fisher-Yates)
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Reset story phase and shuffle options whenever the screen changes
  useEffect(() => {
    setStoryComplete(false);
    if (screen?.type === 'question' && screen.options) {
      setShuffledOptions(shuffleArray(screen.options));
    }
  }, [screen?.id]);

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

    case 'info': {
      const infoLines = screen.bodyBefore
        ? screen.bodyBefore
        : Array.isArray(screen.body) ? screen.body : [screen.body];
      return (
        <StoryScreen
          lines={infoLines}
          onComplete={onAdvance}
          ctaLabel={screen.ctaLabel || 'Continue →'}
          externalLink={screen.externalLink}
          showAsset={screen.showAsset}
          linesAfter={screen.bodyAfter || null}
        />
      );
    }

    case 'question': {
      // If screen has preText and story phase not yet complete → show story
      if (screen.preText && !storyComplete) {
        const lines = screen.preText.split('\n').filter((l) => l.trim());
        return (
          <StoryScreen
            lines={lines}
            onComplete={() => setStoryComplete(true)}
            ctaLabel="Continue →"
          />
        );
      }

      // Question phase (no preText rendered — story already shown)
      return (
        <motion.div
          key={screen.id + '-question'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: '48px 24px 60px' }}
        >
          <QuestionPanel
            question={screen.question}
            options={shuffledOptions}
            multiSelect={screen.multiSelect}
            selectedOptions={selectedOptions}
            inputLocked={inputLocked}
            feedbackState={feedbackState}
            showAsset={screen.showAsset}
            onSelect={onSelect}
            onSubmit={onSubmit}
          />
        </motion.div>
      );
    }

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

/* ─── SVG Trophy Icon ─── */
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
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.02, backgroundColor: '#F5F5F5' }}
          whileTap={{ scale: 0.97 }}
        >
          <CtaLabel>{screen.ctaLabel || 'Continue'}</CtaLabel>
        </motion.button>
      </div>
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
