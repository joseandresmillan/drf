import rpihat from '../../assets/images/rpihat.png';
import { raspberryPiAiHatContentEs } from './content/raspberrypi-ai-hat/raspberry-pi-ai-hat.es';
import { raspberryPiAiHatContentEn } from './content/raspberrypi-ai-hat/raspberry-pi-ai-hat.en';

// Array principal con todos los posts del blog
export const blogPosts = [
  {
    id: 1,
    slug: "raspberry-pi-ai-hat",
    title: {
      es: "Raspberry Pi y su AI HAT: Potenciando Proyectos de IA",
      en: "Raspberry Pi and its AI HAT: Empowering AI Projects"
    },
    description: {
      es: "Descifrando el mundo de la computación al borde.",
      en: "Deciphering the word of edge computing."
    },
    excerpt: {
      es: "Descubre cómo el Raspberry Pi AI HAT está revolucionando los proyectos de inteligencia artificial con computación al borde, permitiendo procesamiento de IA en tiempo real sin necesidad de conexión a la nube.",
      en: "Discover how the Raspberry Pi AI HAT is revolutionizing artificial intelligence projects with edge computing, enabling real-time AI processing without cloud connectivity."
    },
    content: {
      es: raspberryPiAiHatContentEs,
      en: raspberryPiAiHatContentEn
    },
    image: rpihat,
    author: {
      name: "Andrés Millán",
      avatar: null,
      bio: {
        es: "Entuciasta en IA y Edge Computing",
        en: "AI and Edge Computing Enthusiast"
      }
    },
    category: "ai",
    tags: ["raspberry-pi", "ai", "edge-computing", "machine-learning", "iot"],
    readTime: 25,
    publishedDate: "2025-11-12",
    updatedDate: "2025-11-12",
    featured: true,
    seo: {
      metaTitle: {
        es: "Raspberry Pi AI HAT: Guía Completa de Edge Computing 2025",
        en: "Raspberry Pi AI HAT: Complete Edge Computing Guide 2025"
      },
      metaDescription: {
        es: "Descubre cómo usar el Raspberry Pi AI HAT para proyectos de inteligencia artificial. Guía completa con casos de uso prácticos y ejemplos.",
        en: "Learn how to use Raspberry Pi AI HAT for artificial intelligence projects. Complete guide with practical use cases and examples."
      },
      keywords: ["raspberry pi", "ai hat", "edge computing", "machine learning", "computer vision", "iot"]
    }
  }
];

// Total de posts disponibles
export const getTotalPosts = () => blogPosts.length;

// Obtener post por slug
export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

// Obtener posts destacados
export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured);
};

// Obtener posts por categoría
export const getPostsByCategory = (category) => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

// Obtener posts por tag
export const getPostsByTag = (tag) => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

// Obtener posts recientes (limitados)
export const getRecentPosts = (limit = 3) => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
    .slice(0, limit);
};

// Buscar posts por término
export const searchPosts = (searchTerm, language = 'es') => {
  const term = searchTerm.toLowerCase();
  return blogPosts.filter(post => 
    post.title[language]?.toLowerCase().includes(term) ||
    post.description[language]?.toLowerCase().includes(term) ||
    post.tags.some(tag => tag.toLowerCase().includes(term))
  );
};
