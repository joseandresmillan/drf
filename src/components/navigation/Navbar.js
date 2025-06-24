import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logoNODE from "assets/images/node-blue.gif";
import { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";

function Navbar() {
  const [loading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false); // Nuevo estado para controlar el scroll

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
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2">
          <Link to="/" className="ml-4 mt-2">
            <img className="" width={110} height={100} src={logoNODE} alt="Logo de Node" />
          </Link>
          <div className="ml-4 mt-2 flex-shrink-0">
            <NavLink
              to="/casos"
              className={`text-lg inline-flex font-sora leading-6 transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4 ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              Casos de Estudio
            </NavLink>
            <NavLink
              to="/servicios"
              className={`text-lg inline-flex font-sora leading-6 transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4 ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              Servicios
            </NavLink>
            <NavLink
              to="/nosotros"
              className={`text-lg inline-flex font-sora leading-6 transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4 ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              Nosotros
            </NavLink>
            <NavLink
              to="/blog"
              className={`text-lg inline-flex font-sora leading-6 transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4 ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              Blog
            </NavLink>
            <NavLink
              to="/contacto"
              className={`text-lg inline-flex font-sora leading-6 transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4 ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              Contacto
            </NavLink>
            <NavLink
              to="/pixelation-test"
              className={`text-lg inline-flex font-sora leading-6 transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4 ${
                isScrolled ? "text-blue-button" : "text-node-text"
              }`}
            >
              Pixelation Test
            </NavLink>
            <Link
              to="/contacto"
              type="button"
              className="ml-10 inline-flex items-center rounded-md border border-transparent bg-blue-button px-4 py-2 text-base font-sora text-white shadow-sm transition duration-300 ease-in-out hover:bg-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Solicita nuestros servicios
              <PuffLoader
                className="ml-3 -mr-1 h-5 w-5"
                loading={loading}
                size={30}
                color="#E5F620"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Navbar);
