import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

const navItems = [
  { to: '/dashboard', label: 'Inicio', icon: '🏠', end: true },
  { to: '/dashboard/blog', label: 'Blog', icon: '📝' },
  { to: '/dashboard/servicios', label: 'Servicios', icon: '⚙️' },
  { to: '/dashboard/casos', label: 'Casos', icon: '📁' },
  { to: '/dashboard/contactos', label: 'Contactos', icon: '✉️' },
  { to: '/dashboard/usuarios', label: 'Usuarios', icon: '👥' },
];

const DashboardLayout = ({ user, logout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-gray-900 text-white flex flex-col transition-all duration-300 flex-shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          {sidebarOpen && (
            <span className="text-lg font-bold text-indigo-400">Dashboard</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span className="text-lg flex-shrink-0">{icon}</span>
              {sidebarOpen && <span className="ml-3">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User info */}
        <div className="border-t border-gray-700 p-4">
          {sidebarOpen ? (
            <div>
              <p className="text-sm text-gray-300 truncate">{user?.username}</p>
              <p className="text-xs text-indigo-400">Superusuario</p>
              <button
                onClick={handleLogout}
                className="mt-2 text-xs text-gray-400 hover:text-red-400"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400"
              title="Cerrar sesión"
            >
              ⎋
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6 flex-shrink-0">
          <h1 className="text-gray-700 font-semibold text-lg">Panel de Administración</h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-500">Hola, {user?.username}</span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              {user?.username?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.auth.user });
export default connect(mapStateToProps, { logout })(DashboardLayout);
