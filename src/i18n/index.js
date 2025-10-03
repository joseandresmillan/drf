import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones
import translationES from './locales/es/translation.json';
import translationEN from './locales/en/translation.json';

// Recursos de traducción
const resources = {
  es: {
    translation: translationES
  },
  en: {
    translation: translationEN
  }
};

i18n
  // Detectar idioma del navegador
  .use(LanguageDetector)
  // Pasar la instancia i18n a react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources,
    fallbackLng: 'es', // Idioma por defecto
    debug: process.env.NODE_ENV === 'development',

    // Opciones de detección
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false // React ya se encarga del escape
    },

    // Configuración de namespace
    defaultNS: 'translation',
    ns: ['translation'],

    // Configuración de carga
    load: 'languageOnly', // Solo 'en' en lugar de 'en-US'
    
    // Configuración de React
    react: {
      useSuspense: false // Evitar problemas con SSR
    }
  });

export default i18n;
