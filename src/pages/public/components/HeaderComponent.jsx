import { Link, useLocation } from 'react-router-dom';
import logo from '/public/images/logo.png';
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
            ">

                {/* 🔹 MOBILE HEADER */}
                <div className="flex w-full items-center justify-between md:hidden">
                    {/* Logo + texto (derecha) */}
                    <div className='flex items-center gap-2'>
                        <img src={logo} alt="Company Logo" className='w-10 h-10 bg-white rounded-full' />
                        <div className='text-[#0DB3DE] flex flex-col text-xs font-semibold leading-tight'>
                            <p>CONSULTORÍA <span className='text-[#FF0000]'>YL</span> PHARMA</p>
                            <p className='sm:flex hidden'>CONSULTORÍA Y ASESORÍA FARMACÉUTICA</p>
                            <p className='sm:hidden flex text-black'>ASESORÍA FARMACÉUTICA</p>
                        </div>
                    </div>

                    {/* Icono menú (izquierda) */}
                    <button onClick={() => setOpen(!open)}>
                        <Menu className="w-7 h-7 text-[#003F45]" />
                    </button>
                </div>

                {/* 🔹 DESKTOP HEADER */}
                <div className="hidden md:flex w-full items-center justify-between">

                    {/* Logo */}
                    <div className='flex items-center gap-3 w-full'>
                        <img src={logo} alt="Company Logo" className='w-15 h-15 bg-white rounded-full' />
                        <div className='text-[#0DB3DE] flex flex-col font-semibold'>
                            <p>CONSULTORÍA <span className='text-[#FF0000]'>YL</span> PHARMA</p>
                            <p>CONSULTORÍA Y ASESORÍA FARMACÉUTICA</p>
                        </div>
                    </div>

                    {/* Navbar */}
                    <div className='flex gap-10 items-center justify-center w-full relative'>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="relative font-medium text-[#003F45]"
                                >
                                    {item.name}

                                    <motion.div
                                        className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#0DB3DE]"
                                        initial={false}
                                        animate={{
                                            scaleX: isActive ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        style={{ originX: 0.5 }}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Botón */}
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
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.div
                            className="fixed top-0 left-0 h-full w-72 bg-white z-50 p-6 flex flex-col gap-6"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                        >
                            {/* Header del menú */}
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-[#003F45]">Menú</p>
                                <button onClick={() => setOpen(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Links */}
                            <div className="flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setOpen(false)}
                                        className="text-[#003F45] font-medium text-lg"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Botón abajo */}
                            <div className="mt-auto">
                                <AnimateBoton
                                    bg="#52C7E5"
                                    bgIcon="#0DB3DE"
                                    name="Agendar Asesoría"
                                    textColor="#FFFFFF"
                                    textHover="#FFFFFF"
                                    icon={<LocalPhoneIcon />}
                                    iconColor="#FFFFFF"
                                    navigate="/consultation"
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