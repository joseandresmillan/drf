import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import AboutSection from "components/about/AboutPage"; // Asegúrate de que la ruta sea correcta

function About() {
    return (
        <Layout> 
            <Navbar />
            <AboutSection />
            <Footer />
        </Layout> 
    );
}

export default About;