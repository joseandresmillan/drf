import React from "react";
import conteoWebp from "../../../assets/images/conteo.webp";
import conteoPng from "../../../assets/images/conteo.png";
import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";

export default function Conteo() {
  return (
    <Layout>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Conteo de Cajas con Visión por Computadora</h1>
        <picture>
          <source srcSet={conteoWebp} type="image/webp" />
          <img src={conteoPng} alt="Conteo de Cajas" className="rounded-lg shadow mb-8 w-full h-64 object-cover" />
        </picture>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Resumen</h2>
          <ul className="list-disc pl-6 text-lg">
            <li><b>Automatización Completa:</b> Sistema de conteo automático que elimina errores humanos en inventarios.</li>
            <li><b>Precisión Avanzada:</b> Algoritmos de deep learning con 99.5% de precisión en detección y conteo.</li>
            <li><b>Optimización Logística:</b> Procesamiento en tiempo real que acelera operaciones de almacén.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">🚀 Características Principales</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>📦 Detección automática de cajas y contenedores</li>
            <li>🔢 Conteo preciso en tiempo real</li>
            <li>📊 Clasificación por tamaño, tipo y estado</li>
            <li>📱 Dashboard de monitoreo en vivo</li>
            <li>🔄 Integración con sistemas ERP y WMS</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Tecnologías de Deep Learning</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>🤖 Redes neuronales YOLO para detección de objetos</li>
            <li>📸 Procesamiento de imágenes con OpenCV</li>
            <li>🐍 Backend optimizado en Python con TensorFlow</li>
            <li>☁️ Procesamiento distribuido para alta velocidad</li>
            <li>📊 Algoritmos de seguimiento multi-objeto</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Beneficios Operacionales</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>⚡ Reducción del 90% en tiempo de inventario</li>
            <li>🎯 Eliminación de errores humanos de conteo</li>
            <li>💰 Ahorro significativo en costos laborales</li>
            <li>📈 Mejora en la exactitud del inventario</li>
            <li>🔄 Actualizaciones automáticas en sistemas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Casos de Uso Específicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Almacenes y Distribución</h3>
              <ul className="list-disc pl-6 text-base">
                <li>📦 Conteo de entrada y salida</li>
                <li>🚛 Verificación de carga de camiones</li>
                <li>📋 Inventarios cíclicos automáticos</li>
                <li>🏷️ Control de ubicaciones</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Manufactura</h3>
              <ul className="list-disc pl-6 text-base">
                <li>🏭 Control de producción en línea</li>
                <li>📊 Monitoreo de stock de materia prima</li>
                <li>✅ Verificación de calidad por lotes</li>
                <li>📈 Métricas de productividad</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Resultados Medibles</h2>
          <div className="bg-blue-50 rounded p-4">
            <b>Impacto Comprobado</b>
            <ul className="list-disc pl-6 text-black mt-2">
              <li>📈 99.5% precisión en conteo automático</li>
              <li>⏱️ 90% reducción en tiempo de inventario</li>
              <li>💰 75% ahorro en costos operacionales</li>
              <li>🎯 100% eliminación de errores humanos</li>
              <li>📊 ROI positivo en menos de 6 meses</li>
            </ul>
          </div>
        </section>

        <p className="text-base text-gray-600 mt-8">Autor: Andrés Millán</p>
      </div>
      <Footer />
    </Layout>
  );
}