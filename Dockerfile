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

# Crear script de inicio
RUN echo '#!/bin/bash\n\
python manage.py collectstatic --noinput\n\
exec gunicorn --bind 0.0.0.0:8000 core.wsgi:application' > /app/start.sh && \
    chmod +x /app/start.sh

# Exponer puerto
EXPOSE 8000

# Comando por defecto
CMD ["/app/start.sh"]
