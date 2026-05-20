import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../redux/actions/blog';
import { fetchServices } from '../../redux/actions/services';
import { fetchCases } from '../../redux/actions/cases';
import { fetchContacts } from '../../redux/actions/contacts';
import { fetchAdminUsers } from '../../redux/actions/adminUsers';

const StatCard = ({ label, count, to, icon, color }) => (
  <Link
    to={to}
    className={`block rounded-xl p-6 text-white shadow hover:shadow-lg transition-shadow ${color}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{label}</p>
        <p className="text-4xl font-bold mt-1">{count ?? '—'}</p>
      </div>
      <span className="text-4xl opacity-80">{icon}</span>
    </div>
  </Link>
);

const DashboardHome = ({
  fetchBlogs, fetchServices, fetchCases, fetchContacts, fetchAdminUsers,
  blogCount, servicesCount, casesCount, contactsCount, usersCount, newContacts,
}) => {
  useEffect(() => {
    fetchBlogs();
    fetchServices();
    fetchCases();
    fetchContacts();
    fetchAdminUsers();
  }, [fetchBlogs, fetchServices, fetchCases, fetchContacts, fetchAdminUsers]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Artículos de Blog" count={blogCount} to="/dashboard/blog" icon="📝" color="bg-indigo-500" />
        <StatCard label="Servicios" count={servicesCount} to="/dashboard/servicios" icon="⚙️" color="bg-emerald-500" />
        <StatCard label="Casos de Éxito" count={casesCount} to="/dashboard/casos" icon="📁" color="bg-violet-500" />
        <StatCard
          label={`Mensajes${newContacts > 0 ? ` (${newContacts} nuevos)` : ''}`}
          count={contactsCount}
          to="/dashboard/contactos"
          icon="✉️"
          color="bg-amber-500"
        />
        <StatCard label="Usuarios" count={usersCount} to="/dashboard/usuarios" icon="👥" color="bg-rose-500" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogCount: state.blog.list.length,
  servicesCount: state.services.list.length,
  casesCount: state.cases.list.length,
  contactsCount: state.contacts.list.length,
  newContacts: state.contacts.list.filter((c) => c.status === 'new').length,
  usersCount: state.adminUsers.list.length,
});

export default connect(mapStateToProps, {
  fetchBlogs, fetchServices, fetchCases, fetchContacts, fetchAdminUsers,
})(DashboardHome);
