import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import NotFoundComponent from "../components/NotFoundComponent";
import HomePage from "../pages/public/home/HomePage";
import ServicesPage from "../pages/public/servicesP/ServicesPage";
import ServiceDetailPage from "../pages/public/servicesP/components/ServiceDetailPage";
import AboutUsPage from "../pages/public/aboutUs/AboutUsPage";
import NewsPage from "../pages/public/news/NewsPage";
import ConsultationPage from "@/pages/public/consultation/ConsultationPage";
import LoginPage from "@/pages/private/LoginPage";
import AdminShell from "@/pages/private/AdminShell";
import DashboardPage from "@/pages/private/DashboardPage";
import ArticleListPage from "@/pages/private/ArticleListPage";
import ArticleFormPage from "@/pages/private/ArticleFormPage";
import ServiceListPage from "@/pages/private/ServiceListPage";
import ServiceFormPage from "@/pages/private/ServiceFormPage";
import NotAuthorized from "@/pages/private/NotAuthorized";
import PrivateRoute from "@/pages/private/PrivateRoute";
import RoleRoute from "@/pages/private/RoleRoute";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(   
        <Route path="/" element={<App />} errorElement={<NotFoundComponent />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="aboutUs" element={<AboutUsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:id" element={<ServiceDetailPage />} />
            <Route path="consultation" element={<ConsultationPage />} />
                <Route path="login" element={<LoginPage />} />

                <Route element={<PrivateRoute />}>
                    <Route element={<RoleRoute allowedRoles={["MASTER","ADMIN"]} />}>
                        <Route path="admin" element={<AdminShell />}>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<DashboardPage />} />
                            <Route path="noticias" element={<ArticleListPage />} />
                            <Route path="noticias/nuevo" element={<ArticleFormPage />} />
                            <Route path="noticias/:id/editar" element={<ArticleFormPage />} />
                            <Route path="servicios" element={<ServiceListPage />} />
                            <Route path="servicios/nuevo" element={<ServiceFormPage />} />
                            <Route path="servicios/:id/editar" element={<ServiceFormPage />} />
                            <Route path="no-autorizado" element={<NotAuthorized />} />
                        </Route>
                    </Route>
                </Route>
        </Route>
    )
);

export default router;