import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"
import Layout from "hocs/layouts/Layout" /*Esqueleto de la pagina*/

function Home(){
    return(
        <Layout> 
            <Navbar/>
            <h1>Home</h1>
            <Footer/>
        </Layout> 
    );
}
export default Home