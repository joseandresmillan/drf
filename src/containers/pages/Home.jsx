import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout"; /*Esqueleto de la pagina*/
import Header from "components/home/Header";
import Incentives from "components/home/Incentives";
import UseCases from "components/home/UseCases";

function Home() {
  // Cambia esto a false si quieres volver a la imagen estática
  const useThreeJS = true;

  return (
    <Layout>
      <Navbar />
      <div>
        <Header
          useThreeBackground={useThreeJS}
          showCameraControls={false}
          backgroundClass={useThreeJS ? "" : "bg-header-background"}
        />
        <Incentives />
        <UseCases />
      </div>
      <Footer />
    </Layout>
  );
}
export default Home;
