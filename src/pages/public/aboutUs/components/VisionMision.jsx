const VisionMision = () => {
    const cardStyle = {
        backgroundImage: "url('/images/visionMision.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
    };

    return (
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44">
            <div className="grid md:grid-cols-2 gap-6">

                {/* MISION */}
                <div
                    style={cardStyle}
                    className="w-full rounded-3xl shadow-lg flex items-center gap-6 p-10"
                >
                    <img
                        src="/images/diana.png"
                        alt="diana"
                        className="w-16 h-16 object-contain shrink-0"
                    />

                    <div className="flex flex-col gap-2 text-white">
                        <h3 className="text-2xl font-bold">Misión</h3>
                        <p className="text-base leading-relaxed">
                            Brindar soluciones regulatorias integrales que permitan a nuestros clientes
                            operar con excelencia, ética y cumplimiento total ante DIGEMID y otras entidades de salud.
                        </p>
                    </div>
                </div>

                {/* VISION */}
                <div
                    style={cardStyle}
                    className="w-full rounded-3xl shadow-lg flex items-center p-10 gap-6"
                >
                    <img
                        src="/images/eye.png"
                        alt="eye"
                        className="w-16 h-16 object-contain flex-shrink-0"
                    />

                    <div className="flex flex-col gap-2 text-white">
                        <h3 className="text-2xl font-bold">Visión</h3>
                        <p className="text-base leading-relaxed">
                            Ser líderes en el sector de servicios regulatorios, reconocidos por nuestra excelencia,
                            ética y compromiso con la calidad en la atención a nuestros clientes.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VisionMision;