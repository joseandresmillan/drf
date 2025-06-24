@echo off
REM Script para desarrollo con Docker en Windows
REM Uso: docker-dev.bat [start|stop|build|logs|shell]

set PROJECT_NAME=agencia-marketing

if "%1"=="start" (
    echo 🚀 Iniciando entorno de desarrollo...
    docker-compose --env-file .env.docker up -d
    echo ✅ Servicios iniciados:
    echo    - Aplicación: http://localhost:8000
    echo    - Admin: http://localhost:8000/admin
    echo    - Nginx: http://localhost:80
    goto :end
)

if "%1"=="stop" (
    echo 🛑 Deteniendo servicios...
    docker-compose down
    echo ✅ Servicios detenidos
    goto :end
)

if "%1"=="build" (
    echo 🔨 Construyendo imágenes...
    docker-compose build --no-cache
    echo ✅ Imágenes construidas
    goto :end
)

if "%1"=="rebuild" (
    echo 🔄 Reconstruyendo y reiniciando...
    docker-compose down
    docker-compose build --no-cache
    docker-compose --env-file .env.docker up -d
    echo ✅ Servicios reconstruidos y reiniciados
    goto :end
)

if "%1"=="logs" (
    echo 📋 Mostrando logs...
    docker-compose logs -f
    goto :end
)

if "%1"=="shell" (
    echo 🐚 Abriendo shell en el contenedor web...
    docker-compose exec web bash
    goto :end
)

if "%1"=="migrate" (
    echo 📦 Ejecutando migraciones...
    docker-compose exec web python manage.py migrate
    echo ✅ Migraciones aplicadas
    goto :end
)

if "%1"=="superuser" (
    echo 👤 Creando superusuario...
    docker-compose exec web python manage.py createsuperuser
    goto :end
)

if "%1"=="collect-static" (
    echo 📁 Recolectando archivos estáticos...
    docker-compose exec web python manage.py collectstatic --noinput
    echo ✅ Archivos estáticos recolectados
    goto :end
)

if "%1"=="clean" (
    echo 🧹 Limpiando contenedores y volúmenes...
    docker-compose down -v
    docker system prune -f
    echo ✅ Limpieza completada
    goto :end
)

echo 📖 Uso: %0 {start^|stop^|build^|rebuild^|logs^|shell^|migrate^|superuser^|collect-static^|clean}
echo.
echo Comandos disponibles:
echo   start          - Iniciar todos los servicios
echo   stop           - Detener todos los servicios
echo   build          - Construir las imágenes
echo   rebuild        - Reconstruir y reiniciar
echo   logs           - Ver logs en tiempo real
echo   shell          - Abrir shell en el contenedor
echo   migrate        - Ejecutar migraciones
echo   superuser      - Crear superusuario
echo   collect-static - Recolectar archivos estáticos
echo   clean          - Limpiar contenedores y volúmenes

:end
