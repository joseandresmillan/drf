import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createServiceCategory,
  updateServiceCategory,
  fetchServiceCategories,
} from '../../../../redux/actions/serviceCategories';

const ServiceCategoryForm = ({
  createServiceCategory,
  updateServiceCategory,
  fetchServiceCategories,
  categories,
  loading,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ name: '', name_en: '', description: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && categories.length === 0) fetchServiceCategories();
  }, [isEdit, categories.length, fetchServiceCategories]);

  useEffect(() => {
    if (isEdit && categories.length > 0) {
      const cat = categories.find((c) => String(c.id) === String(id));
      if (cat) {
        setForm({
          name: cat.name,
          name_en: cat.name_en || '',
          description: cat.description || '',
        });
      }
    }
  }, [categories, id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const result = isEdit
      ? await updateServiceCategory(id, form)
      : await createServiceCategory(form);
    setSaving(false);

    if (result.success) {
      navigate('/dashboard/servicios/categorias');
    } else {
      setErrors(result.errors || {});
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/dashboard/servicios/categorias')}
          className="text-gray-500 hover:text-gray-700"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Editar Categoría de Servicio' : 'Nueva Categoría de Servicio'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre (ES) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ej: Inteligencia Artificial"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
          <input
            type="text"
            name="name_en"
            value={form.name_en}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ex: Artificial Intelligence"
          />
          {errors.name_en && <p className="text-red-500 text-xs mt-1">{errors.name_en}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Descripción opcional de la categoría..."
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || loading}
            className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 font-medium"
          >
            {saving ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear Categoría'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/servicios/categorias')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  (state) => ({ categories: state.serviceCategories.list, loading: state.serviceCategories.loading }),
  { createServiceCategory, updateServiceCategory, fetchServiceCategories }
)(ServiceCategoryForm);
