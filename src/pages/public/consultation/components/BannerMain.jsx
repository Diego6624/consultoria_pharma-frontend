const BannerMain = () => {

    const divStyle = {
        width: '100%',
        height: '100svh',
        backgroundImage: 'url(images/imageContact.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (<>
        <section>
            <div className="relative w-full h-svh" style={divStyle}>
                {/* 🔥 CAPA DE SOMBRA / GRADIENTE */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/10 to-transparent"></div>

                {/* CONTENIDO */}
                <div className="relative flex items-center w-full h-full md:pt-15">
                    <div className="flex flex-col justify-center px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 gap-6 w-full">

                        {/* Message */}
                        <div className="flex flex-col font-bold text-white text-4xl md:text-6xl lg:text-7xl gap-2 w-full md:max-w-xl">
                            <p>Ponte en <span className="text-[#0DB3DE]">Contacto </span>con nuestros expertos</p>
                        </div>

                        {/* Description */}
                        <div className="flex text-white text-lg md:text-xl lg:text-2xl max-w-2xl">
                            <p>
                                Déjanos un mensaje o contáctanos por nuestros canales directos. Te responderemos en menos de 24 horas hábiles
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default BannerMain;