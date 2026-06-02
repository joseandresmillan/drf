import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createService, updateService, fetchServiceDetail } from '../../../redux/actions/services';
import { fetchServiceCategories, createServiceCategory } from '../../../redux/actions/serviceCategories';

const ServiceForm = ({
  createService,
  updateService,
  fetchServiceDetail,
  fetchServiceCategories,
  createServiceCategory,
  detail,
  categories,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    name_en: '',
    description: '',
    description_en: '',
    category: '',
    icon_name: '',
    price: '',
    is_active: true,
    is_popular: false,
    order: 0,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState('es');

  const [showNewCat, setShowNewCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatSaving, setNewCatSaving] = useState(false);
  const [newCatError, setNewCatError] = useState('');

  useEffect(() => {
    if (isEdit) fetchServiceDetail(id);
    fetchServiceCategories();
  }, [id, isEdit, fetchServiceDetail, fetchServiceCategories]);

  useEffect(() => {
    if (isEdit && detail && String(detail.id) === String(id)) {
      setForm({
        name: detail.name || '',
        name_en: detail.name_en || '',
        description: detail.description || '',
        description_en: detail.description_en || '',
        category: detail.category || '',
        icon_name: detail.icon_name || '',
        price: detail.price || '',
        is_active: detail.is_active ?? true,
        is_popular: detail.is_popular ?? false,
        order: detail.order ?? 0,
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
    const payload = {
      ...form,
      category: form.category || null,
      price: form.price === '' ? null : form.price,
    };
    const result = isEdit
      ? await updateService(id, payload)
      : await createService(payload);
    setSaving(false);
    if (result.success) {
      navigate('/dashboard/servicios');
    } else {
      setErrors(result.errors || {});
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setNewCatSaving(true);
    setNewCatError('');
    const result = await createServiceCategory({
      name: newCatName.trim(),
      name_en: newCatNameEn.trim(),
    });
    setNewCatSaving(false);

    if (result.success) {
      setForm((prev) => ({ ...prev, category: result.data.id }));
      setNewCatName('');
      setNewCatNameEn('');
      setShowNewCat(false);
    } else {
      setNewCatError(result.errors?.name || result.errors?.detail || 'Error al crear categoría');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? 'Editar servicio' : 'Nuevo servicio'}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-5">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveLang('es')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeLang === 'es'
                ? 'border-emerald-600 text-emerald-600'
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
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🇬🇧 English
            {!form.name_en && !form.description_en && (
              <span className="ml-1.5 text-xs text-amber-500 font-normal">(sin traducción)</span>
            )}
          </button>
        </div>

        {activeLang === 'es' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
              <span className="ml-1 text-xs text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              name="name_en"
              value={form.name_en}
              onChange={handleChange}
              placeholder={form.name}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.name_en && <p className="text-red-500 text-xs mt-1">{errors.name_en}</p>}
          </div>
        )}

        {activeLang === 'es' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description_en"
              value={form.description_en}
              onChange={handleChange}
              rows={4}
              placeholder={form.description}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.description_en && <p className="text-red-500 text-xs mt-1">{errors.description_en}</p>}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <button
              type="button"
              onClick={() => {
                setShowNewCat(!showNewCat);
                setNewCatName('');
                setNewCatNameEn('');
                setNewCatError('');
              }}
              className="text-xs text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1"
            >
              {showNewCat ? '✕ Cancelar' : '+ Nueva categoría'}
            </button>
          </div>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">— Sin categoría —</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {showNewCat && (
            <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-xs font-medium text-emerald-700 mb-2">Nueva categoría</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Nombre (ES)"
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
                <input
                  type="text"
                  value={newCatNameEn}
                  onChange={(e) => setNewCatNameEn(e.target.value)}
                  placeholder="Name (EN)"
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={newCatSaving || !newCatName.trim()}
                  className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                >
                  {newCatSaving ? '...' : 'Crear'}
                </button>
              </div>
              {newCatError && <p className="text-red-500 text-xs mt-1">{newCatError}</p>}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icono (nombre)</label>
            <input
              name="icon_name" value={form.icon_name} onChange={handleChange}
              placeholder="FaCode"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (USD)</label>
            <input
              name="price" type="number" step="0.01" value={form.price} onChange={handleChange}
              placeholder="Opcional"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
            <input
              name="order" type="number" value={form.order} onChange={handleChange} min={0}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input
              id="is_active" type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange}
              className="h-4 w-4 text-emerald-600 rounded"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">Activo</label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="is_popular"
            type="checkbox"
            name="is_popular"
            checked={form.is_popular}
            onChange={handleChange}
            className="h-4 w-4 text-emerald-600 rounded"
          />
          <label htmlFor="is_popular" className="text-sm text-gray-700">Marcar como servicio popular</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit" disabled={saving}
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button" onClick={() => navigate('/dashboard/servicios')}
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
  detail: state.services.detail,
  categories: state.serviceCategories.list,
});

export default connect(mapStateToProps, {
  createService,
  updateService,
  fetchServiceDetail,
  fetchServiceCategories,
  createServiceCategory,
})(ServiceForm);
