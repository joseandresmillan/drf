import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import ContactForm from "components/contact/ContactForm";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function Contact() {
  const { t } = useTranslation();

  return (
    <Layout>
      <Navbar />
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen py-12">
        <div className="container mx-auto px-6 lg:px-20 mt-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.info.title')}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t('contact.info.locationLabel')}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{t('contact.info.address')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t('contact.info.emailLabel')}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{t('contact.info.email')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t('contact.info.phoneLabel')}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{t('contact.info.phone')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t('contact.info.hoursLabel')}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{t('contact.info.hours')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Contact;
