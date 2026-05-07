import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import NotFoundComponent from "../components/NotFoundComponent";
import HomePage from "../pages/public/HomePage";
import ContactUsPage from "../pages/public/ContactUs";

const router = createBrowserRouter(
    createRoutesFromElements(   
        <Route path="/" element={<App />} errorElement={<NotFoundComponent />}>
            <Route index element={<HomePage />} />
            <Route path="contact" element={<ContactUsPage />} />

        </Route>
    )
);

export default router;