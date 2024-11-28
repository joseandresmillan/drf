import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"
import Layout from "hocs/layouts/Layout" /*Esqueleto de la pagina*/
import UseCases from "components/home/UseCases";


function Cases(){
    return(
        <Layout> 
            <Navbar/>
            <UseCases/>
            <Footer/>
        </Layout> 
    );
}
export default Cases