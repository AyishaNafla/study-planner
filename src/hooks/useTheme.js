import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
// Custom hook to access the theme and its toggle function.
const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
