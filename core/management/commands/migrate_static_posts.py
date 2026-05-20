"""
Management command: migrate_static_posts
Migrates the static Raspberry Pi AI HAT blog post into the database.
Run once: python manage.py migrate_static_posts
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.blog.models import BlogPost, Category

User = get_user_model()

RASPBERRY_PI_CONTENT = """
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
  <li><strong>Rendimiento:</strong> Hasta <strong>13 TOPS</strong> (Tera-Operaciones Por Segundo)</li>
  <li><strong>Eficiencia Energética:</strong> Promedio de solo 2.5W</li>
  <li><strong>Propósito:</strong> Un chip especializado construido desde cero para ejecutar redes neuronales de manera eficiente, ofreciendo rendimiento de centro de datos en un paquete diminuto.</li>
</ul>

<h2>¿Por Qué Usar un Coprocesador de IA Dedicado?</h2>

<h3>CPU vs. Hailo-8L para Tareas de IA</h3>

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
      <li>Utilización de CPU muy baja (a menudo &lt; 5%)</li>
      <li>Velocidades de inferencia masivamente más rápidas (rendimiento en tiempo real)</li>
      <li>Extremadamente eficiente en energía (alto TOPS/Watt)</li>
      <li>Libera la CPU para el SO y otra lógica de aplicación</li>
    </ul>
  </div>
</div>

<h2>💡 Aplicaciones: ¿Qué Puedes Hacer Con Esto?</h2>

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

<h3>📋 Requisitos del Sistema</h3>
<ul>
  <li>✅ Raspberry Pi 5 (4GB u 8GB RAM recomendado)</li>
  <li>✅ Raspberry Pi AI HAT (con chip Hailo-8L)</li>
  <li>✅ Tarjeta MicroSD (mínimo 32GB)</li>
  <li>✅ Fuente de alimentación (5V/5A USB-C)</li>
  <li>✅ Raspberry Pi OS (Bookworm o posterior)</li>
</ul>

<h3>🔧 Paso 1: Actualizar tu Sistema</h3>
<pre><code>sudo apt update
sudo apt full-upgrade -y</code></pre>

<h3>📦 Paso 2: Instalar el Stack de Software Hailo</h3>
<pre><code>sudo apt install hailo-all
sudo reboot</code></pre>

<h3>⚙️ Paso 3: Habilitar Interfaz PCIe</h3>
<pre><code>sudo raspi-config
# Selecciona Advanced Options → PCIe speed → Yes → Finished</code></pre>

<h3>📥 Paso 4: Clonar el Repositorio de Aplicaciones Hailo</h3>
<pre><code>git clone https://github.com/hailo-ai/hailo-rpi5-examples.git</code></pre>

<h3>🎯 Paso 5: Ejecutar una Demo de Detección de Objetos</h3>
<pre><code>cd hailo-rpi5-examples
./install.sh
source setup_env.sh
python basic_pipelines/detection_simple.py -i usb</code></pre>

<h3>✅ Paso 6: Verificar la Instalación</h3>
<pre><code>hailortcli fw-control identify</code></pre>

<h2>🌾 Edge AI en la Agricultura: Impacto en el Mundo Real</h2>

<p>Mientras la IA basada en la nube ha dominado los titulares, el <strong>Edge AI</strong> está transformando silenciosamente industrias donde la conectividad es escasa y la latencia es inaceptable. La agricultura es el ejemplo perfecto.</p>

<ul>
  <li><strong>Sin necesidad de internet:</strong> Las fincas en Cayambe, Ecuador, están a 2,800 msnm. La cobertura 4G es irregular. Edge AI procesa todo localmente.</li>
  <li><strong>Decisiones en tiempo real:</strong> Una rosa lista para cosecha tiene una ventana óptima de 24 horas. La inferencia Edge en un Hailo-8L corre a 30 FPS.</li>
  <li><strong>Soberanía de datos:</strong> Las imágenes de cultivos nunca salen de la finca. Sin costos de almacenamiento en la nube.</li>
  <li><strong>Costo a escala:</strong> Procesar 4 cámaras diarias en la nube cuesta ~$200/mes. Una sola Raspberry Pi 5 + Hailo-8L hace lo mismo por $0/mes después de la compra de hardware.</li>
  <li><strong>Eficiencia energética:</strong> El Hailo-8L ofrece 13 TOPS con solo 5W — Edge AI no solo es más barato, es más ecológico.</li>
</ul>

<h2>🎯 Conclusiones Clave</h2>

<ul>
  <li><strong>🚀 Un Cambio de Paradigma:</strong> La combinación de Raspberry Pi 5 y Hailo-8L trae rendimiento de IA de clase centro de datos a una plataforma pequeña y asequible.</li>
  <li><strong>👥 Increíblemente Accesible:</strong> La integración de software a través del repositorio de Raspberry Pi OS elimina la complejidad de configuración.</li>
  <li><strong>♾️ Potencial Ilimitado:</strong> Desbloquea aplicaciones de IA en tiempo real, privadas y confiables para hobbyistas y pequeñas empresas.</li>
</ul>

<h2>Recursos Adicionales</h2>
<ul>
  <li><strong>Raspberry Pi:</strong> <a href="https://www.raspberrypi.com/" target="_blank" rel="noopener noreferrer">https://www.raspberrypi.com/</a></li>
  <li><strong>Hailo AI:</strong> <a href="https://hailo.ai/" target="_blank" rel="noopener noreferrer">https://hailo.ai/</a></li>
  <li><strong>Hailo RPi Apps Repo:</strong> <a href="https://github.com/hailo-ai/hailo-rpi5-examples" target="_blank" rel="noopener noreferrer">https://github.com/hailo-ai/hailo-rpi5-examples</a></li>
</ul>

<p style="text-align: center; margin-top: 3rem; font-size: 1.2em; color: #666;">
  💡 <em>El futuro de la IA está en el edge, y Raspberry Pi nos está llevando allí de manera accesible y práctica.</em>
</p>
"""


class Command(BaseCommand):
    help = 'Migrates the static Raspberry Pi AI HAT blog post into the database'

    def handle(self, *args, **options):
        # Get or create the author (first superuser)
        author = User.objects.filter(is_superuser=True).first()
        if not author:
            self.stdout.write(self.style.ERROR('No superuser found. Create one first.'))
            return

        # Get the Inteligencia Artificial category
        category, _ = Category.objects.get_or_create(
            slug='inteligencia-artificial',
            defaults={
                'name': 'Inteligencia Artificial',
                'description': 'Artículos sobre IA, machine learning y computer vision',
            }
        )

        # Create the post (skip if slug already exists)
        post, created = BlogPost.objects.get_or_create(
            slug='raspberry-pi-ai-hat',
            defaults={
                'title': 'Raspberry Pi y su AI HAT: Potenciando Proyectos de IA',
                'excerpt': (
                    'Descubre cómo el Raspberry Pi AI HAT está revolucionando los proyectos '
                    'de inteligencia artificial con computación al borde, permitiendo '
                    'procesamiento de IA en tiempo real sin necesidad de conexión a la nube.'
                ),
                'content': RASPBERRY_PI_CONTENT.strip(),
                'author': author,
                'category': category,
                'is_published': True,
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS(
                f'✅ Post creado: "{post.title}" (slug: {post.slug})'
            ))
        else:
            self.stdout.write(self.style.WARNING(
                f'⚠️  Post ya existe: "{post.title}" — no se modificó.'
            ))
