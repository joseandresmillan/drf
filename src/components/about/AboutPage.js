export default function AboutSection() {
    return (
        <div className="bg-gray-100 py-20">
            <div className="container mx-auto px-6 lg:px-20 mt-16">
                <p className="text-lg text-gray-600 text-center mb-12 leading-relaxed">
                    Nuestra misión es proporcionar soluciones tecnológicas innovadoras para la industria agrícola, utilizando herramientas avanzadas como visión por computadora y blockchain.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 shadow-lg rounded-lg text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestra Misión</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Innovar y mejorar la producción agrícola mediante tecnologías de última generación.
                        </p>
                    </div>
                    <div className="bg-white p-8 shadow-lg rounded-lg text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestro Equipo</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Contamos con profesionales expertos en desarrollo web, inteligencia artificial y gestión agrícola.
                        </p>
                    </div>
                    <div className="bg-white p-8 shadow-lg rounded-lg text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestro Compromiso</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Garantizar la calidad, trazabilidad y sostenibilidad en cada una de nuestras soluciones.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


