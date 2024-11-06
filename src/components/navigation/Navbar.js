import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logoNODE from 'assets/img/node-blue.gif';
import { useState } from "react";
import  PuffLoader  from "react-spinners/PuffLoader";


function Navbar(){

    const [loading,setLoading] = useState(true)

    window.onscroll = function() {scrollFunction()}

    function scrollFunction() {
        if(document.getElementById('navbar')){
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                document.getElementById('navbar').classList.add('shadow-navbar');
                document.getElementById('navbar').classList.add('bg-white');
            }else{
                document.getElementById('navbar').classList.remove('shadow-navbar');
                document.getElementById('navbar').classList.remove('bg-white');
            }
        }
    }
    
    return (
        <nav id="navbar" className="w-full py-2 top-0 transition duration-300 ease-in-out z-40 fixed">
            <div className="px-4 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2">
                <Link to = '/' className="ml-4 mt-2">
                <img
                className="" 
                width={110}
                height={100}
                src={logoNODE}/>
                </Link>
                <div className="ml-4 mt-2 flex-shrink-0">
                <NavLink to = '/casos' className="text-lg inline-flex font-sora leading-6 text-node-text transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4">Casos de Estudio</NavLink>
                <NavLink to = '/servicios' className="text-lg inline-flex font-sora leading-6 text-node-text transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4">Servicios</NavLink>
                <NavLink to = '/nosotros' className="text-lg inline-flex font-sora leading-6 text-node-text transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4">Nosotros</NavLink>
                <NavLink to = '/blog' className="text-lg inline-flex font-sora leading-6 text-node-text transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4">Blog</NavLink>
                <NavLink to = '/contacto' className="text-lg inline-flex font-sora leading-6 text-node-text transition duration-300 ease-in-out hover:underline hover:underline-blue-button mx-4">Contacto</NavLink>
                <Link to="/contacto"
                    type="button"
                    className="ml-10 inline-flex items-center rounded-md border border-transparent bg-blue-button px-4 py-2 text-base font-bold text-white shadow-sm transition duration-300 ease-in-out hover:bg-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Solicita nuestros servicios
                    <PuffLoader className="ml-3 -mr-1 h-5 w-5" loading={loading} size={30} color='#E5F620' />
                </Link>
                </div>
            </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{}) (Navbar)