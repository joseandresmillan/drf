
import React from "react";
import deteccion_en_muelleWebp from "../../../assets/images/deteccion_en_muelle.webp";
import deteccion_en_muellePng from "../../../assets/images/deteccion_en_muelle.png";
import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";

export default function Muelles() {
  return (
    <Layout>
      <Navbar />
  <div className="max-w-4xl mx-auto py-12 px-4 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Muelles Inteligentes: Visibilidad y Validación Automática</h1>
        <picture>
          <source srcSet={deteccion_en_muelleWebp} type="image/webp" />
          <img src={deteccion_en_muellePng} alt="Muelles" className="rounded-lg shadow mb-8 w-full h-64 object-cover" />
        </picture>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Resumen</h2>
          <ul className="list-disc pl-6 text-lg">
            <li><b>Visibilidad Total:</b> Monitoreo completo de operaciones de despacho en tiempo real con datos estructurados y visuales.</li>
            <li><b>Inteligencia Visual:</b> Computer Vision para análisis automático de cámaras y validación de procesos.</li>
            <li><b>Toma de Decisiones:</b> Datos precisos combinando información SAP con análisis visual automático.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">🧭 Guía Rápida de Navegación</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>📦 <b>Despachos:</b> Vista principal con métricas globales y tabla detallada de despachos por fecha.</li>
            <li>🚛 <b>Estado de Muelles:</b> Monitor en tiempo real del estado de cada muelle con cronómetros.</li>
            <li>🚀 <b>Módulos del Sistema:</b> Dashboard global, métricas, gráficos, filtros avanzados y actualización automática.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Monitor de Estado de Muelles</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>🚛 Estado en vivo de cada muelle de carga</li>
            <li>⏱️ Cronómetros de tiempo de carga activo</li>
            <li>🎨 Códigos de color intuitivos por estado</li>
            <li>📱 Vista responsiva para dispositivos móviles</li>
            <li>🔔 Alertas visuales de tiempo crítico</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">KPIs y Análisis de Despachos</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>📊 Treemaps interactivos por cliente y segmento</li>
            <li>📈 Totales mensuales y tendencias automáticas</li>
            <li>🎯 Indicadores de rendimiento por área</li>
            <li>📱 Visualizaciones dinámicas y filtros</li>
            <li>🔄 Comparativas históricas mensuales</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Computer Vision (Nuevo)</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>🎥 Análisis automático de cámaras de muelles</li>
            <li>🚛 Detección de vehículos y estado de carga</li>
            <li>📸 Procesamiento de imágenes en tiempo real</li>
            <li>🤖 Validación automática vs datos SAP</li>
            <li>📊 Complemento visual para datos estructurados</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">¿Por qué Computer Vision en Logística?</h2>
          <ul className="list-disc pl-6 text-lg">
            <li><b>Validación Automática:</b> Verifica automáticamente que los datos del sistema SAP coincidan con la realidad física de los muelles.</li>
            <li><b>Detección en Tiempo Real:</b> Identifica inmediatamente cuando un vehículo llega, se está cargando o ha terminado el proceso.</li>
            <li><b>Detección de Anomalías:</b> Alerta sobre discrepancias entre los datos del sistema y la situación real en los muelles.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">🔄 Integración de Datos: Estructurados + Visuales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Datos Estructurados (SAP)</h3>
              <ul className="list-disc pl-6 text-base">
                <li>📊 Información precisa y detallada</li>
                <li>📈 Histórico completo de transacciones</li>
                <li>🔢 Métricas exactas de tonelaje</li>
                <li>📅 Fechas y horarios registrados</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">⚠️ Limitaciones: Puede tener retrasos en actualización, no refleja situación física actual, depende de entrada manual correcta.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Datos No Estructurados (CV)</h3>
              <ul className="list-disc pl-6 text-base">
                <li>⚡ Información en tiempo real</li>
                <li>👁️ Situación física actual verificable</li>
                <li>🤖 Automatización sin intervención humana</li>
                <li>🚨 Detección inmediata de anomalías</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">⚠️ Limitaciones: Dependiente de condiciones ambientales, información menos detallada, requiere procesamiento e interpretación.</p>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">🔗 La Sinergia Perfecta: Datos + Visión</h2>
          <p className="text-base mb-2">La combinación de datos estructurados de SAP con Computer Vision crea un sistema de monitoreo completo y confiable. Mientras SAP proporciona el contexto detallado de cada despacho (cliente, productos, cantidades), Computer Vision valida y complementa esta información con la situación física real del muelle.</p>
          <div className="bg-blue-50 rounded p-4">
            <b>Ejemplo de Complementariedad</b>
            <ul className="list-disc pl-6 text-black">
              <li>📊 SAP dice: 'Muelle 3 - Cliente ABC - 25 TN - Inicio: 14:30'</li>
              <li>👁️ CV confirma: 'Vehículo presente en Muelle 3 - Carga activa'</li>
              <li>✅ Resultado: Información 100% verificada y confiable</li>
            </ul>
          </div>
        </section>
        <p className="text-base text-gray-600 mt-8">Autor: Andrés Millán</p>
      </div>
      <Footer />
    </Layout>
  );
}
