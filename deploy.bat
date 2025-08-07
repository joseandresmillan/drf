@echo off
REM Script de deployment para CapRover (Windows)
echo === INICIANDO DEPLOYMENT PARA CAPROVER ===

REM 1. Limpiar build anterior
if exist "build" (
    echo Limpiando build anterior...
    rmdir /s /q build
)

REM 2. Construir el frontend React
echo 1. Construyendo frontend React...
call npm run build

REM 3. Verificar que el build se generó correctamente
if not exist "build\static" (
    echo ERROR: No se encontró build\static después del build
    exit /b 1
)

echo Build de React completado exitosamente!
echo Archivos en build:
dir build

echo Archivos en build\static:
dir build\static

REM 4. Verificar archivos de media
if exist "build\static\media" (
    echo Archivos de media encontrados:
    dir build\static\media
) else (
    echo ADVERTENCIA: No se encontraron archivos de media
)

REM 5. Verificar archivos críticos
echo === VERIFICACION FINAL ===
echo Verificando archivos críticos...
if exist "build\static\css" echo ✓ CSS encontrado
if exist "build\static\js" echo ✓ JS encontrado  
if exist "build\static\media" echo ✓ Media encontrado
if exist "Dockerfile" echo ✓ Dockerfile encontrado
if exist "requirements.txt" echo ✓ Requirements encontrado

echo === LISTO PARA DEPLOYMENT ===
echo Ahora puedes hacer push a CapRover
echo El Dockerfile construirá React automáticamente en el contenedor
pause
