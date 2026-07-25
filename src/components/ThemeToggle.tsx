import { useEffect, useContext, } from "react";
import type { Theme } from "../pages/main_page/MainPage";
import { ThemeContext } from "../pages/main_page/MainPage";


interface themeToggleProps {
    toggleTheme : () => void;
}

export default function ThemeToggle({toggleTheme}: themeToggleProps) {

    const theme = useContext(ThemeContext)
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button type="submit" className="theme_toggle" onClick={toggleTheme} title="Toggle light/dark theme">
            {theme === "light" ? "☀" : "☾"}
        </button>
    );
}
