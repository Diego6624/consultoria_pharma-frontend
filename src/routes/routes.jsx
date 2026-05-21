import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import NotFoundComponent from "../components/NotFoundComponent";
import HomePage from "../pages/public/home/HomePage";
import ServicesPage from "../pages/public/servicesP/ServicesPage";
import ServiceDetailPage from "../pages/public/servicesP/components/ServiceDetailPage";
import AboutUsPage from "../pages/public/aboutUs/AboutUsPage";
import NewsPage from "../pages/public/news/NewsPage";
import ConsultationPage from "@/pages/public/consultation/ConsultationPage";

const router = createBrowserRouter(
    createRoutesFromElements(   
        <Route path="/" element={<App />} errorElement={<NotFoundComponent />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="aboutUs" element={<AboutUsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:id" element={<ServiceDetailPage />} />
            <Route path="consultation" element={<ConsultationPage />} />
        </Route>
    )
);

export default router;