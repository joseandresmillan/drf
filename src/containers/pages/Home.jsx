import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout"; /*Esqueleto de la pagina*/
import Header from "components/home/Header";
import Incentives from "components/home/Incentives";
import UseCases from "components/home/UseCases";

function Home() {
  return (
    <Layout>
      <Navbar />
      <div>
        <Header
          words={[
            "Transformación Digital",
            "IoT",
            "Sistemas Embebidos",
            "Automatización de Hogares",
            "WEB3"
          ]}
          links={[
            { label: "Transformación Digital", path: "/servicios" },
            { label: "IoT", path: "/servicios" },
            { label: "Sistemas Embebidos", path: "/servicios" },
            { label: "Automatización de Hogares", path: "/servicios" },
            { label: "WEB3", path: "/servicios" },
          ]}
          backgroundClass="bg-header-background"
        />
        <Incentives />
        <UseCases />
      </div>
      <Footer />
    </Layout>
  );
}
export default Home;
