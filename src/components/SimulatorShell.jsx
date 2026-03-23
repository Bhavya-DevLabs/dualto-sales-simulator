import { useState, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import CharacterFigure from './CharacterFigure';
import FeedbackOverlay from './FeedbackOverlay';
import IdleTimeoutOverlay from './IdleTimeoutOverlay';
import AdminControls from './AdminControls';
import ExitConfirmDialog from './ExitConfirmDialog';
import BackgroundPattern from './BackgroundPattern';
import ScreenRenderer from '../screens/ScreenRenderer';
import useSimulatorState from '../engine/useSimulatorState';
import useIdleTimeout from '../engine/useIdleTimeout';
import useAdminMode from '../engine/useAdminMode';
import { SCRIPT, STAGES } from '../data/script';

function getCurrentStageInfo(screenIndex) {
  for (let i = screenIndex; i >= 0; i--) {
    if (SCRIPT[i] && SCRIPT[i].type === 'transition') {
      const stageNum = SCRIPT[i].stageNumber;
      const stage = STAGES.find((s) => s.number === stageNum);
      if (stage) return { number: stage.number, title: stage.title };
    }
  }
  return null;
}

export default function SimulatorShell({ user, onSignOut }) {
  const {
    currentScreenIndex,
    currentScreen,
    selectedOptions,
    feedbackState,
    inputLocked,
    selectOption,
    submitAnswer,
    dismissFeedback,
    advance,
    restart,
  } = useSimulatorState();

  const { isIdle, dismissIdle } = useIdleTimeout();
  const isAdmin = useAdminMode();

  const [isPreTextPhase, setIsPreTextPhase] = useState(false);
  const handlePreTextPhaseChange = useCallback((val) => setIsPreTextPhase(val), []);

  const stageInfo = useMemo(() => getCurrentStageInfo(currentScreenIndex), [currentScreenIndex]);
  const charSide = currentScreen?.character?.side || null;

  // Scroll to top and update page title on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const base = 'DUALTO Onboarding Simulator';
    if (stageInfo) {
      document.title = `Stage ${stageInfo.number}: ${stageInfo.title} — ${base}`;
    } else {
      document.title = base;
    }
  }, [currentScreenIndex, stageInfo]);

  const feedbackMessage = currentScreen?.feedback
    ? feedbackState === 'correct'
      ? currentScreen.feedback.correct
      : currentScreen.feedback.wrong
    : '';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8F9FB',
        position: 'relative',
        fontFamily: "'Noto Sans', sans-serif",
        overflowX: 'hidden',
        width: '100vw',
        maxWidth: '100vw',
      }}
    >
      <BackgroundPattern />
      <ExitConfirmDialog />
      <Header
        currentScreenIndex={currentScreenIndex}
        totalScreens={SCRIPT.length}
        stageNumber={stageInfo?.number || null}
        stageName={stageInfo?.title || null}
        user={user}
        onSignOut={onSignOut}
      />

      {/* Main content — offset for header (72px) + progress bar (4px) */}
      <main id="main-content" style={{ paddingTop: 76, paddingLeft: 40, paddingRight: 40, position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen?.id || 'empty'}
            initial={currentScreen?.type === 'transition' ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScreenRenderer
              screen={currentScreen}
              selectedOptions={selectedOptions}
              feedbackState={feedbackState}
              inputLocked={inputLocked}
              charSide={charSide}
              onSelect={selectOption}
              onSubmit={submitAnswer}
              onAdvance={advance}
              onRestart={restart}
              onPreTextPhaseChange={handlePreTextPhaseChange}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Character — hide preText-only characters when question phase is active */}
      {(() => {
        const hideChars = currentScreen?.hideCharactersOnQuestion && !isPreTextPhase;
        return (
          <CharacterFigure
            character={hideChars ? null : (currentScreen?.character || null)}
            mood={currentScreen?.characterMood || null}
            secondCharacter={hideChars ? null : (currentScreen?.secondCharacter || null)}
            secondMood={currentScreen?.secondCharacterMood || null}
            screenType={currentScreen?.type || null}
            screenId={currentScreen?.id || null}
          />
        );
      })()}

      {/* Feedback Overlay */}
      <FeedbackOverlay
        feedbackState={feedbackState}
        message={feedbackMessage}
        onDismiss={dismissFeedback}
      />

      {/* Idle Timeout Overlay */}
      <IdleTimeoutOverlay isIdle={isIdle} onDismiss={dismissIdle} />

      {/* Admin Controls */}
      {isAdmin && <AdminControls onSkip={advance} />}
    </div>
  );
}
