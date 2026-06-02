import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/navigation/Navbar';
import Footer from '../../components/navigation/Footer';

const Register = ({ isAuthenticated }) => {
  const { t } = useTranslation();

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-chakra">
              {t('auth.register.title')}
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-amber-800">
              <span className="text-lg" role="img" aria-label={t('auth.register.underConstructionAria')}>
                🚧
              </span>
              <span className="text-sm font-medium">{t('auth.register.underConstruction')}</span>
            </div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-600">
              {t('auth.register.temporarilyUnavailable')}
            </p>
            <Link
              to="/login"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {t('auth.register.signInLink')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Register);