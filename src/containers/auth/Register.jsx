import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { signup } from '../../redux/actions/auth';
import Navbar from '../../components/navigation/Navbar';
import Footer from '../../components/navigation/Footer';

const Register = ({ signup, isAuthenticated }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = t('auth.validation.required');
    }

    if (!email) {
      newErrors.email = t('auth.validation.required');
    } else if (!/\\S+@\\S+\\.\\S+/.test(email)) {
      newErrors.email = t('auth.validation.invalidEmail');
    }

    if (!password) {
      newErrors.password = t('auth.validation.required');
    } else if (password.length < 8) {
      newErrors.password = t('auth.validation.minLength', { count: 8 });
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.register.passwordMismatch');
    }

    return newErrors;
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await signup(name, email, password, confirmPassword);
      setAccountCreated(true);
    } catch (err) {
      setErrors({ form: t('auth.register.error') });
    } finally {
      setLoading(false);
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Redirect to login after successful registration
  if (accountCreated) {
    return <Navigate to="/login" />;
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
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="rounded-md shadow-sm space-y-3">
              <div>
                <label htmlFor="name" className="sr-only">
                  {t('auth.register.name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder={t('auth.register.namePlaceholder')}
                  value={name}
                  onChange={onChange}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  {t('auth.register.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder={t('auth.register.emailPlaceholder')}
                  value={email}
                  onChange={onChange}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  {t('auth.register.password')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder={t('auth.register.passwordPlaceholder')}
                  value={password}
                  onChange={onChange}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  {t('auth.register.confirmPassword')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder={t('auth.register.confirmPasswordPlaceholder')}
                  value={confirmPassword}
                  onChange={onChange}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {errors.form && (
              <div className="text-red-600 text-sm text-center">{errors.form}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {loading ? '...' : t('auth.register.submit')}
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">{t('auth.register.hasAccount')}</span>{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t('auth.register.signInLink')}
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Register);