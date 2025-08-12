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

# Build optimizado
RUN echo "Iniciando build de React..." && \
    npm run build && \
    echo "Build completado exitosamente!" && \
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
FROM python:3.11-slim

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
if [ -d "/app/staticfiles/media" ]; then\n\
    echo "✓ staticfiles/media creado:"\n\
    ls -la /app/staticfiles/media/\n\
fi\n\
echo "=== INICIANDO GUNICORN ==="\n\
exec gunicorn core.wsgi:application --bind 0.0.0.0:8080 --workers 2\n\
' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 8080

CMD ["/app/start.sh"]
