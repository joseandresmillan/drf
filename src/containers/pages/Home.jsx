import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"
import Layout from "hocs/layouts/Layout" /*Esqueleto de la pagina*/
import Header from "components/home/Header";

function Home(){
    return(
        <Layout> 
            <Navbar/>
            <div>
                <Header/>
            </div>
            <Footer/>
        </Layout> 
    );
}
export default Home