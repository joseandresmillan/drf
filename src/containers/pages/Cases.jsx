import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"
import Layout from "hocs/layouts/Layout" /*Esqueleto de la pagina*/
import UseCases from "components/home/UseCases";
import TechStack from "components/home/TechStack";


function Cases(){
    return(
        <Layout> 
            <Navbar/>
            <UseCases/>
            <TechStack/>
            <Footer/>
        </Layout> 
    );
}
export default Cases