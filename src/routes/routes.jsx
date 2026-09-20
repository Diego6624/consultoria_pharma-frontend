import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import NotFoundComponent from "../components/NotFoundComponent";
import HomePage from "../pages/public/home/HomePage";
import ServicesPage from "../pages/public/servicesP/ServicesPage";
import ServiceDetailPage from "../pages/public/servicesP/components/ServiceDetailPage";
import AboutUsPage from "../pages/public/aboutUs/AboutUsPage";
import NewsPage from "../pages/public/news/NewsPage";
import NewsDetailPage from "../pages/public/news/components/NewsDetailPage";
import ConsultationPage from "@/pages/public/consultation/ConsultationPage";
import LoginPage from "@/pages/private/auth/LoginPage";
import PrivateRoute from "@/pages/private/auth/PrivateRoute";
import RoleRoute from "@/pages/private/auth/RoleRoute";
import NotAuthorized from "@/pages/private/auth/NotAuthorized";
import AdminShell from "@/pages/private/layout/AdminShell";
import DashboardPage from "@/pages/private/dashboard/DashboardPage";
import ArticleListPage from "@/pages/private/articles/ArticleListPage";
import ArticleFormPage from "@/pages/private/articles/ArticleFormPage";
import ServiceListPage from "@/pages/private/services/ServiceListPage";
import ServiceFormPage from "@/pages/private/services/ServiceFormPage";
import UsersPage from "@/pages/private/users/UsersPage";
import LocationsPage from "@/pages/private/locations/LocationsPage";
import CategoriesPage from "@/pages/private/categories/CategoriesPage";
import ConsultationsPage from "@/pages/private/consultations/ConsultationsPage";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} errorElement={<NotFoundComponent />}>
        <Route index element={<HomePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:slug" element={<NewsDetailPage />} />
        <Route path="aboutUs" element={<AboutUsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="consultation" element={<ConsultationPage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<RoleRoute allowedRoles={["MASTER", "ADMIN"]} />}>
          <Route path="admin" element={<AdminShell />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="noticias" element={<ArticleListPage />} />
            <Route path="noticias/nuevo" element={<ArticleFormPage />} />
            <Route path="noticias/:id/editar" element={<ArticleFormPage />} />
            <Route path="servicios" element={<ServiceListPage />} />
            <Route path="servicios/nuevo" element={<ServiceFormPage />} />
            <Route path="servicios/:id/editar" element={<ServiceFormPage />} />
            <Route path="ubicaciones" element={<LocationsPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
            <Route path="consultas" element={<ConsultationsPage />} />
            <Route element={<RoleRoute allowedRoles={["MASTER"]} />}>
              <Route path="usuarios" element={<UsersPage />} />
            </Route>
            <Route path="no-autorizado" element={<NotAuthorized />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundComponent />} />
    </Route>
  )
);

export default router;
