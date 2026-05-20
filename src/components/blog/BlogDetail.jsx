import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fetchBlogs, fetchBlogDetail } from "../../redux/actions/blog";
import { adaptApiPost } from "../../utils/blogAdapter";
import Footer from "../navigation/Footer";
import Layout from "../../hocs/layouts/Layout";
import LanguageSelector from "../common/LanguageSelector";
import "../../styles/blogContent.css";

function BlogDetail({ apiBlogList, apiBlogDetail, fetchBlogs, fetchBlogDetail }) {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Normalize language code with fallback to 'es'
  const lang = i18n.language ? i18n.language.split('-')[0] : 'es';

  // Step 1: ensure the list is loaded (we need the ID to fetch detail)
  useEffect(() => {
    if (apiBlogList.length === 0) {
      fetchBlogs();
    }
  }, [apiBlogList.length, fetchBlogs]);

  // Step 2: once we have the ID from the list, fetch the full detail (includes content)
  useEffect(() => {
    const listEntry = apiBlogList.find((p) => p.slug === slug);
    if (listEntry) {
      fetchBlogDetail(listEntry.id);
    }
  }, [apiBlogList, slug, fetchBlogDetail]);

  // Use the detail post (has content) — fall back to list entry while loading
  const detailRaw = apiBlogDetail && apiBlogDetail.slug === slug ? apiBlogDetail : null;
  const listRaw = apiBlogList.find((p) => p.slug === slug);
  const post = detailRaw ? adaptApiPost(detailRaw) : (listRaw ? adaptApiPost(listRaw) : null);

  // Estados para el contenido y la carga
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (post && post.seo) {
      // Actualizar meta tags para SEO
      document.title =
        post.seo.metaTitle?.[lang] || post.title[lang];

      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription && post.seo.metaDescription) {
        metaDescription.setAttribute(
          "content",
          post.seo.metaDescription[lang]
        );
      }
    }
  }, [slug, post, lang]);

  //  Cargar contenido cuando cambie el post o el idioma
  useEffect(() => {
    const loadContent = async () => {
      if (!post) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // El contenido ya está cargado desde posts.js
        const postContent = post.content[lang];
        setContent(postContent);
      } catch (error) {
        console.error("Error loading content:", error);
        setContent("");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [post, lang]);

  // Función global para copiar código de los code blocks
  useEffect(() => {
    window.copyCode = function (button) {
      const codeBlock = button.closest(".code-block");
      const code = codeBlock.querySelector("code").textContent;

      navigator.clipboard.writeText(code).then(() => {
        const originalHTML = button.innerHTML;
        const copiedText = lang === "es" ? "Copiado!" : "Copied!";
        button.innerHTML = `
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          ${copiedText}
        `;
        button.classList.add("copied");

        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.classList.remove("copied");
        }, 2000);
      });
    };

    return () => {
      delete window.copyCode;
    };
  }, [lang]);

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">
              {t("blog.postNotFound") || "Post no encontrado"}
            </p>
            <Link
              to="/blog"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              {t("Back to Blog") || "Volver al Blog"}
            </Link>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section con Gradiente */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm mb-6 text-white/90">
                <Link to="/" className="hover:text-white transition-colors">
                  {lang === "es" ? "Inicio" : "Home"}
                </Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-white transition-colors">
                  {t("nav.blog")}
                </Link>
                <span>/</span>
                <span className="text-white font-medium truncate max-w-xs">
                  {post.title[lang]}
                </span>
              </nav>

              {/* Language Selector */}
              <div className="mb-6">
                <LanguageSelector variant="home" />
              </div>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {post.categoryName || t(`blog.categories.${post.category}`, { defaultValue: post.category })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl">
                {post.title[lang]}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{post.author.name}</p>
                    {post.author.bio && (
                      <p className="text-xs text-white/80">
                        {post.author.bio[lang]}
                      </p>
                    )}
                  </div>
                </div>
                <span className="hidden md:inline">•</span>
                <div className="flex items-center space-x-1">
                  <span>📅</span>
                  <time className="text-sm">
                    {new Date(post.publishedDate).toLocaleDateString(
                      lang === "es" ? "es-ES" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </time>
                </div>
                <span className="hidden md:inline">•</span>
                <div className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span className="text-sm">
                    {post.readTime} {t("blog.readTime")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 lg:px-20 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Featured Image */}
              {post.image && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-2xl mx-auto max-w-2xl">
                  <picture>
                    <source srcSet={post.image} type="image/webp" />
                    <img
                      src={post.imageFallback || post.image}
                      alt={post.title[lang]}
                      className="w-full h-auto"
                      loading="eager"
                      fetchpriority="high"
                    />
                  </picture>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-12">
                {/*  Loading State */}
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 text-lg">
                      {lang === "es"
                        ? "Cargando contenido..."
                        : "Loading content..."}
                    </p>
                  </div>
                ) : (
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => navigate("/blog")}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  {lang === "es" ? "Volver al blog" : "Back to Blog"}
                </button>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default connect(
  (state) => ({ apiBlogList: state.blog.list, apiBlogDetail: state.blog.detail }),
  { fetchBlogs, fetchBlogDetail }
)(BlogDetail);
