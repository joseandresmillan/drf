import rpihatWebp from '../../assets/images/rpihat.webp';
import rpihatPng from '../../assets/images/rpihat.png';
import { raspberryPiAiHatContentEs } from './content/raspberrypi-ai-hat/raspberry-pi-ai-hat.es';
import { raspberryPiAiHatContentEn } from './content/raspberrypi-ai-hat/raspberry-pi-ai-hat.en';
import { roseaiMonitorContentEs } from './content/roseai-monitor/roseai-monitor.es';
import { roseaiMonitorContentEn } from './content/roseai-monitor/roseai-monitor.en';

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
    image: rpihatWebp,
    imageFallback: rpihatPng,
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
      keywords: {
        es: ["raspberry pi", "ai hat", "hailo-8l", "edge ai", "inteligencia artificial"],
        en: ["raspberry pi", "ai hat", "hailo-8l", "edge ai", "artificial intelligence"]
      }
    }
  },
  {
    id: 2,
    slug: "roseai-monitor-edge-ai",
    title: {
      es: "RoseAI: Agricultura de Precisión en el Borde con Hailo-8L",
      en: "RoseAI: Precision Agriculture at the Edge with Hailo-8L"
    },
    description: {
      es: "Monitoreo inteligente de cultivos de rosas automatizando el fenotipado.",
      en: "Smart monitoring of rose crops automating phenotyping."
    },
    excerpt: {
      es: "Descubre cómo el RoseAI Monitor automatiza el seguimiento del crecimiento y fenotipado de rosas en Cayambe utilizando la arquitectura VineCam 10BASE-T1S y aceleración Hailo-8L, reduciendo los costos de nube a cero.",
      en: "Discover how the RoseAI Monitor automates growth tracking and rose phenotyping in Cayambe using the VineCam 10BASE-T1S architecture and Hailo-8L acceleration, reducing cloud costs to zero."
    },
    content: {
      es: roseaiMonitorContentEs,
      en: roseaiMonitorContentEn
    },
    image: "https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/cayambe_greenhouse_ai_monitoring.png",
    imageFallback: "https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/cayambe_greenhouse_ai_monitoring.png",
    author: {
      name: "Andrés Millán",
      avatar: null,
      bio: {
        es: "Arquitecto de Edge AI e IoT",
        en: "Edge AI and IoT Architect"
      }
    },
    category: "ai",
    tags: ["roseai", "hailo-8l", "precision-agriculture", "edge-ai", "computer-vision", "10base-t1s"],
    readTime: 15,
    publishedDate: "2026-05-18",
    updatedDate: "2026-05-18",
    featured: true,
    seo: {
      keywords: {
        es: ["roseai", "agricultura de precision", "hailo-8l", "vinecam", "fenotipado"],
        en: ["roseai", "precision agriculture", "hailo-8l", "vinecam", "phenotyping"]
      }
    }
  }
];
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
