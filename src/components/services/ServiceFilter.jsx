import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServiceFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-6 mb-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('services.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t('services.subtitle')}
        </p>
      </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-blue-100'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {category.count}
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ServiceFilter;
