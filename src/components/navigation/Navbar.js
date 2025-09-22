import { connect } from "react-redux";
import { NavLink, Link, useLocation } from "react-router-dom";
import logoNODE from "assets/images/node-blue.gif";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../common/LanguageSelector";

function Navbar() {
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
      className={`w-full py-2 top-0 transition duration-300 ease-in-out z-40 fixed ${
        isScrolled ? "shadow-navbar bg-white" : ""
      }`}
    >
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between md:px-14 px-2">
          <Link to="/" className="flex-shrink-0">
            <img className="" width={90} height={80} src={logoNODE} alt="Logo de Node" />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/casos"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              {t('nav.cases')}
            </NavLink>
            <NavLink
              to="/servicios"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              {t('nav.services')}
            </NavLink>
            <NavLink
              to="/nosotros"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              {t('nav.about')}
            </NavLink>
            {/* <NavLink
              to="/blog"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              {t('nav.blog')}
            </NavLink> */}
            <NavLink
              to="/contacto"
              className={`text-lg font-chakra leading-6 transition duration-300 ease-in-out hover:underline-blue-button navbar-link ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              {t('nav.contact')}
            </NavLink>
            
            {/* Language Selector */}
            <LanguageSelector variant={isHomePage && !isScrolled ? "home" : "navbar"} />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                isScrolled ? "text-blue-button hover:bg-blue-button hover:text-white" : "text-node-text hover:bg-white hover:text-blue-button"
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg">
              <NavLink
                to="/casos"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-blue-button hover:bg-blue-button hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.cases')}
              </NavLink>
              <NavLink
                to="/servicios"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-blue-button hover:bg-blue-button hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.services')}
              </NavLink>
              <NavLink
                to="/nosotros"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-blue-button hover:bg-blue-button hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </NavLink>
              {/* <NavLink
                to="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-blue-button hover:bg-blue-button hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.blog')}
              </NavLink> */}
              <NavLink
                to="/contacto"
                className="block px-3 py-2 rounded-md text-base font-medium font-chakra text-blue-button hover:bg-blue-button hover:text-white transition-colors navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </NavLink>
              {/* Language Selector Mobile */}
              <div className="px-3 py-2">
                <LanguageSelector variant="mobile" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Navbar);
