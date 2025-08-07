#!/bin/bash

# Script de deployment para CapRover
echo "=== INICIANDO DEPLOYMENT PARA CAPROVER ==="

# 1. Construir el frontend React
echo "1. Construyendo frontend React..."
npm run build

# 2. Verificar que el build se generó correctamente
if [ ! -d "build/static" ]; then
    echo "ERROR: No se encontró build/static después del build"
    exit 1
fi

echo "Build de React completado exitosamente!"
echo "Archivos en build/static:"
ls -la build/static/

# 3. Verificar archivos de media
if [ -d "build/static/media" ]; then
    echo "Archivos de media encontrados:"
    ls -la build/static/media/
else
    echo "ADVERTENCIA: No se encontraron archivos de media"
fi

echo "=== LISTO PARA DEPLOYMENT ==="
echo "Puedes hacer push a CapRover ahora"
