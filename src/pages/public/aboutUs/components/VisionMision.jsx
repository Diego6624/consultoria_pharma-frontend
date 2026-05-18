const VisionMision = () => {
    const bgStyle = {
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
                    style={bgStyle}
                    className="rounded-3xl relative overflow-hidden shadow-lg flex flex-col items-center justify-center gap-6 p-10 min-h-48"
                >
                    <img
                        src="/images/diana.png"
                        alt="diana"
                        className="w-16 h-16 object-contain"
                    />

                    <div className="flex flex-col gap-2 text-white text-center">
                        <h3 className="text-2xl font-bold">Misión</h3>
                        <p className="text-base leading-relaxed">
                            Brindar soluciones regulatorias integrales que permitan a nuestros clientes
                            operar con excelencia, ética y cumplimiento total ante DIGEMID y otras entidades de salud.
                        </p>
                    </div>
                </div>

                {/* VISION */}
                <div
                    style={bgStyle}
                    className="rounded-3xl relative overflow-hidden shadow-lg flex flex-col items-center justify-center gap-6 p-10 min-h-48"
                >
                    <img
                        src="/images/eye.png"
                        alt="eye"
                        className="w-16 h-16 object-contain"
                    />

                    <div className="flex flex-col gap-2 text-white text-center">
                        <h3 className="text-2xl font-bold">Visión</h3>
                        <p className="text-base leading-relaxed">
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