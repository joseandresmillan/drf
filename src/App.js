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
import SuperuserRoute from "components/auth/SuperuserRoute";
import DashboardLayout from "components/dashboard/DashboardLayout";
import DashboardHome from "containers/dashboard/DashboardHome";
import BlogList from "containers/dashboard/blog/BlogList";
import BlogForm from "containers/dashboard/blog/BlogForm";
import CategoryList from "containers/dashboard/categories/CategoryList";
import CategoryForm from "containers/dashboard/categories/CategoryForm";
import ServiceList from "containers/dashboard/services/ServiceList";
import ServiceForm from "containers/dashboard/services/ServiceForm";
import ServiceCategoryList from "containers/dashboard/services/categories/ServiceCategoryList";
import ServiceCategoryForm from "containers/dashboard/services/categories/ServiceCategoryForm";
import CaseList from "containers/dashboard/cases/CaseList";
import CaseForm from "containers/dashboard/cases/CaseForm";
import ContactList from "containers/dashboard/contacts/ContactList";
import UserList from "containers/dashboard/users/UserList";
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

          {/* Dashboard — solo superusuarios */}
          <Route path="/dashboard" element={
            <SuperuserRoute>
              <DashboardLayout />
            </SuperuserRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/nuevo" element={<BlogForm />} />
            <Route path="blog/:id/editar" element={<BlogForm />} />
            <Route path="blog/categorias" element={<CategoryList />} />
            <Route path="blog/categorias/nueva" element={<CategoryForm />} />
            <Route path="blog/categorias/:id/editar" element={<CategoryForm />} />
            <Route path="servicios" element={<ServiceList />} />
            <Route path="servicios/nuevo" element={<ServiceForm />} />
            <Route path="servicios/:id/editar" element={<ServiceForm />} />
            <Route path="servicios/categorias" element={<ServiceCategoryList />} />
            <Route path="servicios/categorias/nueva" element={<ServiceCategoryForm />} />
            <Route path="servicios/categorias/:id/editar" element={<ServiceCategoryForm />} />
            <Route path="casos" element={<CaseList />} />
            <Route path="casos/nuevo" element={<CaseForm />} />
            <Route path="casos/:id/editar" element={<CaseForm />} />
            <Route path="contactos" element={<ContactList />} />
            <Route path="usuarios" element={<UserList />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
