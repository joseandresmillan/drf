# Multi-stage Dockerfile para Agencia de Marketing con MCP
# Etapa 1: Build de React
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de Node.js
RUN npm ci --only=production

# Copiar código fuente del frontend
COPY src/ ./src/
COPY public/ ./public/
COPY tsconfig.json ./

# Build de la aplicación React
RUN npm run build

# Etapa 2: Configurar Python y Django
FROM python:3.11-slim AS backend

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    nodejs \
    npm \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Crear usuario no-root
RUN useradd --create-home --shell /bin/bash django

# Establecer directorio de trabajo
WORKDIR /app

# Copiar requirements y instalar dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Instalar servidores MCP
RUN pip install --no-cache-dir \
    mcp-server-time \
    mcp-server-github \
    mcp-server-filesystem \
    mcp-server-web-search

# Copiar código de Django
COPY . .

# Copiar build de React desde la etapa anterior
COPY --from=frontend-builder /app/frontend/build ./build/

# Crear directorios necesarios
RUN mkdir -p staticfiles media logs

# Configurar permisos
RUN chown -R django:django /app
USER django

# Recopilar archivos estáticos
RUN python manage.py collectstatic --noinput

# Crear script de inicio
COPY --chown=django:django <<EOF /app/start.sh
#!/bin/bash
set -e

echo "🚀 Iniciando Agencia de Marketing..."

# Aplicar migraciones
echo "📦 Aplicando migraciones..."
python manage.py migrate --noinput

# Crear superusuario si no existe
echo "👤 Configurando superusuario..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@agencia.com', 'admin123')
    print('✅ Superusuario creado: admin/admin123')
else:
    print('✅ Superusuario ya existe')
"

# Iniciar servidor Django
echo "🌐 Iniciando servidor Django..."
exec python manage.py runserver 0.0.0.0:8000
EOF

RUN chmod +x /app/start.sh

# Exponer puertos
EXPOSE 8000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/admin/ || exit 1

# Comando por defecto
CMD ["/app/start.sh"]