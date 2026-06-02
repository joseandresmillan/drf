import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchServiceCategories, deleteServiceCategory } from '../../../../redux/actions/serviceCategories';

const ServiceCategoryList = ({ categories, loading, fetchServiceCategories, deleteServiceCategory }) => {
  useEffect(() => {
    fetchServiceCategories();
  }, [fetchServiceCategories]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar la categoría "${name}"?`)) return;
    await deleteServiceCategory(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <Link
            to="/dashboard/servicios"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            ⚙️ Servicios
          </Link>
          <Link
            to="/dashboard/servicios/categorias"
            className="px-4 py-2 rounded-md text-sm font-medium bg-white text-emerald-600 shadow-sm"
          >
            🏷️ Categorías
          </Link>
        </div>

        <Link
          to="/dashboard/servicios/categorias/nueva"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700"
        >
          + Nueva categoría
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Cargando...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-lg">No hay categorías creadas aún.</p>
          <Link to="/dashboard/servicios/categorias/nueva" className="text-emerald-600 hover:underline mt-2 inline-block">
            Crear la primera
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre (EN)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicios activos</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 text-gray-500">{cat.name_en || '—'}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm font-mono">{cat.slug}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-medium">
                      {cat.service_count} servicios
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      to={`/dashboard/servicios/categorias/${cat.id}/editar`}
                      className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => ({ categories: state.serviceCategories.list, loading: state.serviceCategories.loading }),
  { fetchServiceCategories, deleteServiceCategory }
)(ServiceCategoryList);
