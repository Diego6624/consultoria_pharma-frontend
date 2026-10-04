/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { lazy } from "react";
import App from "../App";
import NotFoundComponent from "../components/NotFoundComponent";
const HomePage = lazy(() => import("../pages/public/home/HomePage"));
const ServicesPage = lazy(() => import("../pages/public/servicesP/ServicesPage"));
const ServiceDetailPage = lazy(() => import("../pages/public/servicesP/components/ServiceDetailPage"));
const AboutUsPage = lazy(() => import("../pages/public/aboutUs/AboutUsPage"));
const NewsPage = lazy(() => import("../pages/public/news/NewsPage"));
const NewsDetailPage = lazy(() => import("../pages/public/news/components/NewsDetailPage"));
const ConsultationPage = lazy(() => import("@/pages/public/consultation/ConsultationPage"));
const LoginPage = lazy(() => import("@/pages/private/auth/LoginPage"));
import PrivateRoute from "@/pages/private/auth/PrivateRoute";
import RoleRoute from "@/pages/private/auth/RoleRoute";
const NotAuthorized = lazy(() => import("@/pages/private/auth/NotAuthorized"));
const AdminShell = lazy(() => import("@/pages/private/layout/AdminShell"));
const DashboardPage = lazy(() => import("@/pages/private/dashboard/DashboardPage"));
const ArticleListPage = lazy(() => import("@/pages/private/articles/ArticleListPage"));
const ArticleFormPage = lazy(() => import("@/pages/private/articles/ArticleFormPage"));
const ServiceListPage = lazy(() => import("@/pages/private/services/ServiceListPage"));
const ServiceFormPage = lazy(() => import("@/pages/private/services/ServiceFormPage"));
const UsersPage = lazy(() => import("@/pages/private/users/UsersPage"));
const LocationsPage = lazy(() => import("@/pages/private/locations/LocationsPage"));
const CategoriesPage = lazy(() => import("@/pages/private/categories/CategoriesPage"));
const ConsultationsPage = lazy(() => import("@/pages/private/consultations/ConsultationsPage"));
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
