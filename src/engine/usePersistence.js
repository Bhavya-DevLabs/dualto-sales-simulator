const STORAGE_KEY = 'dualto_screen';

export function loadSavedIndex(maxIndex) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const idx = parseInt(saved, 10);
      if (!isNaN(idx) && idx >= 0 && idx < maxIndex) {
        return idx;
      }
    }
  } catch {
    // localStorage unavailable — fall through to default
  }
  return 0;
}

export function saveScreenIndex(index) {
  try {
    localStorage.setItem(STORAGE_KEY, String(index));
  } catch {
    // localStorage unavailable — silent fail, React state is the in-memory fallback
  }
}

export function clearSavedProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silent fail
  }
}
