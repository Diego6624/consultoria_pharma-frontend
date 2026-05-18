const VisionMision = () => {
    const cardStyle = {
        backgroundImage: "url('/images/visionMision.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44">
            <div className="grid md:grid-cols-2 gap-6">

                {/* MISION */}
                <div
                    style={cardStyle}
                    className="rounded-3xl overflow-hidden shadow-lg flex items-center justify-center gap-4 p-8"
                >
                    <img
                        src="/images/diana.png"
                        alt="diana"
                        className="w-20 h-20 object-contain shrink-0"
                    />

                    <div className="flex gap-3 flex-col text-white text-center">
                        <h3 className="text-2xl font-bold">Misión</h3>
                        <p className="text-sm leading-relaxed">
                            Brindar soluciones regulatorias integrales que permitan a nuestros clientes
                            operar con excelencia, ética y cumplimiento total ante DIGEMID y otras entidades de salud.
                        </p>
                    </div>
                </div>

                {/* VISION */}
                <div
                    style={cardStyle}
                    className="rounded-3xl overflow-hidden shadow-lg flex flex-col items-center justify-center gap-4 p-8"
                >
                    <img
                        src="/images/eye.png"
                        alt="eye"
                        className="w-20 h-20 object-contain flex-shrink-0"
                    />

                    <div className="flex flex-col gap-3 text-white text-center">
                        <h3 className="text-2xl font-bold">Visión</h3>
                        <p className="text-sm leading-relaxed">
                            Ser la consultora referente en el sector farmacéutico peruano, reconocida por nuestra agilidad,
                            precisión técnica y compromiso inquebrantable con la salud pública.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VisionMision;