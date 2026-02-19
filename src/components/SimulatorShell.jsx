import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import CharacterFigure from './CharacterFigure';
import FeedbackOverlay from './FeedbackOverlay';
import IdleTimeoutOverlay from './IdleTimeoutOverlay';
import AdminControls from './AdminControls';
import ExitConfirmDialog from './ExitConfirmDialog';
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

  const feedbackMessage = currentScreen?.feedback
    ? feedbackState === 'correct'
      ? currentScreen.feedback.correct
      : currentScreen.feedback.wrong
    : '';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F0F2F8',
        fontFamily: "'Noto Sans', sans-serif",
      }}
    >
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
      <main style={{ paddingTop: 76, paddingLeft: 40, paddingRight: 40 }}>
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
