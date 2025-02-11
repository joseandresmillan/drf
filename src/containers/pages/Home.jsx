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
            "Computer Vision",
            "Industria 4.0",
          ]}
          links={[
            { label: "Transformación Digital", path: "/servicios" },
            { label: "Computer Vision", path: "/servicios"},
            { label: "Industria 4.0", path: "/servicios" },
            
            
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
