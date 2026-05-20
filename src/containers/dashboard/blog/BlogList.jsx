import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, deleteBlog } from '../../../redux/actions/blog';

const BlogList = ({ list, loading, fetchBlogs, deleteBlog }) => {
  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`¿Eliminar "${title}"?`)) return;
    await deleteBlog(id);
  };

  return (
    <div>
      {/* Cabecera con pestañas */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <Link
            to="/dashboard/blog"
            className="px-4 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 shadow-sm"
          >
            📝 Artículos
          </Link>
          <Link
            to="/dashboard/blog/categorias"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            🏷️ Categorías
          </Link>
        </div>

        <Link
          to="/dashboard/blog/nuevo"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          + Nuevo artículo
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
      ) : list.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No hay artículos aún.</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Título</th>
                <th className="px-6 py-3 text-left">Autor</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 text-gray-500">{post.author_name || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {post.is_published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('es')}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      to={`/dashboard/blog/${post.id}/editar`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="text-red-500 hover:text-red-700 font-medium"
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

const mapStateToProps = (state) => ({
  list: state.blog.list,
  loading: state.blog.loading,
});

export default connect(mapStateToProps, { fetchBlogs, deleteBlog })(BlogList);
