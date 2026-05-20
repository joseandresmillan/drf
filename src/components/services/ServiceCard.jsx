import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ service, index }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const features = Array.isArray(service.features) ? service.features : [];

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isExpanded) {
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.dataset.scrollY = scrollY.toString();
    } else if (document.body.dataset.scrollY) {
      // Immediately restore scroll position when closing
      const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
      
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.paddingRight = '';
      delete document.body.dataset.scrollY;
      
      window.scrollTo(0, scrollY);
    }
  }, [isExpanded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-px rounded-lg bg-white shadow-lg"></div>
      <div className="relative flex h-full flex-col rounded-lg bg-gradient-to-br from-white to-gray-50 p-8 transition-all duration-300 group-hover:shadow-2xl"
        style={{ minHeight: '400px' }}
      >
        
        {/* Header con icono y categoría */}
        <div className="flex items-start justify-between mb-6">
          <div className="text-4xl mb-4">{service.icon}</div>
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {service.categoryLabel || service.category}
          </span>
        </div>

        {/* Título y descripción */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {service.name}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features - Always visible */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">{t('services.card.technologies')}</h4>
          <div className="flex flex-wrap gap-2">
            {features.map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-green-100 hover:text-green-800 transition-colors"
              >
                {feature}
              </span>
            ))}
            {features.length === 0 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                {t('services.card.technologies')}
              </span>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex items-center justify-end mt-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md text-sm"
          >
            {isExpanded ? t('services.card.viewLess') || 'View Less' : t('services.card.viewMore')}
          </button>
        </div>

        {/* Efecto hover */}
        {isHovered && !isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-lg pointer-events-none"
          />
        )}
      </div>

      {/* Expanded Content - Popup Overlay */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
          
          {/* Popup Card */}
          <div 
            className="fixed z-50 inset-0 flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient and close button */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-t-2xl">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                >
                  ✕
                </button>
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
                    <p className="text-blue-100">{service.description}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    🔧 {t('modal.technologies')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                    {features.length === 0 && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {service.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="mb-6 pb-6 border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    📋 {t('modal.projectDetails')}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600 text-sm">{t('modal.duration')}</span>
                      <p className="font-medium text-gray-900">{service.timeline || `2-6 ${t('services.timeline.weeks')}`}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">{t('modal.category')}</span>
                      <p className="font-medium text-gray-900 capitalize">{service.categoryLabel || service.category}</p>
                    </div>
                  </div>
                </div>

                {/* Work Process */}
                <div className="mb-6 pb-6 border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    🔄 {t('modal.process')}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { step: "1", title: t('modal.processSteps.analysis.title'), desc: t('modal.processSteps.analysis.description') },
                      { step: "2", title: t('modal.processSteps.design.title'), desc: t('modal.processSteps.design.description') },
                      { step: "3", title: t('modal.processSteps.development.title'), desc: t('modal.processSteps.development.description') },
                      { step: "4", title: t('modal.processSteps.delivery.title'), desc: t('modal.processSteps.delivery.description') }
                    ].map((phase, idx) => (
                      <div key={idx} className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">
                          {phase.step}
                        </div>
                        <h5 className="font-semibold text-gray-900 text-xs mb-1">{phase.title}</h5>
                        <p className="text-xs text-gray-600">{phase.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Service Badge */}
                {service.popular && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <span className="text-green-600 text-lg mr-2">🏆</span>
                      <h4 className="font-semibold text-green-900">{t('modal.popularService')}</h4>
                    </div>
                    <p className="text-green-800 text-sm">{t('modal.popularDescription')}</p>
                  </div>
                )}

                {/* Key Benefits */}
                <div className="mb-6 pb-6 border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    ✨ {t('modal.benefits')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {t('modal.benefitsList', { returnObjects: true }).map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    💬 {t('modal.freeConsult')}
                  </button>
                  <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    📁 {t('modal.viewPortfolio')}
                  </button>
                </div>
              </div>
            </div>
            </div>
          </>
        )}
    </motion.div>
  );
};

export default ServiceCard;