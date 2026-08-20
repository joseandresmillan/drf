# Dockerfile optimizado para droplet de 2GB RAM
FROM node:18 AS frontend-builder

WORKDIR /app

# Configurar memoria para 2GB RAM (usar 1.2GB para el build)
ENV NODE_OPTIONS="--max-old-space-size=1200"
ENV GENERATE_SOURCEMAP=false
ENV INLINE_RUNTIME_CHUNK=false
ENV CI=false

# Instalar dependencias del sistema para Alpine (si fuera necesario)
# RUN apk add --no-cache python3 make g++

# Información del proceso
RUN echo "=== INICIANDO BUILD DE REACT ===" && \
    echo "NODE_OPTIONS: $NODE_OPTIONS" && \
    echo "Node version: $(node --version)" && \
    echo "NPM version: $(npm --version)"

# Copiar package files
COPY package*.json ./

# Instalar dependencias con manejo de errores mejorado
RUN echo "Instalando dependencias..." && \
    npm cache clean --force && \
    npm ci --legacy-peer-deps --verbose --no-optional && \
    echo "Dependencias instaladas exitosamente!" && \
    echo "Limpiando cache..." && \
    npm cache clean --force

# Copiar código fuente
COPY public/ ./public/
COPY src/ ./src/
COPY tailwind.config.js tsconfig.json ./

# Build optimizado.
#
# El tope de heap se fija AQUI y no en el ENV de arriba a proposito: cambiar
# aquel invalidaria la cache de npm ci, que es la capa mas cara de reconstruir.
#
# El host tiene 1.9GB de RAM y 1GB de swap, pero dockerd, el contenedor de
# produccion, hermes y las sesiones abiertas ya ocupan ~1GB, asi que al build
# le quedan unos 700-900MB reales. Con el tope heredado de 1200MB V8 crece por
# encima de ese presupuesto, empuja el resto del sistema a swap, la agota y el
# kernel mata el proceso a mitad del build: asi murieron v99 y v101. Con el
# tope por debajo del presupuesto real V8 recolecta de forma agresiva en vez
# de inflarse. La caja tiene 1 solo CPU, asi que terser no paraleliza.
RUN echo "Iniciando build de React..." && \
    NODE_OPTIONS="--max-old-space-size=512" npm run build && \
    echo "Build completado exitosamente!" && \
    ls -la build/static/

# CRA deja favicon/manifest/robots/logos en la raiz de build/, pero
# STATICFILES_DIRS solo apunta a build/static/, asi que collectstatic
# nunca los recoge. Se copian a build/static/ para que si lo haga.
RUN cp build/favicon.ico build/favicon.png build/manifest.json build/robots.txt build/logo192.png build/logo512.png build/static/ && \
    echo "Assets publicos copiados a build/static/" && \
    ls -la build/static/

# Verificar que las imágenes estén presentes
RUN if [ -d "build/static/media" ]; then \
        echo "✓ Imágenes encontradas:"; \
        ls -la build/static/media/; \
    else \
        echo "⚠ No se encontraron imágenes"; \
    fi

#################################################
# Segunda etapa: Django
#################################################
FROM python:3.12-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements y instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código Django
COPY . .

# Copiar build de React desde la primera etapa
COPY --from=frontend-builder /app/build ./build

# Script de inicio con verificaciones
RUN echo '#!/bin/bash\n\
set -e\n\
echo "=== VERIFICANDO BUILD DE REACT ==="\n\
if [ -d "/app/build/static" ]; then\n\
    echo "✓ Build de React encontrado"\n\
    echo "=== ARCHIVOS CSS DISPONIBLES ==="\n\
    ls -la /app/build/static/css/ || echo "❌ No hay archivos CSS"\n\
    echo "=== ARCHIVOS JS DISPONIBLES ==="\n\
    ls -la /app/build/static/js/ || echo "❌ No hay archivos JS"\n\
    if [ -d "/app/build/static/media" ]; then\n\
        echo "✓ Imágenes encontradas:"\n\
        ls -la /app/build/static/media/\n\
    fi\n\
else\n\
    echo "❌ ERROR: Build de React no encontrado"\n\
    exit 1\n\
fi\n\
echo "=== EJECUTANDO COLLECTSTATIC ==="\n\
python manage.py collectstatic --noinput --verbosity=2\n\
echo "=== VERIFICANDO STATICFILES ==="\n\
echo "=== ARCHIVOS CSS EN STATICFILES ==="\n\
ls -la /app/staticfiles/css/ || echo "❌ No hay CSS en staticfiles"\n\
echo "=== ARCHIVOS JS EN STATICFILES ==="\n\
ls -la /app/staticfiles/js/ || echo "❌ No hay JS en staticfiles"\n\
if [ -d "/app/staticfiles/media" ]; then\n\
    echo "✓ staticfiles/media creado:"\n\
    ls -la /app/staticfiles/media/\n\
fi\n\
echo "=== INICIANDO GUNICORN ==="\n\
exec gunicorn core.wsgi:application --bind 0.0.0.0:8080 --worker-class gthread --workers 2 --threads 4 --timeout 60 --graceful-timeout 30 --max-requests 1000 --max-requests-jitter 100\n\
' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 8080

CMD ["/app/start.sh"]
