import { Link, useLocation } from 'react-router-dom';
import logo from '/public/images/logo.png';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { motion } from 'framer-motion';

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
            <div className="flex justify-center">
                <div className='flex justify-between items-center w-full max-w-7xl bg-[#e7e9ea] rounded-full mx-10 my-4 px-6 py-4'>

                    {/* Logo */}
                    <div className='flex items-center gap-3 w-full'>
                        <img src={logo} alt="Company Logo" className='w-15 h-15 bg-white rounded-full' />
                        <div className='text-[#0DB3DE] flex flex-col font-semibold'>
                            <p>CONSULTORÍA <span className='text-[#FF0000]'>YL </span> PHARMA</p>
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
                                    className="relative font-medium text-black"
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
                                            originX: 0.5 // 🔥 centro
                                        }}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* BOTÓN (lo dejas igual) */}
                    <div className='w-auto'>
                        <Link
                            to='/consultation'
                            className='relative w-min h-min flex items-center p-5 py-3 bg-[#52C7E5] text-white rounded-full overflow-hidden group shadow-lg hover:shadow-xl'
                        >
                            <div className='absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0DB3DE] rounded-full group-hover:w-full group-hover:h-full group-hover:left-0 group-hover:top-0 group-hover:translate-y-0 group-hover:rounded-full transition-all duration-500 ease-out'></div>

                            <div className='absolute w-10 h-10 left-3 bg-[#0DB3DE] rounded-full flex items-center justify-center'>
                                <LocalPhoneIcon className='text-white ' />
                            </div>

                            <span className='pl-10 relative font-semibold text-lg whitespace-nowrap'>
                                Agendar Asesoría
                            </span>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default HeaderComponent;