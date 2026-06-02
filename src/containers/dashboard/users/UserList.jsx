import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAdminUsers, updateAdminUser } from '../../../redux/actions/adminUsers';

const UserList = ({ list, loading, fetchAdminUsers, updateAdminUser }) => {
  useEffect(() => { fetchAdminUsers(); }, [fetchAdminUsers]);

  const toggleField = async (user, field) => {
    await updateAdminUser(user.id, { [field]: !user[field] });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Usuarios</h2>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Usuario</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Registro</th>
                <th className="px-6 py-3 text-center">Activo</th>
                <th className="px-6 py-3 text-center">Staff</th>
                <th className="px-6 py-3 text-center">Superusuario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{u.username}</td>
                  <td className="px-6 py-4 text-gray-500">{u.email || '—'}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(u.date_joined).toLocaleDateString('es')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Toggle
                      active={u.is_active}
                      disabled={u.is_superuser}
                      onClick={() => !u.is_superuser && toggleField(u, 'is_active')}
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Toggle
                      active={u.is_staff}
                      disabled={u.is_superuser}
                      onClick={() => !u.is_superuser && toggleField(u, 'is_staff')}
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    {u.is_superuser ? (
                      <span className="text-xs text-indigo-600 font-semibold">✓ Super</span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
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

const Toggle = ({ active, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-5 rounded-full transition-colors focus:outline-none ${
      disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
    } ${active ? 'bg-green-500' : 'bg-gray-300'}`}
    title={disabled ? 'No se puede modificar un superusuario' : undefined}
  >
    <span
      className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform mx-0.5 ${
        active ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

const mapStateToProps = (state) => ({
  list: state.adminUsers.list,
  loading: state.adminUsers.loading,
});

export default connect(mapStateToProps, { fetchAdminUsers, updateAdminUser })(UserList);
