export {};

type ThemeInit = 'light' | 'dark';

declare global {
    interface Window {
        __effectiveTheme?: ThemeInit;
    }
}

(function () {
    const STORAGE_KEY = 'theme';

    let stored: string | null = null;
    try {
        stored = localStorage.getItem(STORAGE_KEY);
    } catch {}

    const isTheme = (v: unknown): v is ThemeInit => v === 'light' || v === 'dark';

    function systemPrefersDark(): boolean {
        return (
            typeof window !== 'undefined' &&
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        );
    }

    const effective: ThemeInit = isTheme(stored)
        ? stored
        : systemPrefersDark()
            ? 'dark'
            : 'light';

    document.documentElement.setAttribute('data-theme', effective);

    // Экспортим для первого рендера React
    window.__effectiveTheme = effective;
})();