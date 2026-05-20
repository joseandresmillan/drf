import store from "./store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { checkAuthenticated, load_user } from "./redux/actions/auth";
import Error404 from "containers/errors/Error404";
import Home from "containers/pages/Home";
import Cases from "containers/pages/Cases";
import Services from "containers/pages/Services";
import About from "containers/pages/About";
import Blog from "containers/pages/Blog";
import BlogDetail from "components/blog/BlogDetail";
import Contact from "containers/pages/Contact";
import ApodPage from "containers/pages/ApodPage";
import Muelles from "containers/pages/cases/Muelles";
import Plagas from "containers/pages/cases/Plagas";
import Conteo from "containers/pages/cases/Conteo";
import Login from "containers/auth/Login";
import Register from "containers/auth/Register";
import Profile from "containers/auth/Profile";
import PrivateRoute from "components/auth/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; /*Responsable de todas las rutas */
function App() {
  useEffect(() => {
    store.dispatch(checkAuthenticated());
    store.dispatch(load_user());
  }, []);

  return (
    <Provider store={store}>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/casos" element={<Cases />} />
          <Route path="/casos/muelles" element={<Muelles />} />
          <Route path="/casos/plagas" element={<Plagas />} />
          <Route path="/casos/conteo" element={<Conteo />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/apod" element={<ApodPage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/perfil" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
