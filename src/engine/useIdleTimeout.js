import { useState, useEffect, useCallback, useRef } from 'react';

const IDLE_MS = 5 * 60 * 1000; // 5 minutes

export default function useIdleTimeout() {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, IDLE_MS);
  }, []);

  const dismissIdle = useCallback(() => {
    setIsIdle(false);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    const handler = () => {
      if (!isIdle) resetTimer();
    };

    events.forEach((evt) =>
      window.addEventListener(evt, handler, { passive: true })
    );
    resetTimer();

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handler));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer, isIdle]);

  return { isIdle, dismissIdle };
}
