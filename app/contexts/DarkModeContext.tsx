import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface DarkModeContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextType | null>(null);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("isDark");
    if (saved != null) {
      setIsDark(JSON.parse(saved));
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("useDarkMode must be used within DarkModeProvider");
  }

  return context;
}
