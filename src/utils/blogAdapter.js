const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const resolveMediaUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}${url}`;
};

/**
 * Adapts an API blog post (Django model) to the static post format
 * expected by BlogCard and BlogDetail components.
 */
export const adaptApiPost = (apiPost) => {
  const wordCount = (apiPost.content || '').split(/\s+/).filter(Boolean).length;
  const readTime = apiPost.read_time || Math.max(1, Math.ceil(wordCount / 200));

  const imageUrl = resolveMediaUrl(apiPost.image);

  return {
    id: `api_${apiPost.id}`,
    _apiId: apiPost.id,
    slug: apiPost.slug,
    title: {
      es: apiPost.title,
      en: apiPost.title_en || apiPost.title,
    },
    description: {
      es: apiPost.excerpt || apiPost.title,
      en: apiPost.excerpt_en || apiPost.excerpt || apiPost.title_en || apiPost.title,
    },
    excerpt: {
      es: apiPost.excerpt || '',
      en: apiPost.excerpt_en || apiPost.excerpt || '',
    },
    content: {
      es: apiPost.content || '',
      en: apiPost.content_en || apiPost.content || '',
    },
    image: imageUrl,
    imageFallback: imageUrl,
    author: {
      name: apiPost.author_name || 'Equipo Node.ec',
      avatar: null,
      bio: { es: '', en: '' },
    },
    category: apiPost.category_slug || 'general',
    categoryName: apiPost.category_name || null,
    tags: [],
    readTime,
    publishedDate: apiPost.created_at,
    updatedDate: apiPost.updated_at,
    featured: false,
    isApiPost: true,
    seo: {
      metaTitle: { es: apiPost.title, en: apiPost.title },
      metaDescription: {
        es: apiPost.excerpt || apiPost.title,
        en: apiPost.excerpt || apiPost.title,
      },
      keywords: [],
    },
  };
};
