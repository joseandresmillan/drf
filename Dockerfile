# Dockerfile para Agencia de Marketing - Django App
FROM python:3.11-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements y instalar dependencias Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código de la aplicación
COPY . /app/

# Crear directorio para archivos estáticos
RUN mkdir -p /app/staticfiles

# Crear script de inicio más robusto
RUN echo '#!/bin/bash\n\
echo "=== INICIANDO NODE-ENTERPRISE ==="\n\
echo "Verificando variables de entorno..."\n\
echo "SECRET_KEY: ${SECRET_KEY:0:10}..."\n\
echo "DEBUG: $DEBUG"\n\
echo "ALLOWED_HOSTS_DEPLOY: $ALLOWED_HOSTS_DEPLOY"\n\
echo "=== VERIFICANDO ARCHIVOS BUILD ==="\n\
echo "Contenido de build/static:"\n\
ls -la /app/build/static/ || echo "No existe build/static"\n\
echo "Contenido de build/static/media:"\n\
ls -la /app/build/static/media/ || echo "No existe build/static/media"\n\
echo "=== EJECUTANDO COLLECTSTATIC ==="\n\
python manage.py collectstatic --noinput --verbosity=2 || echo "Collectstatic falló, continuando..."\n\
echo "=== INICIANDO GUNICORN ==="\n\
echo "Ejecutando en puerto 8000..."\n\
exec gunicorn --bind 0.0.0.0:8000 --workers 2 --timeout 120 core.wsgi:application' > /app/start.sh && \
    chmod +x /app/start.sh

# Exponer puerto
EXPOSE 8000

# Comando por defecto
CMD ["/app/start.sh"]
