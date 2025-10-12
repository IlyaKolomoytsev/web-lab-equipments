import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
    theme: Theme;
    setTheme: (next: Theme) => void;
    toggle: () => void;
};

const STORAGE_KEY = 'theme';
const ThemeContext = createContext<ThemeContextValue | null>(null);

// Берём то, что установил ранний скрипт (без FOUC)
function getInitialTheme(): Theme {
    const w = typeof window !== 'undefined' ? (window as any) : undefined;
    if (w && (w.__effectiveTheme === 'light' || w.__effectiveTheme === 'dark')) {
        return w.__effectiveTheme as Theme;
    }
    // Фолбэк на случай, если файл utils/theme-init.ts не подключили
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    const apply = useCallback((next: Theme) => {
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    }, []);

    const setTheme = useCallback((next: Theme) => {
        setThemeState(next);
        apply(next);
    }, [apply]);

    const toggle = useCallback(() => {
        const next: Theme = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
    }, [theme, setTheme]);

    const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, setTheme, toggle]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
