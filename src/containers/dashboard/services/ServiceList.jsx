import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchServices, deleteService } from '../../../redux/actions/services';

const ServiceList = ({ list, loading, fetchServices, deleteService }) => {
  useEffect(() => { fetchServices(); }, [fetchServices]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar "${name}"?`)) return;
    await deleteService(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <Link
            to="/dashboard/servicios"
            className="px-4 py-2 rounded-md text-sm font-medium bg-white text-emerald-600 shadow-sm"
          >
            ⚙️ Servicios
          </Link>
          <Link
            to="/dashboard/servicios/categorias"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            🏷️ Categorías
          </Link>
        </div>
        <Link
          to="/dashboard/servicios/nuevo"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700"
        >
          + Nuevo servicio
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
        </div>
      ) : list.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No hay servicios aún.</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Precio</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-left">Orden</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((svc) => (
                <tr key={svc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{svc.name}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {svc.price ? `$${svc.price}` : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      svc.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {svc.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{svc.order}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      to={`/dashboard/servicios/${svc.id}/editar`}
                      className="text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(svc.id, svc.name)}
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
  list: state.services.list,
  loading: state.services.loading,
});

export default connect(mapStateToProps, { fetchServices, deleteService })(ServiceList);
