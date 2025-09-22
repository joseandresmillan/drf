import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ServiceModal from './ServiceModal';

const ServiceCard = ({ service, index }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-px rounded-lg bg-white shadow-lg"></div>
      <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-gradient-to-br from-white to-gray-50 p-8 transition-all duration-300 group-hover:shadow-2xl">
        
        {/* Header con icono y categoría */}
        <div className="flex items-start justify-between mb-6">
          <div className="text-4xl mb-4">{service.icon}</div>
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {service.category}
          </span>
        </div>

        {/* Título y descripción */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {service.name}
        </h3>
        <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">{t('services.card.technologies')}</h4>
          <div className="flex flex-wrap gap-2">
            {service.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-green-100 hover:text-green-800 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* CTA sin pricing */}
        <div className="flex items-center justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            {t('services.card.viewMore')}
          </motion.button>
        </div>

        {/* Efecto hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-lg pointer-events-none"
          />
        )}
      </div>

      {/* Modal */}
      <ServiceModal
        service={service}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default ServiceCard;
