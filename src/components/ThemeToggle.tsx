import { useState, useEffect, useCallback } from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

type Theme = 'light' | 'dark' | 'device';

const THEME_KEY = 'theme-preference';
const THEMES: Theme[] = ['light', 'dark', 'device'];

const THEME_LABELS: Record<Theme, string> = {
  light: 'Light mode',
  dark: 'Dark mode',
  device: 'Use device setting',
};

function applyTheme(theme: Theme): void {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'device' && prefersDark);
  document.documentElement.classList.toggle('dark', isDark);
}

function getNextTheme(current: Theme): Theme {
  const index = THEMES.indexOf(current);
  return THEMES[(index + 1) % THEMES.length];
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('device');

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    const initial: Theme = saved && THEMES.includes(saved) ? saved : 'device';
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    applyTheme(theme);

    if (theme === 'device') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme('device');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  const handleToggle = useCallback(() => {
    const next = getNextTheme(theme);
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }, [theme]);

  const Icon = theme === 'light' ? FiSun : theme === 'dark' ? FiMoon : FiMonitor;
  const nextTheme = getNextTheme(theme);

  return (
    <button
      onClick={handleToggle}
      aria-label={`${THEME_LABELS[theme]} — click to switch to ${THEME_LABELS[nextTheme]}`}
      title={`${THEME_LABELS[theme]} — click to switch to ${THEME_LABELS[nextTheme]}`}
      className="text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors p-1 rounded"
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
