import bananacv from "assets/img/bananacv.jpg";
import sleepcv from "assets/img/somnolenciacv.png";
import biopay from "assets/img/biopay.png";
import { BsPersonFill } from "react-icons/bs";

const posts = [
  {
    title: "Detección de Plagas con Visión por Computadora",
    href: "/casos",
    category: { name: "Solucion IoT", href: "/servicios" },
    description:
      "Utilizamos tecnologías avanzadas de visión por computadora para identificar y monitorear plagas en cultivos o espacios agrícolas. Nuestro sistema detecta anomalías en tiempo real, ayudando a los productores a tomar decisiones informadas y reducir pérdidas.",
    date: "Nov 20, 2024",
    datetime: "2024-11-20",
    imageUrl: bananacv,
    readingTime: "4 min",
    author: {
      name: "Andrés Millán",

      icon: BsPersonFill,
    },
  },
  {
    title:
      "Vision por computadora en la prevencion de accidentes por somnolencia",
    href: "/casos",
    category: { name: "Solución IoT", href: "/servicios" },
    description:
      "Utilizamos cámaras para capturar imágenes o videos del conductor el cual analiza patrones faciales, como parpadeos frecuentes, cierre de ojos prolongado, inclinación de la cabeza y otras señales de somnolencia.",
    date: "Oct 18, 2024",
    datetime: "2024-10-18",
    imageUrl: sleepcv,
    readingTime: "5 min",
    author: {
      name: "Ana Torres",
      href: "#",
      imageUrl:"",
      icon: BsPersonFill,
    },
  },
  {
    title: "Sistemas de pago biometricos",
    href: "/casos",
    category: { name: "Solucion para Retail", href: "/servicios" },
    description:
      "Pago seguro y rápido a través de reconocimiento facial, eliminando la necesidad de contacto físico y mejorando la experiencia del cliente con tecnología de vanguardia.",
    date: "Sept 30, 2024",
    datetime: "2024-09-30",
    imageUrl: biopay,
    readingTime: "8 min",
    author: {
      name: "Carlos Mendoza",
      href: "#",
      imageUrl: "",
      icon: BsPersonFill,
    },
  },
];

export default function UseCases() {
  return (
    <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto lg:mx-12 max-w-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Algunos de nuestros casos
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.title}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={post.imageUrl}
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href={post.category.href} className="hover:underline">
                      {post.category.name}
                    </a>
                  </p>
                  <a href={post.href} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {post.description}
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    {post.author.imageUrl ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.author.imageUrl}
                        alt={post.author.name}
                      />
                    ) : (
                      <post.author.icon className="text-gray-600 h-6 w-6" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={post.author.href} className="hover:underline">
                        {post.author.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} de lectura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
