import { motion } from 'framer-motion';
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
            fontFamily: "'Noto Sans', sans-serif",
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
              fontFamily: "'Noto Sans', sans-serif",
              color: '#9CA3AF',
            }}
          >
            Unknown screen type.
          </p>
        </div>
      );
  }
}

/* ─── Pill CTA (red bg) ─── */
function RedCTA({ label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        backgroundColor: '#CA001B',
        color: '#FFFFFF',
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 700,
        fontSize: 15,
        padding: '14px 48px',
        borderRadius: 9999,
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0 4px 16px rgba(202, 0, 27, 0.3)',
        letterSpacing: '0.01em',
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  );
}

/* ─── Pill CTA (white bg, blue text) ─── */
function WhiteCTA({ label, onClick, delay = 0 }) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        backgroundColor: '#FFFFFF',
        color: '#1B2B5E',
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 700,
        fontSize: 16,
        padding: '14px 48px',
        borderRadius: 9999,
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.04, boxShadow: '0 6px 28px rgba(0,0,0,0.2)' }}
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
  const bodyArray = Array.isArray(screen.body) ? screen.body : [screen.body];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 76px)',
        backgroundColor: '#1B2B5E',
        marginLeft: -40,
        marginRight: -40,
        padding: '60px 24px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 580 }}>
        {screen.heading && (
          <motion.h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 56,
              color: '#FFFFFF',
              marginBottom: 32,
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {screen.heading}
          </motion.h1>
        )}

        <motion.div
          style={{ marginBottom: 44 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          {bodyArray.map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 400,
                fontSize: 18,
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.8,
                marginBottom: i < bodyArray.length - 1 ? 10 : 0,
              }}
            >
              {line}
            </p>
          ))}
        </motion.div>

        <WhiteCTA
          label={screen.ctaLabel || 'Continue'}
          onClick={onAdvance}
          delay={0.4}
        />
      </div>
    </div>
  );
}

/* ─── INFO SCREEN ─── */
function InfoScreen({ screen, onAdvance }) {
  const bodyArray = Array.isArray(screen.body) ? screen.body : [screen.body];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 76px)',
        padding: '40px 20px',
      }}
    >
      <motion.div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: '48px',
          maxWidth: 680,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(19, 78, 74, 0.10)',
        }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Micro label */}
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#0891B2',
            color: '#FFFFFF',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '6px 18px',
            borderRadius: 9999,
            marginBottom: 28,
          }}
        >
          MISSION BRIEF
        </div>

        {/* Body paragraphs */}
        <div style={{ marginBottom: screen.stakeholders ? 24 : 36 }}>
          {bodyArray.map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 500,
                fontSize: 17,
                color: '#134E4A',
                lineHeight: 1.8,
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
                  backgroundColor: '#F0FDFA',
                  color: '#0891B2',
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '8px 18px',
                  borderRadius: 9999,
                  border: '1.5px solid #CCFBF1',
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
                borderRadius: 9999,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: '#0891B2',
                border: '2px solid #0891B2',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0891B2';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#0891B2';
              }}
            >
              {screen.externalLink.label}
            </a>
          )}
          <RedCTA label={screen.ctaLabel || 'Continue'} onClick={onAdvance} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── COMPLETION SCREEN ─── */
function CompletionScreen({ screen, onRestart }) {
  const bodyArray = Array.isArray(screen.body) ? screen.body : [screen.body];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 76px)',
        backgroundColor: '#1B2B5E',
        marginLeft: -40,
        marginRight: -40,
        padding: '60px 24px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 580 }}>
        <motion.div
          style={{ lineHeight: 1, marginBottom: 24, display: 'inline-block' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <TrophyIcon />
        </motion.div>

        <motion.h1
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
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
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 400,
                fontSize: 18,
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.7,
                marginBottom: i < bodyArray.length - 1 ? 12 : 0,
              }}
            >
              {line}
            </p>
          ))}
        </motion.div>

        <WhiteCTA label="Restart Simulation" onClick={onRestart} delay={0.5} />
      </div>
    </div>
  );
}
