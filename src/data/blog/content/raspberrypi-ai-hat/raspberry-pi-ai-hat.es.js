export const raspberryPiAiHatContentEs = `
<h1 style="text-align: center;">Supercargando la Raspberry Pi 5 </h1>
<p class="subtitle" style="text-align: center; font-size: 1.5em; color: #666; margin-bottom: 2rem;">Una Inmersión Profunda en el Coprocesador de IA Hailo-8L</p>

<h2>La Nueva Era del Edge AI</h2>

<p>El <strong>Edge AI</strong> significa ejecutar algoritmos de inteligencia artificial localmente en un dispositivo, justo donde se recopilan los datos. Esto evita el envío de información a un servidor en la nube remoto para su procesamiento.</p>

<p>El <strong>Raspberry Pi AI HAT</strong> con el chip Hailo-8L representa un salto cuántico en la democratización de la inteligencia artificial, trayendo rendimiento de centro de datos a una plataforma pequeña, asequible y eficiente en energía.</p>

<h2>☁️ Cloud AI vs. 🖥️ Edge AI</h2>

<p>Entender la diferencia es fundamental para apreciar el poder del Hailo-8L:</p>

<table>
  <thead>
    <tr>
      <th>Métrica</th>
      <th>Cloud AI</th>
      <th>Edge AI (Pi 5 + Hailo-8L)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>⚡ Latencia</strong></td>
      <td>Alta (dependiente de la red)</td>
      <td><strong>Muy Baja</strong> (instantánea, en el dispositivo)</td>
    </tr>
    <tr>
      <td><strong>🔒 Privacidad</strong></td>
      <td>Menor (datos sensibles enviados externamente)</td>
      <td><strong>Alta</strong> (los datos nunca salen del dispositivo)</td>
    </tr>
    <tr>
      <td><strong>📡 Ancho de Banda</strong></td>
      <td>Alto (requiere carga constante de datos)</td>
      <td><strong>Muy Bajo</strong> (solo se envían resultados, si acaso)</td>
    </tr>
    <tr>
      <td><strong>🛡️ Confiabilidad</strong></td>
      <td>Menor (requiere internet estable)</td>
      <td><strong>Alta</strong> (funciona completamente offline)</td>
    </tr>
    <tr>
      <td><strong>💰 Costos</strong></td>
      <td>Suscripciones y tarifas por uso</td>
      <td><strong>Sin costos recurrentes</strong></td>
    </tr>
  </tbody>
</table>

<h2>🔧 El Hardware: Una Combinación Perfecta</h2>

<h3>📟 Raspberry Pi 5</h3>
<ul>
  <li><strong>CPU:</strong> 2.4GHz quad-core 64-bit Arm Cortex-A76</li>
  <li><strong>GPU:</strong> VideoCore VII GPU</li>
  <li><strong>RAM:</strong> 4GB u 8GB LPDDR4X</li>
  <li><strong>🔑 Característica Clave:</strong> Interfaz <strong>PCIe 3.0 x1</strong>. Esta conexión de alta velocidad es lo que permite que el Pi se comunique eficazmente con el acelerador Hailo-8L.</li>
</ul>

<h3>🚀 Acelerador de IA Hailo-8L</h3>
<ul>
  <li><strong>Factor de Forma:</strong> M.2 Key-M</li>
  <li><strong>Rendimiento:</strong> Hasta <strong>26 TOPS</strong> (Tera-Operaciones Por Segundo)</li>
  <li><strong>Eficiencia Energética:</strong> Promedio de solo 2.5W</li>
  <li><strong>Propósito:</strong> Un chip especializado construido desde cero para ejecutar redes neuronales de manera eficiente, ofreciendo rendimiento de centro de datos en un paquete diminuto.</li>
</ul>

<h2> ¿Por Qué Usar un Coprocesador de IA Dedicado?</h2>

<h3> CPU vs. Hailo-8L para Tareas de IA</h3>

<p>Una CPU es un generalista, pero las cargas de trabajo de IA son tareas especializadas que involucran millones de cálculos matemáticos repetitivos. Una Unidad de Procesamiento Neural (NPU) dedicada como el Hailo-8L está construida específicamente para este trabajo.</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div>
    <h4>⚠️ Ejecutando IA en la CPU</h4>
    <ul>
      <li>Alta utilización de CPU (puede alcanzar el 100%)</li>
      <li>Velocidades de inferencia lentas (bajos FPS)</li>
      <li>Consume más energía para la misma tarea</li>
      <li>El sistema se vuelve poco responsive</li>
    </ul>
  </div>
  <div>
    <h4>✅ Delegando IA al Hailo-8L</h4>
    <ul>
      <li>Utilización de CPU muy baja (a menudo < 5%)</li>
      <li>Velocidades de inferencia masivamente más rápidas (rendimiento en tiempo real)</li>
      <li>Extremadamente eficiente en energía (alto TOPS/Watt)</li>
      <li>Libera la CPU para el SO y otra lógica de aplicación</li>
    </ul>
  </div>
</div>

<h2>💡 ¿Qué Puedes Hacer Con Esto? Aplicaciones</h2>

<p>Esta poderosa combinación habilita aplicaciones de IA sofisticadas directamente en el edge.</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div>
    <h3>🏢 Comercial e Industrial</h3>
    <ul>
      <li><strong>🏙️ Ciudades Inteligentes:</strong> Análisis de tráfico en tiempo real, reconocimiento de matrículas y estacionamiento inteligente</li>
      <li><strong>🛒 Analítica de Retail:</strong> Seguimiento anónimo de clientes para mapas de calor, monitoreo de stock en estanterías y gestión de colas</li>
      <li><strong>🏭 Automatización Industrial:</strong> Control de calidad visual en líneas de ensamblaje, detección de equipo de seguridad y alertas de mantenimiento predictivo</li>
    </ul>
  </div>
  <div>
    <h3>🏠 Hogar y Hobbyista</h3>
    <ul>
      <li><strong>🔐 Seguridad Avanzada del Hogar:</strong> Detección de personas, paquetes y vehículos en el dispositivo sin tarifas de suscripción</li>
      <li><strong>🤖 Robótica y Drones:</strong> Navegación autónoma y reconocimiento inteligente de objetos para proyectos personales</li>
      <li><strong>🎨 Proyectos Creativos:</strong> Interfaces de reconocimiento de gestos en tiempo real, cámaras inteligentes de vida silvestre que identifican especies, y más</li>
    </ul>
  </div>
</div>

<h2>🚀 Primeros Pasos: Instalación Fácil</h2>

<h3>Repositorios Nativos de Raspberry Pi OS</h3>

<p>Gracias a la asociación entre Raspberry Pi y Hailo, el software necesario está incluido directamente en los repositorios de Raspberry Pi OS. Esto hace que la instalación sea increíblemente simple.</p>

<h3>📋 Requisitos del Sistema</h3>
<ul>
  <li>✅ Raspberry Pi 5 (4GB u 8GB RAM recomendado)</li>
  <li>✅ Raspberry Pi AI HAT (con chip Hailo-8L)</li>
  <li>✅ Tarjeta MicroSD (mínimo 32GB)</li>
  <li>✅ Fuente de alimentación (5V/5A USB-C)</li>
  <li>✅ Raspberry Pi OS (Bookworm o posterior)</li>
</ul>

<h3>🔧 Paso 1: Actualizar tu Sistema</h3>

<p>Primero, asegúrate de que tu sistema esté actualizado para obtener los últimos paquetes y garantizar la compatibilidad.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copiar
    </button>
  </div>
  <div class="code-content">
<code>sudo apt update
sudo apt full-upgrade -y</code>
  </div>
</div>

<h3>📦 Paso 2: Instalar el Stack de Software Hailo</h3>

<p>Este único comando instala el driver, librerías de runtime, firmware y otras herramientas.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copiar
    </button>
  </div>
  <div class="code-content">
<code>sudo apt install hailo-all
sudo reboot</code>
  </div>
</div>

<h3>⚙️ Paso 3: Habilitar Interfaz PCIe y Reiniciar</h3>

<p>Esto habilitará la interfaz PCIe x1 a velocidades gen 3.0.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copiar
    </button>
  </div>
  <div class="code-content">
<code>sudo raspi-config
# Selecciona Advanced Options
# Selecciona PCIe speed
# Selecciona 'Yes' y presiona enter
# Selecciona 'Finished' y reinicia cuando se te indique</code>
  </div>
</div>

<h2>Ejecutar los Ejemplos de Hailo</h2>

<h3>📥 Paso 4: Clonar el Repositorio de Aplicaciones Hailo</h3>

<p>Hailo proporciona un repositorio de GitHub con una amplia gama de ejemplos preconstruidos que están listos para ejecutar. Clona este repositorio en tu directorio home.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copiar
    </button>
  </div>
  <div class="code-content">
<code>git clone https://github.com/hailo-ai/hailo-rpi5-examples.git</code>
  </div>
</div>

<h3>🎯 Paso 5: Ejecutar una Demo de Detección de Objetos</h3>

<p>Navega al directorio y ejecuta una demo de detección de objetos en tiempo real para una cámara USB conectada.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copiar
    </button>
  </div>
  <div class="code-content">
<code>cd hailo-rpi5-examples
./install.sh
source setup_env.sh
python basic_pipelines/detection_simple.py -i usb</code>
  </div>
</div>

<p> <strong>Este script accederá a una cámara conectada (como un módulo de cámara Pi o webcam USB) y abrirá una ventana mostrando el feed de video con cuadros delimitadores y etiquetas dibujadas alrededor de objetos detectados en tiempo real!</strong></p>

<h3>✅ Paso 6: Verificar la Instalación</h3>

<p>Verifica que el AI HAT sea detectado correctamente:</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copiar
    </button>
  </div>
  <div class="code-content">
<code>hailortcli fw-control identify</code>
  </div>
</div>

<p>Si todo funciona correctamente, deberías ver la información del AI HAT, confirmando la instalación exitosa.</p>


<h2>🌾 Edge AI en la Agricultura: El Impacto en el Mundo Real</h2>

<p>Mientras la IA basada en la nube ha dominado los titulares, el <strong>Edge AI</strong> está transformando silenciosamente industrias donde la conectividad es escasa y la latencia es inaceptable. La agricultura es el ejemplo perfecto.</p>

<h3>Por qué Edge supera a la Nube en el campo</h3>

<ul>
<li><strong>Sin necesidad de internet:</strong> Las fincas en Cayambe, Ecuador, están a 2,800 msnm. La cobertura 4G es irregular. Edge AI procesa todo localmente — cero dependencia de conectividad.</li>
<li><strong>Decisiones en tiempo real:</strong> Una rosa lista para cosecha tiene una ventana óptima de 24 horas. Los viajes de ida y vuelta a la nube añaden segundos de latencia. La inferencia Edge en un Hailo-8L corre a 30 FPS — la decisión ocurre en la cámara.</li>
<li><strong>Soberanía de datos:</strong> Las imágenes de cultivos nunca salen de la finca. Sin costos de almacenamiento en la nube, sin preocupaciones de privacidad, sin riesgos de filtración de datos.</li>
<li><strong>Costo a escala:</strong> Procesar 4 cámaras x imágenes 11.9 MP diarias en la nube cuesta ~$200/mes en tarifas de API. Una sola Raspberry Pi 5 + Hailo-8L hace lo mismo por $0/mes después de la compra de $200 en hardware.</li>
<li><strong>Eficiencia energética:</strong> El Hailo-8 ofrece 26 TOPS con solo 5W. Compáralo con una GPU en la nube consumiendo 300W por solicitud de inferencia — Edge AI no solo es más barato, es más ecológico.</li>
</ul>

<h3>La ventaja 10BASE-T1S</h3>

<p>El sistema VineCam de Hellbender utiliza <strong>10BASE-T1S</strong> — un bus de un solo par trenzado que transporta datos y alimentación de 48V. Un solo cable. Sin switches. Sin repetidores. Las cámaras se conectan en cadena a través del campo como luces navideñas. Esta es infraestructura edge diseñada para el mundo real, no para el centro de datos.</p>

<h2>🎯 Conclusión y Conclusiones Clave</h2>

<ul>
  <li>
    <h3>🚀 Un Cambio de Paradigma para Edge AI</h3>
    <p>La combinación de Raspberry Pi 5 y Hailo-8L trae <strong>rendimiento de IA de clase centro de datos</strong> a una plataforma pequeña, asequible y eficiente en energía.</p>
  </li>
  <li>
    <h3>👥 Increíblemente Accesible</h3>
    <p>La <strong>integración de software perfecta</strong> a través del repositorio de Raspberry Pi OS elimina el complejo proceso de configuración, haciendo que la IA poderosa sea accesible para todos.</p>
  </li>
  <li>
    <h3>♾️ Potencial Ilimitado</h3>
    <p>Esto desbloquea una amplia gama de posibilidades para <strong>aplicaciones de IA en tiempo real, privadas y confiables</strong> que antes estaban fuera del alcance de hobbyistas y pequeñas empresas.</p>
  </li>
</ul>

<h2>Recursos Adicionales</h2>

<ul>
  <li><strong>Raspberry Pi:</strong> <a href="https://www.raspberrypi.com/" target="_blank" rel="noopener noreferrer">https://www.raspberrypi.com/</a></li>
  <li><strong>Hailo AI:</strong> <a href="https://hailo.ai/" target="_blank" rel="noopener noreferrer">https://hailo.ai/</a></li>
  <li><strong>Hailo RPi Apps Repo:</strong> <a href="https://github.com/hailo-ai/hailo-rpi5-examples" target="_blank" rel="noopener noreferrer">https://github.com/hailo-ai/hailo-rpi5-examples</a></li>
</ul>

<p style="text-align: center; margin-top: 3rem; font-size: 1.2em; color: #666;">💡 <em>El futuro de la IA está en el edge, y Raspberry Pi nos está llevando allí de manera accesible y práctica.</em></p>
`;
