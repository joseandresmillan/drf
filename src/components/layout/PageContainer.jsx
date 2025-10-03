import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PageContainer = ({ 
  children, 
  className = '', 
  pageTitle,
  showTitle = true,
  titleClassName = '',
  ...props 
}) => {
  const { t } = useTranslation();

  // Actualizar el título de la página en el navegador
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | Node.ec`;
    }
  }, [pageTitle]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen ${className}`}
      {...props}
    >
      {showTitle && pageTitle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`pt-20 pb-8 text-center ${titleClassName}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {pageTitle}
          </h1>
        </motion.div>
      )}
      {children}
    </motion.div>
  );
};

export default PageContainer;
