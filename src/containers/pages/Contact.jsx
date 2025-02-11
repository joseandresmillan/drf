import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout"; /*Esqueleto de la pagina*/
import ContactForm from "components/contact/ContactForm";

function Contact() {
  return (
    <Layout>
      <Navbar />
      <div className="container mx-auto px-6 lg:px-20 mt-32">
        <h1 className="text-3xl font-semibold text-center mb-8">Contact Us</h1>
        <ContactForm />
      </div>
      <Footer />
    </Layout>
  );
}

export default Contact;