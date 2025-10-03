
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useServices from '../../hooks/useServices';
import ServiceFilter from './ServiceFilter';
import ServiceCard from './ServiceCard';

export default function ServiceGrid() {
  const { t } = useTranslation();
  const {
    services,
    categories,
    selectedCategory,
    handleCategoryChange,
    getPopularServices
  } = useServices();

  const popularServices = getPopularServices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
            Node.ec Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('services.mainTitle')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {t('services.mainTitleHighlight')}
            </span>{' '}
            {t('services.mainTitleEnd')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('services.mainDescription')}
          </p>
        </motion.div>

        {/* Servicios Populares */}
        {popularServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('services.popularServices')}</h2>
              <p className="text-gray-600">{t('services.popularDescription')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularServices.map((service, index) => (
                <div key={service.id} className="relative">
                  <div className="absolute -top-3 -right-3 z-10">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {t('services.card.popular')}
                    </span>
                  </div>
                  <ServiceCard service={service} index={index} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filtros y Grid Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ServiceFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Grid de Servicios */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard service={service} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {services.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {t('services.emptyState.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.emptyState.description')}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('services.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t('services.cta.freeConsult')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t('services.cta.viewPortfolio')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

