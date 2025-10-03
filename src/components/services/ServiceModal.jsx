import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServiceModal = ({ service, isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!service) return null;

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="relative p-8 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              >
                ✕
              </button>
              
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{service.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
                  <p className="text-blue-100 text-lg">{service.description}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Detalles del proyecto */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('modal.projectDetails')}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('modal.duration')}</span>
                      <span className="font-medium">{service.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('modal.category')}</span>
                      <span className="font-medium capitalize">{service.category}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('modal.technologies')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proceso de trabajo */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('modal.process')}
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { step: "1", title: t('modal.processSteps.analysis.title'), desc: t('modal.processSteps.analysis.description') },
                    { step: "2", title: t('modal.processSteps.design.title'), desc: t('modal.processSteps.design.description') },
                    { step: "3", title: t('modal.processSteps.development.title'), desc: t('modal.processSteps.development.description') },
                    { step: "4", title: t('modal.processSteps.delivery.title'), desc: t('modal.processSteps.delivery.description') }
                  ].map((phase, idx) => (
                    <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">
                        {phase.step}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{phase.title}</h4>
                      <p className="text-xs text-gray-600">{phase.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Casos de éxito (si aplica) */}
              {service.popular && (
                <div className="mb-8 p-6 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center mb-3">
                    <span className="text-green-600 text-xl mr-2">🏆</span>
                    <h3 className="text-lg font-semibold text-green-900">
                      {t('modal.popularService')}
                    </h3>
                  </div>
                  <p className="text-green-800 text-sm">
                    {t('modal.popularDescription')}
                  </p>
                </div>
              )}

              {/* Beneficios */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('modal.benefits')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {t('modal.benefitsList', { returnObjects: true }).map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {t('modal.freeConsult')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  {t('modal.viewPortfolio')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
