import { Link } from "react-router-dom";

const AnimateBoton = ({ bg, bgIcon, name, icon, navigate, textColor, iconColor, textHover }) => {
    return (<>
        <div className='w-auto'>
            <Link
                to={navigate}
                className={`relative w-min h-min flex items-center p-5 py-3 rounded-full overflow-hidden group`}
                style={{ backgroundColor: bg}}
            >
                <div className='absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0DB3DE] rounded-full group-hover:w-full group-hover:h-full group-hover:left-0 group-hover:top-0 group-hover:translate-y-0 group-hover:rounded-full transition-all duration-500 ease-out'></div>

                <div className={`absolute w-10 h-10 left-3 rounded-full flex items-center justify-center`}
                    style={{ backgroundColor: bgIcon, color: iconColor }}
                >
                    {icon}
                </div>

                <span className={`pl-10 relative font-semibold text-lg whitespace-nowrap hover:text-[${textHover}]`}
                    style={{ color: textColor, }}
                >
                    {name}
                </span>
            </Link>
        </div>
    </>);
};

export default AnimateBoton;