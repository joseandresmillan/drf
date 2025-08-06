# Dockerfile simplificado para Agencia de Marketing con MCP
FROM python:3.11-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=core.settings

# Crear usuario no-root
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /app

# Copiar requirements y instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código fuente del backend
COPY . .

# Crear directorios necesarios
RUN mkdir -p staticfiles media logs workspace

# Cambiar permisos
RUN chown -R appuser:appuser /app
USER appuser

# Crear script de inicio
RUN echo '#!/bin/bash\n\
set -e\n\
echo "🚀 Iniciando Agencia de Marketing..."\n\
\n\
# Verificar variables de entorno\n\
if [ -z "$SECRET_KEY" ]; then\n\
    echo "❌ ERROR: SECRET_KEY no está configurada"\n\
    exit 1\n\
fi\n\
\n\
# Verificar configuración de Django\n\
echo "✅ Verificando configuración..."\n\
python manage.py check\n\
\n\
# Aplicar migraciones\n\
echo "📦 Aplicando migraciones..."\n\
python manage.py migrate --noinput\n\
\n\
# Recopilar archivos estáticos\n\
echo "📁 Recolectando archivos estáticos..."\n\
python manage.py collectstatic --noinput\n\
\n\
# Crear superusuario si no existe (opcional)\n\
python manage.py shell -c "\
from django.contrib.auth import get_user_model;\
User = get_user_model();\
if not User.objects.filter(username='"'"'admin'"'"').exists():\
    User.objects.create_superuser('"'"'admin'"'"', '"'"'admin@agencia.com'"'"', '"'"'admin123'"'"');\
    print('"'"'✅ Superusuario creado: admin/admin123'"'"');\
else:\
    print('"'"'✅ Superusuario ya existe'"'"');" || echo "⚠️  No se pudo crear/verificar superusuario"\n\
\n\
# Iniciar servidor Django\n\
echo "🌐 Iniciando servidor Django en puerto 8000..."\n\
exec python manage.py runserver 0.0.0.0:8000' > /app/start.sh

RUN chmod +x /app/start.sh

# Exponer puerto
EXPOSE 8000

# Comando de inicio
CMD ["/app/start.sh"]