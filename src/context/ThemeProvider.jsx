
import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

// Provide the selected theme to child components.
export const ThemeProvider = ({ children }) => {
  // Restore the saved theme, or use light mode by default.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Save the selected theme whenever it changes.
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Switch between light and dark themes.
  const toggleTheme = () => {
    setTheme((currentTheme) => {
      return currentTheme === "light" ? "dark" : "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
