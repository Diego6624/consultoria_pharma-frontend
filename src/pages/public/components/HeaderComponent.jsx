import { Link, useLocation } from 'react-router-dom';
import logo from '/images/logo.webp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateBoton from '../../../components/AnimateBoton';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';

const HeaderComponent = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const navItems = [
        { name: "Inicio", path: "/" },
        { name: "Nosotros", path: "/aboutUs" },
        { name: "Servicios", path: "/services" },
        { name: "Noticias", path: "/news" },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50">

            {/* CONTENEDOR PRINCIPAL */}
            <div className="
                flex items-center justify-between
                w-full max-w-7xl
                bg-white md:bg-[#FFFFFFD4] md:backdrop-blur-sm
                px-4 py-3
                md:mx-auto md:my-4 md:px-6 md:py-4 md:rounded-full md:border-0 border-b
                shadow-xs
            ">
                {/* 🔹 MOBILE HEADER */}
                <div className="flex w-full items-center justify-between md:hidden gap-8">
                    {/* Logo + nombre centrado */}
                    <Link className="flex items-center gap-3 min-w-min" to="/">
                        <img src={logo} alt="Logo de Consultoría YL Pharma" className='w-12 h-12 bg-white rounded-full border border-gray-200' />
                        <div className='text-[#0DB3DE] flex flex-col text-sm font-semibold leading-tight min-w-min'>
                            <p>CONSULTORÍA <span className='text-[#FF0000]'>YL</span> PHARMA</p>
                            <p className="text-black font-normal text-xs">CONSULTORÍA Y ASESORÍA FARMACÉUTICA</p>
                        </div>
                    </Link>

                    <button onClick={() => setOpen(!open)} className='min-w-min p-2'>
                        {open
                            ? <X className="w-7 h-7 text-[#003F45]" />
                            : <Menu className="w-7 h-7 text-[#003F45]" />
                        }
                    </button>
                </div>

                {/* 🔹 DESKTOP HEADER */}
                <div className="hidden md:flex w-full items-center justify-between">
                    <Link className='flex items-center gap-3 min-w-max' to="/">
                        <img src={logo} alt="Logo de Consultoría YL Pharma" className='w-15 h-15 bg-white rounded-full' />
                        <div className='text-[#0DB3DE] flex flex-col font-semibold'>
                            <p>CONSULTORÍA <span className='text-[#FF0000]'>YL</span> PHARMA</p>
                            <p>CONSULTORÍA Y ASESORÍA FARMACÉUTICA</p>
                        </div>
                    </Link>

                    <div className='flex gap-10 items-center justify-center w-full relative'>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link key={item.name} to={item.path} className="relative font-medium text-[#003F45]">
                                    {item.name}
                                    <motion.div
                                        className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#0DB3DE]"
                                        initial={false}
                                        animate={{ scaleX: isActive ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ originX: 0.5 }}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    <AnimateBoton
                        bg="#52C7E5"
                        bgIcon="#0DB3DE"
                        name="Agendar Asesoría"
                        textColor="#FFFFFF"
                        textSize="text-md md:text-lg"
                        textHover="#FFFFFF"
                        icon={<LocalPhoneIcon />}
                        iconColor="#FFFFFF"
                        navigate="/consultation"
                    />
                </div>
            </div>

            {/* 🔹 MOBILE DROPDOWN — cae desde el header hacia abajo */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay para cerrar tocando fuera */}
                        <motion.div
                            className="fixed inset-0 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />

                        {/* Panel dropdown */}
                        <motion.div
                            className="absolute top-full left-0 right-0 z-50
                                       bg-white border-t border-b border-gray-100
                                       flex flex-col overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >

                            {/* Links centrados */}
                            <div className="flex flex-col">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            onClick={() => setOpen(false)}
                                            className={`text-center py-4 text-sm font-medium tracking-widest uppercase
                                                        border-b border-gray-100 transition-colors duration-200
                                                        ${isActive
                                                    ? "text-[#0DB3DE]"
                                                    : "text-[#003F45] hover:text-[#0DB3DE] hover:bg-gray-50"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Botón abajo */}
                            <div className="flex justify-center px-6 py-5">
                                <AnimateBoton
                                    bg="#52C7E5"
                                    bgIcon="#0DB3DE"
                                    name="Agendar Asesoría"
                                    textColor="#FFFFFF"
                                    textHover="#FFFFFF"
                                    icon={<LocalPhoneIcon />}
                                    iconColor="#FFFFFF"
                                    navigate="/consultation"
                                    onNavigate={() => setOpen(false)}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HeaderComponent;
