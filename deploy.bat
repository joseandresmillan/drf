@echo off
REM Script de deployment para CapRover (Windows)
echo === INICIANDO DEPLOYMENT PARA CAPROVER ===

REM 1. Construir el frontend React
echo 1. Construyendo frontend React...
call npm run build

REM 2. Verificar que el build se generó correctamente
if not exist "build\static" (
    echo ERROR: No se encontró build\static después del build
    exit /b 1
)

echo Build de React completado exitosamente!
echo Archivos en build\static:
dir build\static

REM 3. Verificar archivos de media
if exist "build\static\media" (
    echo Archivos de media encontrados:
    dir build\static\media
) else (
    echo ADVERTENCIA: No se encontraron archivos de media
)

echo === LISTO PARA DEPLOYMENT ===
echo Puedes hacer push a CapRover ahora
pause
