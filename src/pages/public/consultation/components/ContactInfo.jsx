import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { listarServiciosPublicos } from "@/services/serviciosService";
import api from "@/services/apiClient.jsx";

const infoData = [
    {
        icon: <MapPin className="size-9" />,
        title: "Ubicaciones",
        description: "Av. xxxxxx xxxx",
    },
    {
        icon: <Mail className="size-9" />,
        title: "Email",
        description: "correo@correo.com",
    },
    {
        icon: <Phone className="size-9" />,
        title: "Llamanos",
        description: "+51 999 999 999",
    },
];

const SIN_PREFERENCIA = "sin-preferencia";

const initialForm = {
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
    idServicio: SIN_PREFERENCIA,
};

const ContactInfo = () => {
    const [form, setForm] = useState(initialForm);
    const [servicios, setServicios] = useState([]);
    const [sending, setSending] = useState(false);
    const [modal, setModal] = useState({ open: false, type: "", message: "" });

    useEffect(() => {
        async function loadServicios() {
            try {
                const data = await listarServiciosPublicos({ page: 0, size: 50 });
                setServicios(data.content || []);
            } catch (error) {
                console.error(error);
            }
        }
        loadServicios();
    }, []);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleServicioChange = (value) => {
        setForm((prev) => ({ ...prev, idServicio: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            const payload = {
                nombre: form.nombre.trim(),
                correo: form.correo.trim(),
                telefono: form.telefono.trim(),
                mensaje: form.mensaje.trim(),
            };

            const idServicio = Number(form.idServicio);
            if (form.idServicio !== SIN_PREFERENCIA && form.idServicio && !isNaN(idServicio)) {
                payload.idServicio = idServicio;
            }

            await api.post("/api/public/consultas", payload);
            setForm(initialForm);
            setModal({
                open: true,
                type: "success",
                message: "¡Tu mensaje fue enviado correctamente! Nos pondremos en contacto contigo pronto.",
            });
        } catch (err) {
            setModal({
                open: true,
                type: "error",
                message: err.message || "No se pudo enviar el mensaje. Por favor intenta de nuevo.",
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="px-6 py-10 sm:px-10 md:px-16 lg:px-32 xl:px-48 2xl:px-64">

            {/* Modal de resultado */}
            <Dialog open={modal.open} onOpenChange={(open) => setModal((prev) => ({ ...prev, open }))}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex flex-col items-center gap-4 py-4">
                            {modal.type === "success" ? (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                                </div>
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                    <XCircle className="h-8 w-8 text-red-600" />
                                </div>
                            )}
                            <DialogTitle className="text-center text-lg font-semibold">
                                {modal.type === "success" ? "¡Mensaje enviado!" : "Ocurrió un error"}
                            </DialogTitle>
                            <DialogDescription className="text-center text-sm text-slate-600">
                                {modal.message}
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <motion.div
                className="bg-[#268EA9] grid grid-cols-1 md:grid-cols-2 w-full gap-8 px-6 sm:px-8 md:px-10 py-8 md:py-10 rounded-lg"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Info de contacto */}
                <div className="flex flex-col gap-6 md:gap-8 w-full h-full justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-semibold text-xl md:text-2xl">
                            Información de contacto
                        </p>
                        <p className="text-white text-sm md:text-base">
                            Comunícate con nosotros de la manera más conveniente para ti.
                            Responderemos lo antes posible.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-6">
                        {infoData.map((info, index) => (
                            <div className="flex items-center gap-3 w-full" key={index}>
                                <div className="shrink-0 shadow-md flex items-center justify-center
                                p-3 md:p-4 rounded-full
                                text-white hover:text-[#0DB3DE]
                                bg-[#1F4C7F] hover:bg-white
                                transition-colors duration-300">
                                    <span className="[&>svg]:size-6 [&>svg]:md:size-9">
                                        {info.icon}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-0.5 text-white">
                                    <p className="font-semibold text-sm md:text-base">{info.title}</p>
                                    <p className="text-sm md:text-base">{info.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 md:gap-4">
                        <p className="text-white font-semibold text-base md:text-lg">
                            Horarios de Atención
                        </p>
                        <div className="flex flex-col gap-2 text-white text-sm md:text-base">
                            <div className="flex justify-between gap-4">
                                <p>Lunes - Viernes</p>
                                <p className="font-semibold">9:00 AM - 6:00 PM</p>
                            </div>
                            <div className="flex justify-between gap-4">
                                <p>Sábado</p>
                                <p className="font-semibold">9:00 AM - 1:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="flex flex-col gap-5 md:gap-6">
                    <p className="text-white font-semibold text-xl md:text-2xl">
                        Envíanos un Mensaje
                    </p>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="consultation-name" className="text-white font-semibold text-sm md:text-base">
                                Nombre Completo
                            </label>
                            <input
                                id="consultation-name"
                                type="text"
                                placeholder="Nombre"
                                value={form.nombre}
                                onChange={handleChange("nombre")}
                                required
                                className="text-sm p-3 bg-white rounded-lg border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-[#0DB3DE]
                           transition-colors duration-300 w-full"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col gap-1.5 w-full">
                                <label htmlFor="consultation-phone" className="text-white font-semibold text-sm md:text-base">
                                    Número de Teléfono
                                </label>
                                <input
                                    id="consultation-phone"
                                    type="tel"
                                    placeholder="Número de Teléfono"
                                    value={form.telefono}
                                    onChange={handleChange("telefono")}
                                    required
                                    className="text-sm p-3 bg-white rounded-lg border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-[#0DB3DE]
                             transition-colors duration-300 w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 w-full">
                                <label htmlFor="consultation-email" className="text-white font-semibold text-sm md:text-base">
                                    Email
                                </label>
                                <input
                                    id="consultation-email"
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    value={form.correo}
                                    onChange={handleChange("correo")}
                                    required
                                    className="text-sm p-3 bg-white rounded-lg border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-[#0DB3DE]
                             transition-colors duration-300 w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="consultation-service" className="text-white font-semibold text-sm md:text-base">
                                Tipo de consulta
                            </label>
                            <Select onValueChange={handleServicioChange} value={form.idServicio}>
                                <SelectTrigger id="consultation-service" aria-label="Tipo de consulta" className="w-full bg-white p-3 py-6">
                                    <SelectValue placeholder="Seleccione un servicio" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Servicios</SelectLabel>
                                        <SelectItem value={SIN_PREFERENCIA}>Sin preferencia</SelectItem>
                                        {servicios.map((servicio) => (
                                            <SelectItem
                                                key={servicio.idServicio}
                                                value={String(servicio.idServicio)}
                                            >
                                                {servicio.titulo}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="consultation-message" className="text-white font-semibold text-sm md:text-base">
                                Mensaje
                            </label>
                            <textarea
                                id="consultation-message"
                                placeholder="Cuéntanos sobre tu problema o necesidad..."
                                value={form.mensaje}
                                onChange={handleChange("mensaje")}
                                required
                                className="text-sm p-4 bg-white rounded-lg border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-[#0DB3DE]
                           transition-colors duration-300 h-32 resize-none w-full"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="flex gap-2 justify-center items-center
                         bg-[#1F4C7F] text-white hover:bg-white hover:text-[#0DB3DE]
                         font-semibold py-3 rounded-lg
                         transition-colors duration-300 cursor-pointer
                         text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {sending ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <p>Enviando...</p>
                                </>
                            ) : (
                                <>
                                    <p>Enviar Mensaje</p>
                                    <Send className="size-4 md:size-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactInfo;
