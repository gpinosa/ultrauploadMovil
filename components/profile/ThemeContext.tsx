import { createContext, useContext, ReactNode } from "react";

interface IThemeContextType {
  isDark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    muted: string;
  };
}

const ThemeContext = createContext<IThemeContextType>({
  isDark: true,
  colors: {
    primary: "#1d9bf0",
    background: "#000000",
    card: "#16181c",
    text: "#ffffff",
    border: "#2f3336",
    muted: "#71767b",
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = {
    isDark: true,
    colors: {
      primary: "#1d9bf0",
      background: "#000000",
      card: "#16181c",
      text: "#ffffff",
      border: "#2f3336",
      muted: "#71767b",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
