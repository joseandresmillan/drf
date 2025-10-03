import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Sincronizar con cambios de i18n
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng);
    };

    // Escuchar cambios de idioma
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Asegurar que el estado inicial sea correcto
    setCurrentLanguage(i18n.language);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const isSpanish = currentLanguage === 'es';
  const isEnglish = currentLanguage === 'en';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  };

  const getLanguageFlag = (lang) => {
    const flags = {
      es: '🇪🇸',
      en: '🇺🇸'
    };
    return flags[lang] || '🌐';
  };

  const getLanguageName = (lang) => {
    const names = {
      es: 'Español',
      en: 'English'
    };
    return names[lang] || lang.toUpperCase();
  };

  const availableLanguages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return {
    t,
    currentLanguage,
    isSpanish,
    isEnglish,
    changeLanguage,
    toggleLanguage,
    getLanguageFlag,
    getLanguageName,
    availableLanguages
  };
};

export default useLanguage;