#!/bin/bash
# Script optimizado para build de React en Docker

echo "🚀 Iniciando build de React con optimizaciones de memoria..."

# Configurar variables de ambiente para optimizar memoria
export NODE_OPTIONS="--max-old-space-size=4096 --optimize-for-size --gc-interval=100"
export GENERATE_SOURCEMAP=false
export INLINE_RUNTIME_CHUNK=false

# Limpiar cache si existe
if [ -d "node_modules/.cache" ]; then
    echo "🧹 Limpiando cache..."
    rm -rf node_modules/.cache
fi

# Ejecutar build
echo "📦 Construyendo aplicación React..."
npm run build

echo "✅ Build completado!"
