#!/bin/bash
# Script para agregar SWAP en el droplet de CapRover

echo "🔧 Configurando SWAP para aumentar memoria disponible..."

# Verificar memoria actual
echo "📊 Memoria actual:"
free -h

# Crear archivo swap de 2GB
echo "💾 Creando archivo swap de 2GB..."
sudo fallocate -l 2G /swapfile

# Configurar permisos
sudo chmod 600 /swapfile

# Configurar como swap
sudo mkswap /swapfile

# Activar swap
sudo swapon /swapfile

# Hacer permanente
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verificar memoria después
echo "📊 Memoria después de agregar swap:"
free -h

echo "✅ SWAP configurado correctamente!"
