import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from '../../redux/actions/auth';
import Navbar from '../../components/navigation/Navbar';
import Footer from '../../components/navigation/Footer';

const Profile = ({ user, isAuthenticated, logout }) => {
  const { t } = useTranslation();
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    logout();
    setLoggedOut(true);
  };

  if (loggedOut || isAuthenticated === false) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-md w-full">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                <span className="text-3xl font-bold text-blue-700">
                  {user?.username?.charAt(0).toUpperCase() || '?'}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white font-chakra">
                {t('auth.profile.welcome')}, {user?.username}
              </h1>
            </div>

            {/* Info */}
            <div className="px-6 py-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {t('auth.profile.username')}
                </p>
                <p className="text-gray-800 font-medium">{user?.username || '—'}</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {t('auth.profile.email')}
                </p>
                <p className="text-gray-800 font-medium">
                  {user?.email ? user.email : (
                    <span className="text-gray-400 italic text-sm">{t('auth.profile.noEmail')}</span>
                  )}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  {t('auth.profile.logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Profile);
