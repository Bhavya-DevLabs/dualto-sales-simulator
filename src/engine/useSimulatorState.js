import { useState, useRef, useCallback, useEffect } from 'react';
import { SCRIPT } from '../data/script';
import { loadSavedIndex, saveScreenIndex, clearSavedProgress } from './usePersistence';

export default function useSimulatorState() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(() =>
    loadSavedIndex(SCRIPT.length)
  );
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedbackState, setFeedbackState] = useState('none');
  const [inputLocked, setInputLocked] = useState(false);

  const wrongTimerRef = useRef(null);
  const correctTimerRef = useRef(null);

  const currentScreen =
    currentScreenIndex >= 0 && currentScreenIndex < SCRIPT.length
      ? SCRIPT[currentScreenIndex]
      : null;

  // Persist screen index on change
  useEffect(() => {
    saveScreenIndex(currentScreenIndex);
  }, [currentScreenIndex]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current);
      if (correctTimerRef.current) clearTimeout(correctTimerRef.current);
    };
  }, []);

  const selectOption = useCallback(
    (optionId) => {
      if (inputLocked) return;
      if (!currentScreen || currentScreen.type !== 'question') return;

      if (currentScreen.multiSelect) {
        setSelectedOptions((prev) =>
          prev.includes(optionId)
            ? prev.filter((id) => id !== optionId)
            : [...prev, optionId]
        );
      } else {
        setSelectedOptions((prev) =>
          prev.includes(optionId) ? [] : [optionId]
        );
      }
    },
    [inputLocked, currentScreen]
  );

  const advance = useCallback(() => {
    setCurrentScreenIndex((prev) => {
      const next = prev + 1;
      return next < SCRIPT.length ? next : prev;
    });
    setSelectedOptions([]);
    setFeedbackState('none');
    setInputLocked(false);
  }, []);

  const submitAnswer = useCallback(() => {
    if (inputLocked || selectedOptions.length === 0) return;
    if (!currentScreen || currentScreen.type !== 'question') return;

    const selected = [...selectedOptions].sort();
    const expected = [...currentScreen.correctAnswer].sort();
    const isCorrect =
      selected.length === expected.length &&
      selected.every((id, i) => id === expected[i]);

    setInputLocked(true);

    if (isCorrect) {
      setFeedbackState('correct');
      correctTimerRef.current = setTimeout(() => {
        correctTimerRef.current = null;
        advance();
      }, 1000);
    } else {
      setFeedbackState('wrong');
      wrongTimerRef.current = setTimeout(() => {
        wrongTimerRef.current = null;
        setFeedbackState('none');
        setInputLocked(false);
      }, 2000);
    }
  }, [inputLocked, selectedOptions, currentScreen, advance]);

  const dismissFeedback = useCallback(() => {
    if (feedbackState === 'wrong') {
      if (wrongTimerRef.current) {
        clearTimeout(wrongTimerRef.current);
        wrongTimerRef.current = null;
      }
      setFeedbackState('none');
      setInputLocked(false);
    }
  }, [feedbackState]);

  const restart = useCallback(() => {
    if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current);
    if (correctTimerRef.current) clearTimeout(correctTimerRef.current);
    clearSavedProgress();
    setCurrentScreenIndex(0);
    setSelectedOptions([]);
    setFeedbackState('none');
    setInputLocked(false);
  }, []);

  return {
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
  };
}
