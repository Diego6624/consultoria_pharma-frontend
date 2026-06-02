import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkIcons from "../../../components/LinkIcons";
import logo from '/public/images/logo.png';
import { Link } from "react-router-dom";

const FooterComponent = () => {
    return (
        <div className="flex flex-col mt-auto w-full pt-8 pb-4 px-6 sm:px-10 md:px-16 lg:px-30 2xl:px-44 gap-4 bg-[#0DB3DE] text-white">
            
            {/* Footer Content */}
            <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-6 md:gap-8 w-full py-2">

                {/* Col 1 — Logo + Descripción + Redes — ocupa las 2 columnas en mobile */}
                <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <img src={logo} alt="Logo" className="w-12 h-12 bg-white rounded-full object-contain shrink-0" />
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
                        <LinkIcons socialIcon={<Facebook />} navigate={"/"} bg="#1F4C7F" hoverBg="#FFFFFF" hoverText="#0DB3DE" />
                        <LinkIcons socialIcon={<Instagram />} navigate={"/"} bg="#1F4C7F" hoverBg="#FFFFFF" hoverText="#0DB3DE" />
                    </div>
                </div>

                {/* Col 2 — Empresa */}
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-base mb-1">Empresa</p>
                    <Link to="/" className="text-white hover:underline text-sm">Inicio</Link>
                    <Link to="/" className="text-white hover:underline text-sm">Nosotros</Link>
                    <Link to="/" className="text-white hover:underline text-sm">Servicios</Link>
                    <Link to="/" className="text-white hover:underline text-sm">Noticias</Link>
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
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-base">Contacto</p>
                        <div className="flex items-center gap-2 text-sm">
                            <WhatsApp fontSize="small" />
                            <p>+51 999 999 999</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <LocalPhoneIcon fontSize="small" />
                            <p>+51 999 999 999</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-base">Horarios</p>
                        <p className="text-sm">Lunes a Viernes</p>
                    </div>
                </div>

                {/* Col 5 — Mapa — ocupa las 2 columnas en mobile */}
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
                    />
                </div>

            </div>

            {/* Divider */}
            <hr className="border-[#1F4C7F] my-1 border-2" />

            {/* Copyright & Policies */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs sm:text-sm text-white/90">
                <p>© 2025 Consultoría YL Pharma. Todos los derechos reservados.</p>
                <p className="cursor-pointer hover:underline">Políticas de privacidad</p>
            </div>
        </div>
    );
};

export default FooterComponent;