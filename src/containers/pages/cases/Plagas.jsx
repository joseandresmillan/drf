import React from "react";
import bananacv from "../../../assets/images/bananacv.jpg";
import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";

export default function Plagas() {
  return (
    <Layout>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Detección de Plagas con Visión por Computadora</h1>
        <img src={bananacv} alt="Plagas" className="rounded-lg shadow mb-8 w-full h-64 object-cover" />
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Resumen</h2>
          <ul className="list-disc pl-6 text-lg">
            <li><b>Monitoreo Inteligente:</b> Sistema 24/7 de detección temprana de plagas y enfermedades en cultivos.</li>
            <li><b>Deep Learning:</b> Algoritmos avanzados para identificación automática de anomalías en plantas.</li>
            <li><b>Intervención Preventiva:</b> Reducción de pérdidas hasta 40% y optimización del uso de pesticidas.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">🚀 Características Principales</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>🎥 Análisis automático de imágenes de cultivos</li>
            <li>🤖 Detección temprana de plagas y enfermedades</li>
            <li>📱 Alertas en tiempo real para agricultores</li>
            <li>📊 Dashboard de monitoreo y estadísticas</li>
            <li>🔄 Integración con sistemas de gestión agrícola</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Tecnologías de Deep Learning</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>🧠 Redes neuronales convolucionales (CNN)</li>
            <li>📸 Procesamiento de imágenes con OpenCV</li>
            <li>🐍 Backend optimizado en Python y FastAPI</li>
            <li>☁️ Inferencia en la nube para escalabilidad</li>
            <li>📊 Análisis predictivo de patrones de plagas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Impacto y Resultados</h2>
          <div className="bg-green-50 rounded p-4">
            <b>Beneficios Comprobados</b>
            <ul className="list-disc pl-6 text-black mt-2">
              <li>📈 Reducción del 40% en pérdidas de cultivos</li>
              <li>💰 Optimización del 60% en uso de pesticidas</li>
              <li>⏰ Detección temprana: 15 días antes que métodos tradicionales</li>
              <li>🎯 Precisión del 94% en identificación de plagas</li>
            </ul>
          </div>
        </section>

        <p className="text-base text-gray-600 mt-8">Autor: Andrés Millán</p>
      </div>
      <Footer />
    </Layout>
  );
}
