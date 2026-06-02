import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const ThemeSelector = ({ className = "", variant = "navbar" }) => {
  const { isDark, toggleTheme } = useTheme();

  const variants = {
    navbar: "flex items-center space-x-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:shadow-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    home: "flex items-center space-x-1.5 px-1.5 py-1 rounded-md text-xs font-medium transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50",
    mobile: "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-blue-button hover:bg-blue-button hover:text-white transition-colors w-full justify-start",
  };

  const buttonClasses = variants[variant] || variants.navbar;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`${buttonClasses} ${className}`}
      aria-label={isDark ? "Activar tema claro" : "Activar tema oscuro"}
      title={isDark ? "Tema oscuro activo" : "Tema claro activo"}
      type="button"
    >
      {isDark ? (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3c0 0 0 0 0 0a7 7 0 009.79 9.79z" />
        </svg>
      )}
      <span className="text-xs font-medium">{isDark ? "Dark" : "Light"}</span>
    </motion.button>
  );
};

export default ThemeSelector;
