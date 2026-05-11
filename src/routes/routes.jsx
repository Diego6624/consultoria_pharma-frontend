import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import NotFoundComponent from "../components/NotFoundComponent";
import HomePage from "../pages/public/HomePage";
import ServicesPage from "../pages/public/ServicesPage";
import AboutUsPage from "../pages/public/AboutUsPage";
import NewsPage from "../pages/public/NewsPage";
import ConsultationPage from "@/pages/public/ConsultationPage";

const router = createBrowserRouter(
    createRoutesFromElements(   
        <Route path="/" element={<App />} errorElement={<NotFoundComponent />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="aboutUs" element={<AboutUsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="consultation" element={<ConsultationPage />} />
        </Route>
    )
);

export default router;