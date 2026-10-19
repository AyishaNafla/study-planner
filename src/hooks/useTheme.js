import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Custom hook to access the theme and its toggle function.
const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
