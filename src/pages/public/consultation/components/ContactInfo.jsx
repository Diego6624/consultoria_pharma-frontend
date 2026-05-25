import { Mail, MapPin, Phone } from "lucide-react";

const infoData = [
    {
        icon: <MapPin className="size-9" />,
        title: "Ubicaciones",
        description: "Av. xxxxxx xxxx"
    },
    {
        icon: <Mail className="size-9" />,
        title: "Email",
        description: "correo@correro.com"
    },
    {
        icon: <Phone className="size-9" />,
        title: "Llamanos",
        description: "+51 999 999 999"
    }
];

const ContactInfo = () => {
    return (<>
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44 gap-6">
            <div className="bg-[#268EA9] grid md:grid-cols-2 justify-center w-full h-full gap-4 px-20 py-10 rounded-lg">
                {/* Content */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-semibold text-xl">Información de contacto</p>
                        <p className="text-white text-lg">
                            Comunícate con nosotros de la manera más conveniente para ti.
                            Responderemos lo antes posible.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        {/* Sections */}
                        {infoData.map((info, index) => (
                            <div className="flex items-center gap-4 w-full" key={index}>
                                <div className="shadow-md flex items-center p-4 justify-centerrounded-full rounded-full w-min h-min text-white hover:text-[#0DB3DE] bg-[#1F4C7F] hover:bg-white transition-colors duration-300">
                                    {info.icon}
                                </div>
                                <div className="flex flex-col gap-1 text-lg text-white">
                                    <p className="font-semibold">{info.title}</p>
                                    <p>{info.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-white font-semibold text-lg">Horarios de Atención</p>
                        <div className="flex flex-col gap-2 text-white">
                            <div className="flex justify-between gap-4">
                                <p>Lunes - Sábado</p>
                                <p className="font-semibold">9:00 AM - 6:00 PM</p>
                            </div>
                            <div className="flex justify-between gap-4">
                                <p>Lunes - Sábado</p>
                                <p className="font-semibold">9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Message */}
                <div>
                    {/* Tittle */}
                    <p>Envíanos un Mensaje</p>
                    {/* Form */}
                    <form className="flex flex-col gap-4 mt-4">
                        <label className="text-white font-semibold text-lg">Nombre Completo</label>
                        <input type="text" placeholder="Nombre Completo" className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0DB3DE] transition-colors duration-300" />
                        <div className="flex gap-4">
                            <div>
                                <label className="text-white font-semibold text-lg">Correo Electrónico</label>
                                <input type="email" placeholder="Correo Electrónico" className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0DB3DE] transition-colors duration-300" />
                            </div>
                            <div>
                                <label className="text-white font-semibold text-lg">Número de Teléfono</label>
                                <input type="tel" placeholder="Número de Teléfono" className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0DB3DE] transition-colors duration-300" />
                            </div>
                        </div>
                        <label className="text-white font-semibold text-lg">Tipo de consulta</label>
                        <select className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0DB3DE] transition-colors duration-300">
                            <option value="">Selecciona una opción</option>
                            <option value="general">Consulta General</option>
                            <option value="soporte">Soporte Técnico</option>
                            <option value="otros">Otros</option>
                        </select>
                        <label className="text-white font-semibold text-lg">Mensaje</label>
                        <textarea placeholder="Cuentas sobre tu problema o necesidad..." className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0DB3DE] transition-colors duration-300 h-32 resize-none"></textarea>
                        <button type="submit" className="bg-[#0DB3DE] text-white font-semibold py-3 rounded-lg hover:bg-[#52C7E5] transition-colors duration-300">Enviar Mensaje</button>
                    </form>
                </div>
            </div>

        </section>
    </>);
};

export default ContactInfo;