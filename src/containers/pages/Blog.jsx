import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"
import Layout from "hocs/layouts/Layout" /*Esqueleto de la pagina*/
import BlogPage from "components/blog/BlogPage";

function Blog(){
    return(
        <Layout> 
            <Navbar/>
            <BlogPage/>
            <Footer/>
        </Layout> 
    );
}
export default Blog