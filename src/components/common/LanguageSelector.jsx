import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLanguage from '../../hooks/useLanguage';

const LanguageSelector = ({ className = '', variant = 'navbar' }) => {
  const { 
    currentLanguage, 
    changeLanguage, 
    availableLanguages 
  } = useLanguage();
  
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('right-0');
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Calcular posición del dropdown para evitar desbordamiento
  useEffect(() => {
    if (isOpen && buttonRef.current && variant !== 'mobile') {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 144; // w-36 = 144px
      const margin = 20; // Margen de seguridad
      
      // Si el dropdown se sale por la derecha, posicionarlo a la izquierda del botón
      if (buttonRect.right + dropdownWidth > viewportWidth - margin) {
        setDropdownPosition('right-0');
      } else {
        setDropdownPosition('left-0');
      }
    } else if (variant === 'mobile') {
      // Para móvil, siempre usar ancho completo
      setDropdownPosition('left-0 right-0');
    }
  }, [isOpen, variant]);

  // Estilos por variante
  const variants = {
    navbar: {
      button: "flex items-center space-x-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:shadow-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      dropdown: `absolute ${dropdownPosition} mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50`,
      item: "flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
    },
    home: {
      button: "flex items-center space-x-1.5 px-1.5 py-1 rounded-md text-xs font-medium transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50",
      dropdown: `absolute ${dropdownPosition} mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50`,
      item: "flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
    },
    mobile: {
      button: "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-blue-button hover:bg-blue-button hover:text-white transition-colors w-full justify-start",
      dropdown: "absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50",
      item: "flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
    },
    footer: {
      button: "flex items-center space-x-2 px-2 py-1 rounded text-gray-500 hover:text-gray-700 transition-colors",
      dropdown: "absolute bottom-full right-0 mb-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50",
      item: "flex items-center justify-center space-x-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
    },
    floating: {
      button: "fixed bottom-6 right-6 flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-40",
      dropdown: "absolute bottom-full right-0 mb-3 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50",
      item: "flex items-center justify-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
    }
  };

  const currentVariant = variants[variant] || variants.navbar;

  return (
    <div className={`relative ${className}`}>
      {/* Botón selector */}
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        className={currentVariant.button}
        aria-label="Seleccionar idioma"
      >
        {/* Icono de bandera del idioma actual */}
        {currentLanguage === 'es' ? (
          <svg className="w-4 h-3" viewBox="0 0 3 2" fill="none">
            <rect width="3" height="2" fill="#C60B1E"/>
            <rect width="3" height="0.67" y="0.67" fill="#FFC400"/>
          </svg>
        ) : (
          <svg className="w-4 h-3" viewBox="0 0 19 10" fill="none">
            <rect width="19" height="10" fill="#B22234"/>
            <rect width="19" height="0.77" y="0" fill="white"/>
            <rect width="19" height="0.77" y="1.54" fill="white"/>
            <rect width="19" height="0.77" y="3.08" fill="white"/>
            <rect width="19" height="0.77" y="4.62" fill="white"/>
            <rect width="19" height="0.77" y="6.15" fill="white"/>
            <rect width="19" height="0.77" y="7.69" fill="white"/>
            <rect width="19" height="0.77" y="9.23" fill="white"/>
            <rect width="7.6" height="5.38" y="0" fill="#3C3B6E"/>
          </svg>
        )}
        {variant !== 'floating' && (
          <>
            <span className="text-xs font-medium">{currentLanguage.toUpperCase()}</span>
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para cerrar */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Lista de idiomas */}
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: variant === 'floating' ? 10 : -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: variant === 'floating' ? 10 : -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={currentVariant.dropdown}
            >
              {availableLanguages.map((lang) => (
                <motion.div
                  key={lang.code}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`${currentVariant.item} ${
                    currentLanguage === lang.code ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    {lang.code === 'es' ? (
                      <svg className="w-4 h-3" viewBox="0 0 3 2" fill="none">
                        <rect width="3" height="2" fill="#C60B1E"/>
                        <rect width="3" height="0.67" y="0.67" fill="#FFC400"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-3" viewBox="0 0 19 10" fill="none">
                        <rect width="19" height="10" fill="#B22234"/>
                        <rect width="19" height="0.77" y="0" fill="white"/>
                        <rect width="19" height="0.77" y="1.54" fill="white"/>
                        <rect width="19" height="0.77" y="3.08" fill="white"/>
                        <rect width="19" height="0.77" y="4.62" fill="white"/>
                        <rect width="19" height="0.77" y="6.15" fill="white"/>
                        <rect width="19" height="0.77" y="7.69" fill="white"/>
                        <rect width="19" height="0.77" y="9.23" fill="white"/>
                        <rect width="7.6" height="5.38" y="0" fill="#3C3B6E"/>
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-xs leading-none">{lang.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
