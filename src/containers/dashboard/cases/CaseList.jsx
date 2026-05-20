import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCases, deleteCase } from '../../../redux/actions/cases';

const CaseList = ({ list, loading, fetchCases, deleteCase }) => {
  useEffect(() => { fetchCases(); }, [fetchCases]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`¿Eliminar "${title}"?`)) return;
    await deleteCase(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Casos de Éxito</h2>
        <Link
          to="/dashboard/casos/nuevo"
          className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700"
        >
          + Nuevo caso
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
        </div>
      ) : list.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No hay casos aún.</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Título</th>
                <th className="px-6 py-3 text-left">Cliente</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{c.title}</td>
                  <td className="px-6 py-4 text-gray-500">{c.client || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      c.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {c.is_published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(c.created_at).toLocaleDateString('es')}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      to={`/dashboard/casos/${c.id}/editar`}
                      className="text-violet-600 hover:text-violet-800 font-medium"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(c.id, c.title)}
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
  list: state.cases.list,
  loading: state.cases.loading,
});

export default connect(mapStateToProps, { fetchCases, deleteCase })(CaseList);
