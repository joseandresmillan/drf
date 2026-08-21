import store from "./store";
import { Provider } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import { checkAuthenticated, load_user } from "./redux/actions/auth";
import Home from "containers/pages/Home";
import PrivateRoute from "components/auth/PrivateRoute";
import SuperuserRoute from "components/auth/SuperuserRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; /*Responsable de todas las rutas */
import { ThemeProvider } from "./context/ThemeContext";
import WhatsAppButton from "components/common/WhatsAppButton";

// Rutas no críticas para el primer render: se cargan bajo demanda
const Error404 = lazy(() => import("containers/errors/Error404"));
const Cases = lazy(() => import("containers/pages/Cases"));
const Services = lazy(() => import("containers/pages/Services"));
const About = lazy(() => import("containers/pages/About"));
const Blog = lazy(() => import("containers/pages/Blog"));
const BlogDetail = lazy(() => import("components/blog/BlogDetail"));
const Contact = lazy(() => import("containers/pages/Contact"));
const ApodPage = lazy(() => import("containers/pages/ApodPage"));
const Muelles = lazy(() => import("containers/pages/cases/Muelles"));
const Plagas = lazy(() => import("containers/pages/cases/Plagas"));
const Conteo = lazy(() => import("containers/pages/cases/Conteo"));
const Login = lazy(() => import("containers/auth/Login"));
const Register = lazy(() => import("containers/auth/Register"));
const Profile = lazy(() => import("containers/auth/Profile"));
const DashboardLayout = lazy(() => import("components/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("containers/dashboard/DashboardHome"));
const BlogList = lazy(() => import("containers/dashboard/blog/BlogList"));
const BlogForm = lazy(() => import("containers/dashboard/blog/BlogForm"));
const CategoryList = lazy(() => import("containers/dashboard/categories/CategoryList"));
const CategoryForm = lazy(() => import("containers/dashboard/categories/CategoryForm"));
const ServiceList = lazy(() => import("containers/dashboard/services/ServiceList"));
const ServiceForm = lazy(() => import("containers/dashboard/services/ServiceForm"));
const ServiceCategoryList = lazy(() => import("containers/dashboard/services/categories/ServiceCategoryList"));
const ServiceCategoryForm = lazy(() => import("containers/dashboard/services/categories/ServiceCategoryForm"));
const CaseList = lazy(() => import("containers/dashboard/cases/CaseList"));
const CaseForm = lazy(() => import("containers/dashboard/cases/CaseForm"));
const ContactList = lazy(() => import("containers/dashboard/contacts/ContactList"));
const UserList = lazy(() => import("containers/dashboard/users/UserList"));

function App() {
  useEffect(() => {
    store.dispatch(checkAuthenticated());
    store.dispatch(load_user());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
          <Suspense fallback={null}>
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
          </Suspense>
          <WhatsAppButton />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
