import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const BlogCard = ({ blog, index }) => {
  const { t, i18n } = useTranslation();
  
  // Normalize language code (es-ES -> es, en-US -> en)
  const lang = i18n.language.split('-')[0];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Link to={`/blog/${blog.slug}`} className="block">
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
      >
        {blog.image && (
          <div className="relative overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title[lang]}
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
            {blog.title[lang]}
          </h2>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {blog.description[lang]}
          </p>
          
          <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
            <span>{t('blog.readMore')}</span>
            <svg 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;
