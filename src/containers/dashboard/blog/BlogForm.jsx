import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, updateBlog, fetchBlogDetail } from '../../../redux/actions/blog';
import { fetchCategories, createCategory } from '../../../redux/actions/categories';

const BlogForm = ({ createBlog, updateBlog, fetchBlogDetail, fetchCategories, createCategory, detail, loading, categoriesList }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '', content: '', excerpt: '',
    title_en: '', content_en: '', excerpt_en: '',
    category: '', is_published: false, read_time: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState('es');

  // Estado del mini-panel de nueva categoría
  const [showNewCat, setShowNewCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSaving, setNewCatSaving] = useState(false);
  const [newCatError, setNewCatError] = useState('');

  useEffect(() => {
    if (isEdit) fetchBlogDetail(id);
    fetchCategories();
  }, [id, isEdit, fetchBlogDetail, fetchCategories]);

  useEffect(() => {
    if (isEdit && detail && String(detail.id) === String(id)) {
      setForm({
        title: detail.title || '',
        content: detail.content || '',
        excerpt: detail.excerpt || '',
        title_en: detail.title_en || '',
        content_en: detail.content_en || '',
        excerpt_en: detail.excerpt_en || '',
        category: detail.category || '',
        is_published: detail.is_published || false,
        read_time: detail.read_time || '',
      });
    }
  }, [detail, id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const result = isEdit
      ? await updateBlog(id, form)
      : await createBlog(form);
    setSaving(false);
    if (result.success) {
      navigate('/dashboard/blog');
    } else {
      setErrors(result.errors || {});
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setNewCatSaving(true);
    setNewCatError('');
    const result = await createCategory({ name: newCatName.trim() });
    setNewCatSaving(false);
    if (result.success) {
      // Seleccionar automáticamente la categoría recién creada
      setForm((prev) => ({ ...prev, category: result.data.id }));
      setNewCatName('');
      setShowNewCat(false);
    } else {
      setNewCatError(result.errors?.name || result.errors?.detail || 'Error al crear categoría');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? 'Editar artículo' : 'Nuevo artículo'}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-5">

        {/* Language tabs */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveLang('es')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeLang === 'es'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🇪🇸 Español
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeLang === 'en'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🇬🇧 English
            {!form.title_en && !form.content_en && (
              <span className="ml-1.5 text-xs text-amber-500 font-normal">(sin traducción)</span>
            )}
          </button>
        </div>

        {/* Título */}
        {activeLang === 'es' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
              <span className="ml-1 text-xs text-gray-400 font-normal">(opcional — se mostrará el español si está vacío)</span>
            </label>
            <input
              name="title_en"
              value={form.title_en}
              onChange={handleChange}
              placeholder={form.title}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Extracto */}
        {activeLang === 'es' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extracto</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt
              <span className="ml-1 text-xs text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              name="excerpt_en"
              value={form.excerpt_en}
              onChange={handleChange}
              rows={2}
              placeholder={form.excerpt}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Contenido */}
        {activeLang === 'es' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={10}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
              <span className="ml-1 text-xs text-gray-400 font-normal">(optional — HTML supported)</span>
            </label>
            <textarea
              name="content_en"
              value={form.content_en}
              onChange={handleChange}
              rows={10}
              placeholder="English version of the content (HTML)..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Categoría con creación inline */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <button
              type="button"
              onClick={() => { setShowNewCat(!showNewCat); setNewCatName(''); setNewCatError(''); }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              {showNewCat ? '✕ Cancelar' : '+ Nueva categoría'}
            </button>
          </div>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">— Sin categoría —</option>
            {categoriesList.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* Panel inline para crear nueva categoría */}
          {showNewCat && (
            <div className="mt-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <p className="text-xs font-medium text-indigo-700 mb-2">Nueva categoría</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Nombre de la categoría"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={newCatSaving || !newCatName.trim()}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 whitespace-nowrap"
                >
                  {newCatSaving ? '...' : 'Crear'}
                </button>
              </div>
              {newCatError && <p className="text-red-500 text-xs mt-1">{newCatError}</p>}
            </div>
          )}
        </div>

        {/* Tiempo de lectura + Publicar */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <label htmlFor="read_time" className="text-sm font-medium text-gray-700 whitespace-nowrap">⏱️ Tiempo de lectura</label>
            <input
              id="read_time"
              type="number"
              name="read_time"
              value={form.read_time}
              onChange={handleChange}
              min="1"
              max="999"
              placeholder="Auto"
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-500">min</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="is_published"
              type="checkbox"
              name="is_published"
              checked={form.is_published}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 rounded"
            />
            <label htmlFor="is_published" className="text-sm text-gray-700">Publicar</label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/blog')}
            className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  detail: state.blog.detail,
  loading: state.blog.loading,
  categoriesList: state.categories.list,
});

export default connect(mapStateToProps, { createBlog, updateBlog, fetchBlogDetail, fetchCategories, createCategory })(BlogForm);
