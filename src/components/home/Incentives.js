import { FaSatelliteDish } from "react-icons/fa";
import { SiHiveBlockchain } from "react-icons/si";
import { GiTimeTrap } from "react-icons/gi";

const incentives = [
  {
    name: 'Adopción de Web 3',
    imageSrc: <SiHiveBlockchain className="h-16 w-16 text-blue-600" />,
    description:
      'Node.ec ofrece soluciones basadas en blockchain, asegurando transparencia, seguridad y trazabilidad en todas las etapas de tu operación.',
  },
  {
    name: 'Escalabilidad de Soluciones IoT y Web 3',
    imageSrc: <GiTimeTrap className="h-16 w-16 text-green-600" />,
    description:
      'Desde el inicio, nuestras soluciones están diseñadas para escalar, permitiendo integrar más dispositivos, más usuarios y más servicios conforme tu negocio se expande.',
  },
  {
    name: 'Interoperabilidad entre Sistemas ',
    imageSrc: <FaSatelliteDish className="h-16 w-16 text-yellow-600" />,
    description:
      'Facilitamos la integración fluida de diferentes plataformas tecnológicas, desde sistemas legacy hasta nuevas soluciones basadas en IoT, IA y Web 3.',
  },
];

export default function Incentives() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">¿Por qué elegir Node.ec?</h2>
            <p className="mt-4 text-lg text-gray-500">
            Te ayudamos a transformar tu negocio con soluciones innovadoras en IoT, IA, sistemas embebidos y más.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:flex-shrink-0">{incentive.imageSrc}</div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-lg font-medium text-gray-900">{incentive.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
