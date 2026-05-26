import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Phone, Send } from "lucide-react";

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
            <div className="bg-[#268EA9] grid md:grid-cols-2 justify-center w-full h-full gap-10 px-10 py-10 rounded-lg">
                {/* Content */}
                <div className="flex flex-col gap-8 w-full h-full justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-semibold text-2xl">Información de contacto</p>
                        <p className="text-white text-md">
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
                                <div className="flex flex-col gap-1 text-md text-white">
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
                                <p className="font-semibold ">9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Message */}
                <div className="flex flex-col gap-6">
                    {/* Tittle */}
                    <p className="text-white font-semibold text-2xl">Envíanos un Mensaje</p>
                    {/* Form */}
                    <form className="flex flex-col gap-4">
                        {/* Name */}
                        <div className="w-full h-auto gap-2 flex flex-col">
                            <label className="text-white font-semibold text-md">Nombre Completo</label>
                            <input type="text" placeholder="Nombre" className="text-sm p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0DB3DE] transition-colors duration-300" />
                        </div>
                        {/* Email and Phone */}
                        <div className="flex gap-4">
                            <div className="w-full h-auto gap-2 flex flex-col">
                                <label className="text-white font-semibold text-md">Número de Teléfono</label>
                                <input type="tel" placeholder="Número de Teléfono" className="text-sm p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0DB3DE] transition-colors duration-300" />
                            </div>
                            <div className="w-full h-auto gap-2 flex flex-col">
                                <label className="text-white font-semibold text-md">Email</label>
                                <input type="email" placeholder="Correo Electrónico" className="text-sm p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0DB3DE] transition-colors duration-300" />
                            </div>
                        </div>
                        {/* Consulta Type */}
                        <div className="w-full h-auto gap-2 flex flex-col">
                            <label className="text-white font-semibold text-md">Tipo de consulta</label>
                            <Select>
                                <SelectTrigger className="w-full bg-white p-3 py-6">
                                    <SelectValue placeholder="Selecione un servicio" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Servicios</SelectLabel>
                                        <SelectItem value="registrosSanitarios">Registros Sanitarios</SelectItem>
                                        <SelectItem value="certificacionesBPA">Certificaciones BPA</SelectItem>
                                        <SelectItem value="autorizacionLocal">Autorización de Local</SelectItem>
                                        <SelectItem value="certificacionesBPM">Certificaciones BPM</SelectItem>
                                        <SelectItem value="farmacovigilancia">Farmacovigilancia</SelectItem>
                                        <SelectItem value="aperturaDroguerias">Apertura de Droguerías</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Message */}
                        <div className="w-full h-auto gap-2 flex flex-col">
                            <label className="text-white font-semibold text-md">Mensaje</label>
                            <textarea placeholder="Cuentas sobre tu problema o necesidad..." className="text-sm p-4 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0DB3DE] transition-colors duration-300 h-32 resize-none"></textarea>
                        </div>
                        {/* Submit Button */}
                        <button type="submit" className="flex gap-2 justify-center items-center bg-[#1F4C7F] text-white hover:bg-white hover:text-[#0DB3DE] font-semibold py-3 rounded-lg transition-colors duration-300 cursor-pointer">
                            <p>Enviar Mensaje</p>
                            <Send className="size-5" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </>);
};

export default ContactInfo;