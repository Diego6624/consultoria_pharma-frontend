import AnimateBoton from "@/components/AnimateBoton";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const GuaranteedResults = () => {
    return (<>
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44 gap-6 bg-[#1F4C7F]">
            <div className="items-center justify-center w-full h-full grid md:grid-cols-2 gap-10 px-20 text-white">
                {/* Image */}
                <div className="w-full h-full items-center justify-center flex">
                    <img src="/images/imageResult.jpg" alt="image" className="h-full w-full object-cover rounded-lg shadow-md" />
                </div>
                {/* Content */}
                <div className="flex flex-col gap-6 mx-auto w-full h-full">
                    {/* Tittle | Description*/}
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-3xl">
                            Resultados garantizados
                        </p>
                        <p className="text-xl">
                            Brindamos seguridad jurídica y técnica a tu establecimiento farmacéutico. Nuestro equipo gestiona cada requerimiento
                            con precisión absoluta para evitar observaciones de la autoridad y asegurar la continuidad operativa de tu negocio
                            sin contratiempos legales.
                        </p>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        {/* Section A */}
                        <div className="flex flex-col justify-center gap-1 w-full">
                            <p className="font-semibold text-lg">Experiencia</p>
                            <p className="text-md">+8 años sector</p>
                        </div>
                        {/* Section B */}
                        <div className="flex flex-col justify-center gap-1 w-full">
                            <p className="font-semibold text-lg">Experiencia</p>
                            <p className="text-md">+8 años sector</p>
                        </div>
                        {/* Section C */}
                        <div className="flex flex-col justify-center gap-1 w-full">
                            <p className="font-semibold text-lg">Experiencia</p>
                            <p className="text-md">+8 años sector</p>
                        </div>
                        {/* Section D */}
                        <div className="flex flex-col justify-center gap-1 w-full">
                            <p className="font-semibold text-lg">Experiencia</p>
                            <p className="text-md">+8 años sector</p>
                        </div>
                    </div>
                    <AnimateBoton
                        bg="#FFFFFF"
                        bgIcon="#0DB3DE"
                        name="Contáctanos"
                        textColor="#000000"
                        textHover="#FFFFFF"
                        icon={<LocalPhoneIcon />}
                        iconColor="#FFFFFF"
                        navigate="/consultation"
                    />
                </div>
            </div>
        </section>
    </>);
};

export default GuaranteedResults;