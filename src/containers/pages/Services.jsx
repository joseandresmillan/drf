import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"
import ServiceGrid from "components/services/ServiceGrid";
import Layout from "hocs/layouts/Layout" /*Esqueleto de la pagina*/

function Services(){
    return(
        <Layout> 
            <Navbar/>
            <ServiceGrid/>
            <Footer/>
        </Layout> 
    );
}
export default Services