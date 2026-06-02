import { connect } from "react-redux";
import { NavLink, Link, useLocation } from "react-router-dom";
import { logout } from '../../redux/actions/auth';
import logoNODE from "assets/images/node-blue.gif";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../common/LanguageSelector";
import ThemeSelector from "../common/ThemeSelector";

function Navbar({ isAuthenticated, user, logout }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar si estamos en la página principal
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`w-full py-2 top-0 transition-all duration-300 ease-in-out z-40 fixed ${
        (isScrolled || !isHomePage) ? "shadow-navbar bg-white/95 dark:bg-gray-900/95 backdrop-blur-md" : ""
      }`}
    >
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between md:px-14 px-2">
          <Link to="/" className="flex-shrink-0">
            <img className="w-[90px]" src={logoNODE} alt="Logo de Node" fetchpriority="high" />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/casos"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                (isScrolled || !isHomePage) ? "text-gray-900 dark:text-gray-100" : "text-node-text"
              }`}
            >
              {t('nav.cases')}
            </NavLink>
            <NavLink
              to="/servicios"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                (isScrolled || !isHomePage) ? "text-gray-900 dark:text-gray-100" : "text-node-text"
              }`}
            >
              {t('nav.services')}
            </NavLink>
            <NavLink
              to="/nosotros"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                (isScrolled || !isHomePage) ? "text-gray-900 dark:text-gray-100" : "text-node-text"
              }`}
            >
              {t('nav.about')}
            </NavLink>
            {<NavLink
              to="/blog"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                (isScrolled || !isHomePage) ? "text-gray-900 dark:text-gray-100" : "text-node-text"
              }`}
            >
              {t('nav.blog')}
            </NavLink>}
            <NavLink
              to="/contacto"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                (isScrolled || !isHomePage) ? "text-gray-900 dark:text-gray-100" : "text-node-text"
              }`}
            >
              {t('nav.contact')}
            </NavLink>
            
            {/* Language Selector */}
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                      (isScrolled || !isHomePage) ? "text-gray-900 dark:text-gray-100" : "text-node-text"
                  }`}
                >
                  {t('nav.login')}
                </NavLink>
                <NavLink
                  to="/registro"
                  className={`px-4 py-2 text-sm font-chakra font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out`}
                >
                  {t('nav.register')}
                </NavLink>
              </>
            ) : (
              <>
                {user?.is_superuser && (
                  <NavLink
                    to="/dashboard"
                    className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                        (isScrolled || !isHomePage) ? "text-gray-900 dark:text-gray-100" : "text-node-text"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                )}
                <button
                  onClick={logout}
                  className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                      (isScrolled || !isHomePage) ? "text-gray-900 dark:text-gray-100" : "text-node-text"
                  }`}
                >
                  {t('nav.logout', 'Logout')}
                </button>
              </>
            )}
            <div className="flex items-center space-x-2">
              <ThemeSelector variant={isHomePage && !isScrolled ? "home" : "navbar"} />
              <LanguageSelector variant={isHomePage && !isScrolled ? "home" : "navbar"} />
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                 (isScrolled || !isHomePage) ? "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800" : "text-node-text hover:bg-white/10"
              }`}
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
              <NavLink
                to="/casos"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-gray-900 dark:text-gray-100 hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.cases')}
              </NavLink>
              <NavLink
                to="/servicios"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-gray-900 dark:text-gray-100 hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.services')}
              </NavLink>
              <NavLink
                to="/nosotros"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-gray-900 dark:text-gray-100 hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </NavLink>
              <NavLink
                to="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-gray-900 dark:text-gray-100 hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.blog')}
              </NavLink>
              <NavLink
                to="/contacto"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-gray-900 dark:text-gray-100 hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </NavLink>
              {!isAuthenticated ? (
                <>
                  <NavLink
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </NavLink>
                  <NavLink
                    to="/registro"
                    className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md mx-3 my-2 text-center transition duration-150"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150"
                >
                  {t('nav.logout', 'Logout')}
                </button>
              )}
              {/* Language Selector Mobile */}
              <div className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <ThemeSelector variant="mobile" />
                  <LanguageSelector variant="mobile" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
