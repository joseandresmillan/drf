import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"
import Layout from "hocs/layouts/Layout" /*Esqueleto de la pagina*/

function Services(){
    return(
        <Layout> 
            <Navbar/>
            <div>Services</div>
            <Footer/>
        </Layout> 
    );
}
export default Services