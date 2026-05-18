const SearchServices = () => {
    return(<>
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44 gap-6 flex items-center justify-center">
            <div className="flex gap-4 w-full max-w-4xl">
                {/* Input de búsqueda */}
                <input
                    type="text"
                    placeholder="Busca servicio"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Select de categorias */}
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48">
                    <option>Todas las categorias</option>
                </select>
            </div>
        </section>  
    </>);
};

export default SearchServices;