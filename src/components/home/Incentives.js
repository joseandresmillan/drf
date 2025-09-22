import { FaSatelliteDish } from "react-icons/fa";
import { SiHiveBlockchain } from "react-icons/si";
import { GiTimeTrap } from "react-icons/gi";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Incentives() {
  const { t } = useTranslation();

  const incentives = [
    {
      name: t('home.incentives.web3.title'),
      imageSrc: <SiHiveBlockchain className="h-16 w-16 text-blue-600" />,
      description: t('home.incentives.web3.description'),
    },
    {
      name: t('home.incentives.scalability.title'),
      imageSrc: <GiTimeTrap className="h-16 w-16 text-green-600" />,
      description: t('home.incentives.scalability.description'),
    },
    {
      name: t('home.incentives.interoperability.title'),
      imageSrc: <FaSatelliteDish className="h-16 w-16 text-yellow-600" />,
      description: t('home.incentives.interoperability.description'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-20 sm:px-2 sm:py-16 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              {t('home.incentives.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              {t('home.incentives.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3"
          >
            {incentives.map((incentive, index) => (
              <motion.div 
                key={incentive.name} 
                variants={itemVariants}
                className="sm:flex lg:block group hover:bg-gray-50 p-4 rounded-lg transition-all duration-300"
              >
                <div className="sm:flex-shrink-0 mb-4 sm:mb-0 group-hover:scale-110 transition-transform duration-300">
                  {incentive.imageSrc}
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {incentive.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
