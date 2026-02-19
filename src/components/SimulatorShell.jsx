import { useEffect } from 'react';
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

  const stageInfo = getCurrentStageInfo(currentScreenIndex);
  const isLargeChar =
    currentScreen &&
    (currentScreen.type === 'intro' || currentScreen.type === 'completion');

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
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScreenRenderer
              screen={currentScreen}
              selectedOptions={selectedOptions}
              feedbackState={feedbackState}
              inputLocked={inputLocked}
              onSelect={selectOption}
              onSubmit={submitAnswer}
              onAdvance={advance}
              onRestart={restart}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Character */}
      <CharacterFigure
        character={currentScreen?.character || null}
        large={isLargeChar}
        mood={currentScreen?.characterMood || null}
        showQuestionMark={currentScreen?.showQuestionMark || false}
      />

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
