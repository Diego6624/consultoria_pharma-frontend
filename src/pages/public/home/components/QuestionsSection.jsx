import { Clock, FileText, LinkIcon, TriangleAlert } from "lucide-react";

const QuestionsSection = () => {
    return (<>
        <div className="p-14 items-center justify-center w-full h-full grid md:grid-cols-2 gap-4 px-20">
            {/* Content */}
            <div className="flex flex-col gap-6 mx-auto w-full h-full">
                {/* Tittle | Description*/}
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-3xl">
                        ¿Te preocupa la complejidad regulatoria de la DIGEMID?
                    </p>
                    <p className="text-xl">
                        El sector farmacéutico es estricto. Un simple error administrativo puede derivar en
                        multas costosas o el cierre de tu negocio.
                    </p>
                </div>
                <div className="flex flex-col gap-6">
                    {/* Section A */}
                    <div className="flex items-center justify-center gap-4 w-full">
                        <div className="shadow-md flex items-center p-4 justify-centerrounded-full rounded-full w-min h-min text-white bg-[#0DB3DE] hover:bg-[#1F4C7F] transition-colors duration-300">
                            <TriangleAlert className="size-9"/>
                        </div>
                        <div className="flex flex-col gap-1 text-lg">
                            <p className="font-semibold">¿Temes recibir multas inesperadas?</p>
                            <p>Evita sanciones económicas con nuestras auditorías preventivas antes de cualquier inspección.</p>
                        </div>
                    </div>
                    {/* Section B */}
                    <div className="flex items-center justify-center gap-4 w-full">
                        <div className="shadow-md flex items-center p-4 justify-centerrounded-full rounded-full w-min h-min text-white bg-[#0DB3DE] hover:bg-[#1F4C7F] transition-colors duration-300">
                            <Clock className="size-9"/>
                        </div>
                        <div className="flex flex-col gap-1 text-lg">
                            <p className="font-semibold">¿Tus trámites demoran meses en salir?</p>
                            <p>Agilizamos tus expedientes evitando errores comunes que causan rechazos y demoras en DIGEMID.</p>
                        </div>
                    </div>
                    {/* Section C */}
                    <div className="flex items-center justify-center gap-4 w-full">
                        <div className="shadow-md flex items-center p-4 justify-centerrounded-full rounded-full w-min h-min text-white bg-[#0DB3DE] hover:bg-[#1F4C7F] transition-colors duration-300">
                            <FileText className="size-9"/>
                        </div>
                        <div className="flex flex-col gap-1 text-lg">
                            <p className="font-semibold">¿Te abruman las actualizaciones de la norma?</p>
                            <p>Nosotros nos mantenemos al día por ti. Tu negocio siempre cumplirá con la normativa vigente.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Image */}
            <div className="w-full h-full items-center justify-center flex">
                <img src="/images/imageHome2.jpg" alt="image" className="h-full object-cover rounded-b-full w-[65%] shadow-md"/>
            </div>
        </div>
    </>);
};

export default QuestionsSection;