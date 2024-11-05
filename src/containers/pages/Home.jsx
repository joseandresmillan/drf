import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"
import Layout from "hocs/layouts/Layout" /*Esqueleto de la pagina*/
import Header from "components/home/Header";
import Incentives from "components/home/Incentives";
import UseCases from "components/home/UseCases";

function Home(){
    return(
        <Layout> 
            <Navbar/>
            <div>
                <Header/>
                <Incentives/>
                <UseCases/>
            </div>
            <Footer/>
        </Layout> 
    );
}
export default Home