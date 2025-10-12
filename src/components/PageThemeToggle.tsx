import { useEffect, useState } from "react";
import {useTheme} from "../utils/ThemeContext";

export const PageThemeToggle: React.FC = () => {
    const { theme, setTheme, toggle } = useTheme();


    const MoonIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-moon" aria-hidden="true" focusable="false"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );

    const SunIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-sun" aria-hidden="true" focusable="false"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    );

    return (
        <div className="theme-toggle">
            <button
                type="button"
                className="theme-toggle__button"
                onClick={toggle}
            >
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
        </div>
    );
};

export default PageThemeToggle;
