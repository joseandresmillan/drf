import bananacv from "assets/images/bananacv.jpg";
import sleepcv from "assets/images/somnolenciacv.png";
import conteo from "assets/images/conteo.png";
import deteccion_en_muelle from "assets/images/deteccion_en_muelle.png";
import { BsPersonFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function UseCases() {
  const { t, i18n } = useTranslation();

  const posts = [
    {
      id: 'muelles',
      title: t('cases.muelles.title'),
      href: "/casos/muelles",
      category: { 
        name: i18n.language === 'es' ? "Vision por Computadora" : "Computer Vision", 
        href: "/servicios" 
      },
      description: t('cases.muelles.description'),
      challenge: t('cases.muelles.challenge'),
      solution: t('cases.muelles.solution'),
      results: t('cases.muelles.results'),
      date: "Aug 15, 2024",
      datetime: "2024-08-15",
      imageUrl: deteccion_en_muelle,
      readingTime: "6 min",
      technologies: ["TensorFlow", "OpenCV", "Python", "Docker"],
      author: {
        name: "Andrés Millán",
        href: "#",
        imageUrl: "",
        icon: BsPersonFill,
      },
    },
    {
      id: 'plagas',
      title: t('cases.plagas.title'),
      href: "/casos/plagas",
      category: { 
        name: i18n.language === 'es' ? "Solución IoT" : "IoT Solution", 
        href: "/servicios" 
      },
      description: t('cases.plagas.description'),
      challenge: t('cases.plagas.challenge'),
      solution: t('cases.plagas.solution'),
      results: t('cases.plagas.results'),
      date: "Nov 20, 2024",
      datetime: "2024-11-20",
      imageUrl: bananacv,
      readingTime: "4 min",
      technologies: ["Deep Learning", "Python", "OpenCV", "FastAPI"],
      author: {
        name: "Andrés Millán",
        icon: BsPersonFill,
      },
    },
    {
      id: 'somnolencia',
      title: t('cases.somnolencia.title'),
      href: "/casos",
      category: { 
        name: i18n.language === 'es' ? "Solución IoT" : "IoT Solution", 
        href: "/servicios" 
      },
      description: t('cases.somnolencia.description'),
      date: "Oct 18, 2024",
      datetime: "2024-10-18",
      imageUrl: sleepcv,
      readingTime: "5 min",
      technologies: ["Computer Vision", "TensorFlow", "React", "IoT"],
      author: {
        name: "Andrés Millán",
        href: "#",
        imageUrl: "",
        icon: BsPersonFill,
      },
    },
    {
      id: 'conteo',
      title: t('cases.conteo.title'),
      href: "/casos/conteo",
      category: { 
        name: i18n.language === 'es' ? "Vision por Computadora" : "Computer Vision", 
        href: "/servicios" 
      },
      description: t('cases.conteo.description'),
      challenge: t('cases.conteo.challenge'),
      solution: t('cases.conteo.solution'),
      results: t('cases.conteo.results'),
      date: "Sept 30, 2024",
      datetime: "2024-09-30",
      imageUrl: conteo,
      readingTime: "8 min",
      technologies: ["YOLO", "OpenCV", "Python", "PostgreSQL"],
      author: {
        name: "Andrés Millán",
        href: "#",
        imageUrl: "",
        icon: BsPersonFill,
      },
    },
  ];

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
    <div className="relative bg-gray-50 px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-36 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-gray-50 sm:h-2/3" />
      </div>
      <div className="relative mx-auto lg:mx-12 max-w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('cases.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('cases.subtitle')}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('cases.description')}
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="mx-auto mt-12 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-2 xl:grid-cols-2">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              className="flex flex-col overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex-shrink-0 relative overflow-hidden">
                <img
                  className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={post.imageUrl}
                  alt={post.title}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {post.category.name}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <a href={post.href} className="block group">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.description}
                    </p>
                  </a>

                  {/* Technologies */}
                  {post.technologies && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">
                        {t('cases.technologies')}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Info for Cases with detailed info */}
                  {(post.id === 'muelles' || post.id === 'plagas' || post.id === 'conteo') && (
                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-blue-600 mb-1">
                          🎯 {t('cases.challenge')}:
                        </p>
                        <p className="text-xs text-gray-600">{post.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-600 mb-1">
                          💡 {t('cases.solution')}:
                        </p>
                        <p className="text-xs text-gray-600">{post.solution}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-purple-600 mb-1">
                          📊 {t('cases.results')}:
                        </p>
                        <p className="text-xs text-gray-600">{post.results}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {post.author.imageUrl ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={post.author.imageUrl}
                          alt={post.author.name}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <post.author.icon className="text-gray-600 h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {post.author.name}
                      </p>
                      <div className="flex space-x-1 text-xs text-gray-500">
                        <time dateTime={post.datetime}>
                          {new Date(post.datetime).toLocaleDateString()}
                        </time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readingTime} {t('blog.readTime')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <a
                    href={post.href}
                    className="inline-flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors group"
                  >
                    <span>{t('cases.viewCase')}</span>
                    <svg 
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
