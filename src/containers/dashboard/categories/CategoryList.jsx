import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories, deleteCategory } from '../../../redux/actions/categories';

const CategoryList = ({ categories, loading, fetchCategories, deleteCategory }) => {
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar la categoría "${name}"?`)) return;
    await deleteCategory(id);
  };

  return (
    <div>
      {/* Cabecera con pestañas */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <Link
            to="/dashboard/blog"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            📝 Artículos
          </Link>
          <Link
            to="/dashboard/blog/categorias"
            className="px-4 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 shadow-sm"
          >
            🏷️ Categorías
          </Link>
        </div>

        <Link
          to="/dashboard/blog/categorias/nueva"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          + Nueva categoría
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Cargando...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-lg">No hay categorías creadas aún.</p>
          <Link to="/dashboard/blog/categorias/nueva" className="text-indigo-600 hover:underline mt-2 inline-block">
            Crear la primera
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts publicados</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm font-mono">{cat.slug}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {cat.post_count} posts
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                    {cat.description || <span className="italic text-gray-300">Sin descripción</span>}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      to={`/dashboard/blog/categorias/${cat.id}/editar`}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
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
  (state) => ({ categories: state.categories.list, loading: state.categories.loading }),
  { fetchCategories, deleteCategory }
)(CategoryList);
