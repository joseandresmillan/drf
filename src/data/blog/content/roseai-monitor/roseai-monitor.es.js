export const roseaiMonitorContentEs = `
<h1 style="text-align: center;">RoseAI: Agricultura de Precisión en el Borde</h1>
<p class="subtitle" style="text-align: center; font-size: 1.5em; color: #666; margin-bottom: 2rem;">Monitoreo Inteligente de Cultivos de Rosas con VineCam y Hailo-8</p>

<h2>El Desafío en la Floricultura</h2>

<p>En el corazón de Cayambe, Ecuador, a 2800 metros de altitud, el monitoreo diario del crecimiento y estado fenológico de las rosas es una tarea crítica. Tradicionalmente, identificar la transición entre un botón floral cerrado y una flor abierta a gran escala requiere de observación manual exhaustiva y propensa a errores.</p>

<img src="https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/cayambe_water_culture_landscape.png" alt="Paisaje de cultivos en Cayambe" style="width: 100%; border-radius: 8px; margin: 2rem 0;" />

<h2>La Solución Edge AI: VineCam System</h2>

<p>Para resolver este reto, implementamos el <strong>RoseAI Monitor</strong>, un sistema de visión artificial edge-AI que automatiza el seguimiento en campo. La arquitectura se basa en el ecosistema <strong>Hellbender VineCam</strong>, diseñado específicamente para entornos agrícolas desafiantes.</p>

<p>La red en campo se distribuye mediante una topología <strong>10BASE-T1S en configuración daisy-chain</strong>. Esta innovación permite conectar múltiples cámaras de 11.9 MP utilizando un solo par de cables que transmite tanto datos como energía (48V DC). Esto reduce drásticamente los costos de cableado y simplifica la instalación en los invernaderos.</p>

<img src="https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/cayambe_greenhouse_ai_monitoring.png" alt="Monitoreo AI en invernadero" style="width: 100%; border-radius: 8px; margin: 2rem 0;" />

<h2>Cerebro en el Borde: Hailo-8</h2>

<p>La magia ocurre en el servidor central (un nodo Raspberry Pi 5) equipado con un acelerador <strong>Hailo-8</strong>. En lugar de enviar cientos de imágenes de alta resolución a la nube, la inferencia se ejecuta localmente.</p>

<ul>
  <li><strong>Rendimiento:</strong> 26 TOPS de procesamiento neuronal con un consumo energético mínimo (alrededor de 5W).</li>
  <li><strong>Soberanía de Datos:</strong> Las imágenes nunca salen del cultivo, garantizando la privacidad y reduciendo los costos mensuales de nube a cero ($0/mo vs $200+ en soluciones cloud típicas).</li>
  <li><strong>Métricas en Tiempo Real:</strong> El sistema identifica automáticamente dos clases fundamentales (<code>rose_small</code> para botones y <code>rose_large</code> para flores abiertas), calculando el ratio de floración para generar alertas de cosecha precisas.</li>
</ul>

<img src="https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/lidar-botanical-rose-plate.jpg" alt="Análisis fenotípico de rosas" style="width: 100%; border-radius: 8px; margin: 2rem 0;" />

<h2>El Futuro del Fenotipado</h2>

<p>Con este pipeline técnico, RoseAI no solo cuenta flores, sino que abre la puerta a un análisis multidimensional del cultivo. El monitoreo constante permite proyectar métricas hacia un espacio de fenómica más amplio, detectando variaciones de crecimiento antes de que sean visibles a simple vista.</p>

<img src="https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/phenomics-hyperspace.png" alt="Espacio hiperespectral de fenómica" style="width: 100%; border-radius: 8px; margin: 2rem 0;" />

<p>Al combinar hardware industrial, aceleración de inferencia local y análisis computacional, RoseAI demuestra cómo la Inteligencia Artificial está redefiniendo los límites de la agricultura de precisión.</p>
`;