
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import rpihat from '../../assets/images/rpihat.png';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    slug: "raspberry-pi-ai-hat",
    title: {
      es: "Raspberry Pi y su AI HAT: Potenciando Proyectos de IA",
      en: "Raspberry Pi and its AI HAT: Empowering AI Projects"
    },
    description: {
      es: "Descifrando el mundo de la computacion al borde.",
      en: "Deciphering the word of edge computing."
    },
    image:rpihat,
    category: "ai",
    readTime: 25,
    publishedDate: "2025-11-12",
    link: "#",
  },
];

function BlogPage() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { key: 'all', icon: '📚' },
    { key: 'ai', icon: '🤖' },
     
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const matchesSearch = blog.title[i18n.language]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.description[i18n.language]?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6 lg:px-20 mt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('blog.description')}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{t(`blog.categories.${category.key}`)}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {blog.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title[i18n.language]}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        {t(`blog.categories.${blog.category}`)}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{t('blog.publishedOn')} {new Date(blog.publishedDate).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.readTime} {t('blog.readTime')}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {blog.title[i18n.language]}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.description[i18n.language]}
                  </p>
                  
                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                  >
                    <span>{t('blog.readMore')}</span>
                    <svg 
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('blog.noResults')}
            </h3>
            <p className="text-gray-600">
              Intenta con una categoría diferente o un término de búsqueda distinto.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;