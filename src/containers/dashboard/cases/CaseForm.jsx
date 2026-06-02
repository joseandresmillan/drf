import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createCase, updateCase, fetchCaseDetail } from '../../../redux/actions/cases';

const CaseForm = ({ createCase, updateCase, fetchCaseDetail, detail }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '', description: '', client: '', technologies: '', is_published: false,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) fetchCaseDetail(id);
  }, [id, isEdit, fetchCaseDetail]);

  useEffect(() => {
    if (isEdit && detail && String(detail.id) === String(id)) {
      setForm({
        title: detail.title || '',
        description: detail.description || '',
        client: detail.client || '',
        technologies: detail.technologies || '',
        is_published: detail.is_published || false,
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
    const result = isEdit ? await updateCase(id, form) : await createCase(form);
    setSaving(false);
    if (result.success) {
      navigate('/dashboard/casos');
    } else {
      setErrors(result.errors || {});
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? 'Editar caso' : 'Nuevo caso de éxito'}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
          <input
            name="title" value={form.title} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <input
            name="client" value={form.client} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
          <textarea
            name="description" value={form.description} onChange={handleChange} required rows={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tecnologías <span className="text-gray-400 font-normal">(separadas por coma)</span>
          </label>
          <input
            name="technologies" value={form.technologies} onChange={handleChange}
            placeholder="React, Django, PostgreSQL"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="is_published" type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange}
            className="h-4 w-4 text-violet-600 rounded"
          />
          <label htmlFor="is_published" className="text-sm text-gray-700">Publicar</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit" disabled={saving}
            className="bg-violet-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button" onClick={() => navigate('/dashboard/casos')}
            className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({ detail: state.cases.detail });
export default connect(mapStateToProps, { createCase, updateCase, fetchCaseDetail })(CaseForm);
