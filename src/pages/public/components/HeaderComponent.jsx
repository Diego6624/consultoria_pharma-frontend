import { Link, useLocation } from 'react-router-dom';
import logo from '/public/images/logo.png';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { motion } from 'framer-motion';
import AnimateBoton from '../../../components/AnimateBoton';

const HeaderComponent = () => {
    const location = useLocation();

    const navItems = [
        { name: "Inicio", path: "/" },
        { name: "Nosotros", path: "/aboutUs" },
        { name: "Servicios", path: "/services" },
        { name: "Noticias", path: "/news" },
    ];

    return (
        <>
            <div className="flex justify-center fixed top-0 left-0 right-0 z-50 ">
                <div className='flex justify-between items-center w-full max-w-7xl bg-[#FFFFFFD4] rounded-full mx-10 my-4 px-6 py-4 backdrop-blur-sm'>

                    {/* Logo */}
                    <div className='flex items-center gap-3 w-full'>
                        <img src={logo} alt="Company Logo" className='w-15 h-15 bg-white rounded-full' />
                        <div className='text-[#0DB3DE] flex flex-col font-semibold'>
                            <p>CONSULTORÍA <span className='text-[#FF0000]'>YL</span> PHARMA</p>
                            <p>CONSULTORÍA Y ASESORÍA FARMACÉUTICA</p>
                        </div>
                    </div>

                    {/* NAVBAR ANIMADO */}
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
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{
                                            originX: 0.5
                                        }}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Consultation */}
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
            </div>
        </>
    );
};

export default HeaderComponent;