export const loadState = <T>(key: string): T | undefined => {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) as T : undefined;
  } catch {
    return undefined;
  }
};

export const saveState = <T>(key: string, state: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
};
