#!/usr/bin/env python3
"""
Script para testear la funcionalidad de assets dinámicos
"""

import os
import sys
import django
from pathlib import Path

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
sys.path.append(str(Path(__file__).parent))
django.setup()

from core.assets import get_react_assets
from core.context_processors import react_assets

def test_assets():
    print("🔍 TESTEANDO ASSETS DINÁMICOS")
    print("=" * 50)
    
    # Test 1: Función get_react_assets
    print("\n1️⃣ Testeando get_react_assets()...")
    assets = get_react_assets()
    
    print(f"   CSS encontrado: {assets['css']}")
    print(f"   JS encontrado: {assets['js']}")
    print(f"   Archivos en manifest: {len(assets['files'])}")
    print(f"   Entrypoints: {len(assets['entrypoints'])}")
    
    # Test 2: Context processor
    print("\n2️⃣ Testeando context processor...")
    
    # Simular request (puede ser None para este test)
    context = react_assets(request=None)
    
    print(f"   react_css: {context.get('react_css')}")
    print(f"   react_js: {context.get('react_js')}")
    
    # Test 3: Verificar archivos físicos
    print("\n3️⃣ Verificando archivos físicos...")
    
    if assets['css']:
        css_path = Path("build/static") / assets['css']
        print(f"   ✅ CSS existe: {css_path} - {css_path.exists()}")
    
    if assets['js']:
        js_path = Path("build/static") / assets['js']
        print(f"   ✅ JS existe: {js_path} - {js_path.exists()}")
    
    # Test 4: Simular el template
    print("\n4️⃣ Simulación de template...")
    print(f"   Template usará CSS: {context.get('react_css')}")
    print(f"   Template usará JS: {context.get('react_js')}")
    
    print("\n" + "=" * 50)
    
    if assets['css'] and assets['js']:
        print("🎉 ✅ ASSETS DINÁMICOS FUNCIONANDO CORRECTAMENTE")
        return True
    else:
        print("❌ 💥 PROBLEMAS CON ASSETS DINÁMICOS")
        return False

if __name__ == "__main__":
    test_assets()
