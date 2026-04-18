import { useState, useCallback } from 'react';
import { Theme } from '../types';
import { FONT_SETTINGS } from '../constants';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [fontSize, setFontSize] = useState(FONT_SETTINGS.DEFAULT_SIZE);
  const [showSettings, setShowSettings] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const incrementFontSize = useCallback(() => {
    setFontSize(prev => Math.min(FONT_SETTINGS.MAX_SIZE, prev + 1));
  }, []);

  const decrementFontSize = useCallback(() => {
    setFontSize(prev => Math.max(FONT_SETTINGS.MIN_SIZE, prev - 1));
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme,
    fontSize,
    setFontSize,
    incrementFontSize,
    decrementFontSize,
    showSettings,
    setShowSettings,
  };
}
