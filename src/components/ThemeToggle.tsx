import { useEffect, useContext, } from "react";
import { ThemeContext } from "../pages/main_page/MainPage";


interface themeToggleProps {
    toggleTheme : () => void;
}

export default function ThemeToggle({toggleTheme}: themeToggleProps) {

    const theme = useContext(ThemeContext)
    useEffect(() => {
        const root = document.documentElement;
        // Flipping ~30 CSS variables at :root would otherwise trigger every
        // `transition: all` element to animate its background/box-shadow/filter
        // at once - the main cause of the laggy theme switch. Suppress all
        // transitions for the swap, then re-enable on the next frame so the
        // change is instant and hover transitions still work afterwards.
        root.classList.add("theme-switching");
        root.dataset.theme = theme;
        localStorage.setItem("theme", theme);

        const raf = requestAnimationFrame(() => {
            requestAnimationFrame(() => root.classList.remove("theme-switching"));
        });
        return () => cancelAnimationFrame(raf);
    }, [theme]);

    return (
        <button type="submit" className="theme_toggle" onClick={toggleTheme} title="Toggle light/dark theme">
            {theme === "light" ? "☀" : "☾"}
        </button>
    );
}
