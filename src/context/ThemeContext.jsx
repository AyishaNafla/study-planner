import { createContext, useState } from "react";

// Create a context to share the theme across components.
export const ThemeContext = createContext();

// Provide the selected theme to child components.
export const ThemeProvider = ({ children }) => {
  // Restore the saved theme, or use light mode by default.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Switch between light and dark themes.
  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === "light" ? "dark" : "light";

      // Save the selected theme for future visits.
      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
