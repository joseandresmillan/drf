import store from "./store";
import { Provider } from "react-redux";
import Error404 from "containers/errors/Error404";
import Home from "containers/pages/Home";
import Cases from "containers/pages/Cases";
import Services from "containers/pages/Services";
import About from "containers/pages/About";
import Blog from "containers/pages/Blog";
import Contact from "containers/pages/Contact";
import ApodPage from "containers/pages/ApodPage";
import Muelles from "containers/pages/cases/Muelles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; /*Responsable de todas las rutas */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/casos" element={<Cases />} />
          <Route path="/caso-muelles" element={<Muelles />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/apod" element={<ApodPage />} /> 
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
