import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"
import Layout from "hocs/layouts/Layout" /*Esqueleto de la pagina*/

function About(){
    return(
        <Layout> 
            <Navbar/>
            <h1>About</h1>
            <Footer/>
        </Layout> 
    );
}
export default About