#!/bin/bash

# Script para desarrollo con Docker
# Uso: ./docker-dev.sh [start|stop|build|logs|shell]

set -e

PROJECT_NAME="agencia-marketing"

case "$1" in
    start)
        echo "🚀 Iniciando entorno de desarrollo..."
        docker-compose --env-file .env.docker up -d
        echo "✅ Servicios iniciados:"
        echo "   - Aplicación: http://localhost:8000"
        echo "   - Admin: http://localhost:8000/admin"
        echo "   - Nginx: http://localhost:80"
        ;;
    
    stop)
        echo "🛑 Deteniendo servicios..."
        docker-compose down
        echo "✅ Servicios detenidos"
        ;;
    
    build)
        echo "🔨 Construyendo imágenes..."
        docker-compose build --no-cache
        echo "✅ Imágenes construidas"
        ;;
    
    rebuild)
        echo "🔄 Reconstruyendo y reiniciando..."
        docker-compose down
        docker-compose build --no-cache
        docker-compose --env-file .env.docker up -d
        echo "✅ Servicios reconstruidos y reiniciados"
        ;;
    
    logs)
        echo "📋 Mostrando logs..."
        docker-compose logs -f
        ;;
    
    shell)
        echo "🐚 Abriendo shell en el contenedor web..."
        docker-compose exec web bash
        ;;
    
    migrate)
        echo "📦 Ejecutando migraciones..."
        docker-compose exec web python manage.py migrate
        echo "✅ Migraciones aplicadas"
        ;;
    
    superuser)
        echo "👤 Creando superusuario..."
        docker-compose exec web python manage.py createsuperuser
        ;;
    
    collect-static)
        echo "📁 Recolectando archivos estáticos..."
        docker-compose exec web python manage.py collectstatic --noinput
        echo "✅ Archivos estáticos recolectados"
        ;;
    
    clean)
        echo "🧹 Limpiando contenedores y volúmenes..."
        docker-compose down -v
        docker system prune -f
        echo "✅ Limpieza completada"
        ;;
    
    *)
        echo "📖 Uso: $0 {start|stop|build|rebuild|logs|shell|migrate|superuser|collect-static|clean}"
        echo ""
        echo "Comandos disponibles:"
        echo "  start          - Iniciar todos los servicios"
        echo "  stop           - Detener todos los servicios"
        echo "  build          - Construir las imágenes"
        echo "  rebuild        - Reconstruir y reiniciar"
        echo "  logs           - Ver logs en tiempo real"
        echo "  shell          - Abrir shell en el contenedor"
        echo "  migrate        - Ejecutar migraciones"
        echo "  superuser      - Crear superusuario"
        echo "  collect-static - Recolectar archivos estáticos"
        echo "  clean          - Limpiar contenedores y volúmenes"
        exit 1
        ;;
esac
