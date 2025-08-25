import React from "react";
import bananacv from "../../../assets/images/bananacv.jpg";

export default function Plagas() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Detección de Plagas con Visión por Computadora</h1>
      <img src={bananacv} alt="Plagas" className="rounded-lg shadow mb-6 w-full h-64 object-cover" />
      <p className="text-lg mb-4">
        Desarrollamos un sistema avanzado de monitoreo agrícola que utiliza algoritmos de deep learning para identificar plagas y enfermedades en cultivos. Mediante análisis de imágenes en tiempo real, nuestro sistema detecta anomalías tempranas, permitiendo intervenciones preventivas que reducen pérdidas de hasta un 40% y optimizan el uso de pesticidas.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Monitoreo 24/7 de cultivos</li>
        <li>Alertas automáticas ante detección de plagas</li>
        <li>Integración con sistemas de gestión agrícola</li>
      </ul>
      <p className="text-base text-gray-600">Autor: Andrés Millán</p>
    </div>
  );
}
