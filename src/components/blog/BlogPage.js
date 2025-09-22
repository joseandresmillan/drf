
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const blogs = [
  {
    id: 1,
    title: {
      es: "Fundamentos de SEO: Guía para Principiantes",
      en: "SEO Basics: Beginner's Guide to SEO Success"
    },
    description: {
      es: "Durante el último año, Node.ec ha experimentado muchos cambios. Después de meses de preparación y trabajo duro, nos mudamos a nuestra nueva oficina.",
      en: "Over the past year, Node.ec has undergone many changes! After months of preparation and some hard work, we moved to our new office."
    },
    image: "https://via.placeholder.com/400x200",
    category: "web3",
    readTime: 5,
    publishedDate: "2024-01-15",
    link: "#",
  },
  {
    id: 2,
    title: {
      es: "Cómo desplegar rápidamente un sitio web estático",
      en: "How to quickly deploy a static website"
    },
    description: {
      es: "Aprende las mejores prácticas para el despliegue rápido y eficiente de sitios web estáticos usando herramientas modernas.",
      en: "Learn best practices for quick and efficient deployment of static websites using modern tools."
    },
    category: "development",
    readTime: 8,
    publishedDate: "2024-01-10",
    link: "#",
  },
  {
    id: 3,
    title: {
      es: "Cómo Posicionarse Mejor en Google (6 Pasos Fáciles)",
      en: "How to Rank Higher on Google (6 Easy Steps)"
    },
    description: {
      es: "Estrategias probadas para mejorar tu posicionamiento en los motores de búsqueda y aumentar tu visibilidad online.",
      en: "Proven strategies to improve your search engine ranking and increase your online visibility."
    },
    category: "ai",
    readTime: 12,
    publishedDate: "2024-01-05",
    link: "#",
  },
  {
    id: 4,
    title: {
      es: "¿Qué es SEO? Optimización para Motores de Búsqueda Explicada",
      en: "What is SEO? Search Engine Optimization Explained"
    },
    description: {
      es: "Una introducción completa al mundo del SEO, conceptos fundamentales y por qué es crucial para tu negocio digital.",
      en: "A complete introduction to the world of SEO, fundamental concepts and why it's crucial for your digital business."
    },
    category: "automation",
    readTime: 6,
    publishedDate: "2023-12-28",
    link: "#",
  },
  {
    id: 5,
    title: {
      es: "12 Mejores Prácticas de SEO que Todos Deberían Seguir",
      en: "12 SEO Best Practices That Everyone Should Follow"
    },
    description: {
      es: "Técnicas esenciales de SEO que todo profesional digital debe conocer para maximizar el rendimiento de su sitio web.",
      en: "Essential SEO techniques that every digital professional should know to maximize their website performance."
    },
    category: "web3",
    readTime: 15,
    publishedDate: "2023-12-20",
    link: "#",
  },
  {
    id: 6,
    title: {
      es: "Cómo programar tus Tweets para enviar más tarde",
      en: "How to schedule your Tweets to send later"
    },
    description: {
      es: "Herramientas y estrategias para automatizar tu presencia en redes sociales y maximizar el engagement.",
      en: "Tools and strategies to automate your social media presence and maximize engagement."
    },
    category: "automation",
    readTime: 4,
    publishedDate: "2023-12-15",
    link: "#",
  },
];

function BlogPage() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { key: 'all', icon: '📚' },
    { key: 'web3', icon: '🔗' },
    { key: 'ai', icon: '🤖' },
    { key: 'development', icon: '💻' },
    { key: 'automation', icon: '⚡' }
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
                  
                  <a
                    href={blog.link}
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
                  </a>
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