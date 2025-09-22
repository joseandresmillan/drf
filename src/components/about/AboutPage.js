import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function AboutSection() {
    const { t } = useTranslation();

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut"
            }
        })
    };

    return (
        <div className="bg-gray-100 py-20">
            <div className="container mx-auto px-6 lg:px-20 mt-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('about.title')}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
                        {t('about.subtitle')}
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        {t('about.description')}
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {/* Mission Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="bg-white p-8 shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-white text-2xl">🎯</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('about.mission.title')}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t('about.mission.description')}
                        </p>
                    </motion.div>

                    {/* Vision Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        className="bg-white p-8 shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-white text-2xl">🔮</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('about.vision.title')}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t('about.vision.description')}
                        </p>
                    </motion.div>

                    {/* Team Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="bg-white p-8 shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-white text-2xl">👥</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('about.team.title')}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t('about.team.description')}
                        </p>
                    </motion.div>
                </div>

                {/* Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="bg-white rounded-xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        {t('about.values.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-xl">💡</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                                {t('about.values.innovation')}
                            </h3>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-purple-600 text-xl">⭐</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                                {t('about.values.quality')}
                            </h3>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 text-xl">🌱</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                                {t('about.values.sustainability')}
                            </h3>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-orange-600 text-xl">🤝</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                                {t('about.values.collaboration')}
                            </h3>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


