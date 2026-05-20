
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fetchBlogs } from '../../redux/actions/blog';
import { fetchCategories } from '../../redux/actions/categories';
import { adaptApiPost } from '../../utils/blogAdapter';
import BlogCard from './BlogCard';

function BlogPage({ apiBlogList, fetchBlogs, apiCategories, fetchCategories }) {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [fetchBlogs, fetchCategories]);

  // Normalize language code (es-ES -> es, en-US -> en) with fallback to 'es'
  const lang = i18n.language ? i18n.language.split('-')[0] : 'es';

  // Posts from API only
  const allPosts = apiBlogList.map(adaptApiPost);

  // Build category list from API
  const apiCategoryItems = apiCategories.map((c) => ({ key: c.slug, icon: '🏷️', label: c.name }));
  const categories = [
    { key: 'all', icon: '📚' },
    ...apiCategoryItems,
  ];

  const filteredBlogs = allPosts.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const title = typeof blog.title === 'object' ? blog.title[lang] : blog.title;
    const description = typeof blog.description === 'object' ? blog.description[lang] : (blog.description || '');
    const matchesSearch = title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                <span>
                  {category.key === 'all'
                    ? t('blog.categories.all')
                    : category.label || t(`blog.categories.${category.key}`, { defaultValue: category.label || category.key })}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
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

export default connect(
  (state) => ({ apiBlogList: state.blog.list, apiCategories: state.categories.list }),
  { fetchBlogs, fetchCategories }
)(BlogPage);