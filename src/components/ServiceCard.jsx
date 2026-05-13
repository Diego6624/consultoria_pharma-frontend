import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const ServiceCard = ({
    image,
    category,
    title,
    description,
    serviceLink,
    icon,
}) => {
    return (
        <div className="relative w-[320px] h-[500px]">
            
            {/* Imagen de fondo */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />

            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/20 rounded-3xl" />

            {/* Card blanca adelante */}
            <div className="absolute bottom-0 left-0 right-0 w-full rounded-3xl bg-white shadow-2xl flex flex-col gap-4 px-6 pt-8 pb-6 z-10"
                style={{
                    height: '68%',
                    borderRadius: '24px',
                }}>

                {/* Category */}
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                    {category}
                </p>

                {/* Title */}
                <h3 className="text-gray-900 font-black text-2xl leading-tight">
                    {title}
                </h3>

                {/* Divider */}
                <div className="w-12 h-1 bg-[#0DB3DE] rounded-full" />

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                    {description}
                </p>

                {/* Button */}
                <Link
                    to={serviceLink}
                    className="w-fit flex items-center gap-2 px-5 py-3 bg-[#0DB3DE] hover:bg-[#0a9ec7] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                    <InfoIcon fontSize="small" />
                    Ver servicio
                </Link>
            </div>

            {/* Floating Icon Badge */}
            <div className="absolute -right-4 top-[140px] z-20 w-16 h-16 rounded-full bg-[#0DB3DE] flex items-center justify-center shadow-lg border-4 border-white">
                {icon}
            </div>
        </div>
    );
};

export default ServiceCard;