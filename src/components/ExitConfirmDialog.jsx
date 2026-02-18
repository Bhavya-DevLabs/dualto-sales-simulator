import { useEffect } from 'react';

export default function ExitConfirmDialog() {
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to exit the simulation?';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  return null;
}
