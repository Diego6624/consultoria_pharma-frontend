import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkIcons from "../../../components/LinkIcons";
import logo from '/images/logo.webp';
import { Link } from "react-router-dom";

const FooterComponent = () => {
    return (
        <div className="flex flex-col mt-auto w-full pt-8 pb-4 px-6 sm:px-10 md:px-16 lg:px-30 2xl:px-44 gap-4 bg-[#0DB3DE] text-white">

            {/* Footer Content */}
            <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-6 md:gap-8 w-full py-2">

                {/* Col 1 — Logo + Descripción + Redes */}
                <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <img src={logo} alt="Logo de Consultoría YL Pharma" className="w-12 h-12 bg-white rounded-full object-contain shrink-0" />
                        <div className="flex flex-col text-sm font-semibold leading-tight">
                            <p>CONSULTORÍA YL PHARMA</p>
                            <p>CONSULTORÍA Y ASESORÍA FARMACÉUTICA</p>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Expertos en regulación sanitaria y calidad. Garantizamos el cumplimiento
                        normativo de tu empresa con soluciones ágiles y seguras.
                    </p>
                    <div className="flex gap-2">
                        <LinkIcons ariaLabel="Facebook de Consultoría YL Pharma" socialIcon={<Facebook />} navigate={"https://web.facebook.com/asesoriafarmaceuticayl"} bg="#1F4C7F" hoverBg="#FFFFFF" hoverText="#0DB3DE"/>
                        <LinkIcons ariaLabel="Instagram de Consultoría YL Pharma" socialIcon={<Instagram />} navigate={"/"} bg="#1F4C7F" hoverBg="#FFFFFF" hoverText="#0DB3DE" />
                        <LinkIcons ariaLabel="Contactar por WhatsApp" socialIcon={<WhatsApp />} navigate={"https://wa.me/51901676492?text=%C2%A1Hola!%20Estoy%20interesado%20en%20sus%20servicios%20de%20consultor%C3%ADa%20farmac%C3%A9utica.%20Me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20c%C3%B3mo%20pueden%20ayudarme."} bg="#1F4C7F" hoverBg="#FFFFFF" hoverText="#0DB3DE" />
                    </div>
                </div>

                {/* Col 2 — Empresa */}
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-base mb-1">Empresa</p>
                    <Link to="/" className="text-white hover:underline text-sm">Inicio</Link>
                    <Link to="/aboutUs" className="text-white hover:underline text-sm">Nosotros</Link>
                    <Link to="/services" className="text-white hover:underline text-sm">Servicios</Link>
                    <Link to="/news" className="text-white hover:underline text-sm">Noticias</Link>
                </div>

                {/* Col 3 — Servicios */}
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-base mb-1">Servicios</p>
                    <Link to="/" className="text-white hover:underline text-sm">Registros</Link>
                    <Link to="/" className="text-white hover:underline text-sm">Auditorías</Link>
                    <Link to="/" className="text-white hover:underline text-sm">Licencias</Link>
                    <Link to="/" className="text-white hover:underline text-sm">Calidad</Link>
                </div>

                {/* Col 4 — Contacto + Horarios */}
                <div className="col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-base">Contacto</p>
                        <div className="flex items-center gap-2 text-sm">
                            <WhatsApp fontSize="small" />
                            <p>+51 901 676 492</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <LocalPhoneIcon fontSize="small" />
                            <p>+51 943 132 132</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-base">Horarios</p>
                        <p className="text-sm">Lunes a Viernes</p>
                        <p className="text-sm font-semibold">9:00 AM - 6:00 PM</p>
                    </div>
                </div>

                {/* Col 5 — Mapa */}
                <div className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden
                                w-full h-40 md:w-45 md:h-37.5
                                shrink-0 shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d241.88495547687222!2d-75.72868417074176!3d-14.0677695686553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1778549262791!5m2!1ses-419!2spe"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de Consultoría YL Pharma en Google Maps"
                    />
                </div>

            </div>

            {/* Divider */}
            <hr className="border-[#1F4C7F] my-1 border" />

            {/* Copyright & Policies */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs md:text-sm text-white/90  text-center">
                <p>© 2025 YLPHARMA. Todos los derechos reservados.</p>
                <p className="">
                    Desarrollado por <Link to="https://moralestechsolutionsadvanced.com/" className="hover:underline text-[#0022ff]">Morales Tech Solutions Advanced SAC</Link> | <Link to="https://www.facebook.com/moralestechsolutionsadvanced" className="hover:underline text-[#0022ff]">Síguenos en Facebook</Link>
                </p>
            </div>
        </div>
    );
};

export default FooterComponent;
