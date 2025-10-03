#!/usr/bin/env python3
"""
Script de validación completa para configuración estática y MIME types
Ejecutar antes de cada deploy para asegurar que todo esté configurado correctamente
"""

import os
import sys
import json
import mimetypes
import subprocess
from pathlib import Path

# Colores para output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    END = '\033[0m'
    BOLD = '\033[1m'

def log(msg, color=Colors.CYAN):
    print(f"{color}{msg}{Colors.END}")

def success(msg):
    print(f"{Colors.GREEN}✅ {msg}{Colors.END}")

def error(msg):
    print(f"{Colors.RED}❌ {msg}{Colors.END}")

def warning(msg):
    print(f"{Colors.YELLOW}⚠️  {msg}{Colors.END}")

def check_file_exists(file_path, description):
    """Verifica si un archivo existe"""
    if os.path.exists(file_path):
        success(f"{description}: {file_path}")
        return True
    else:
        error(f"{description} NO ENCONTRADO: {file_path}")
        return False

def check_build_assets():
    """Verifica que los assets del build estén presentes"""
    log("\n🔍 VERIFICANDO ASSETS DEL BUILD...")
    
    build_dir = Path("build")
    if not build_dir.exists():
        error("Directorio build/ no existe. Ejecuta 'npm run build' primero")
        return False
    
    # Verificar archivo principal
    index_html = build_dir / "index.html"
    if not check_file_exists(str(index_html), "index.html"):
        return False
    
    # Verificar asset-manifest
    manifest_path = build_dir / "asset-manifest.json"
    if not check_file_exists(str(manifest_path), "asset-manifest.json"):
        return False
    
    # Leer manifest para obtener archivos reales
    try:
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
        
        files = manifest.get('files', {})
        entrypoints = manifest.get('entrypoints', [])
        
        log("📋 ARCHIVOS EN MANIFEST:")
        for key, path in files.items():
            print(f"   {key}: {path}")
        
        log("🚀 ENTRYPOINTS:")
        for entry in entrypoints:
            print(f"   {entry}")
            
        # Verificar que los archivos CSS y JS principales existan
        css_files = [f for f in entrypoints if f.endswith('.css')]
        js_files = [f for f in entrypoints if f.endswith('.js')]
        
        if css_files:
            css_path = build_dir / css_files[0].lstrip('/')
            check_file_exists(str(css_path), "Archivo CSS principal")
        
        if js_files:
            js_path = build_dir / js_files[0].lstrip('/')
            check_file_exists(str(js_path), "Archivo JS principal")
            
        return True
        
    except Exception as e:
        error(f"Error leyendo asset-manifest.json: {e}")
        return False

def check_django_config():
    """Verifica la configuración de Django"""
    log("\n🔍 VERIFICANDO CONFIGURACIÓN DJANGO...")
    
    # Verificar que Django funcione
    try:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
        import django
        django.setup()
        
        from django.conf import settings
        
        # Verificar configuraciones críticas
        success(f"DEBUG: {settings.DEBUG}")
        success(f"STATIC_URL: {settings.STATIC_URL}")
        success(f"STATIC_ROOT: {settings.STATIC_ROOT}")
        success(f"STATICFILES_DIRS: {settings.STATICFILES_DIRS}")
        
        # Verificar middleware de WhiteNoise
        if 'whitenoise.middleware.WhiteNoiseMiddleware' in settings.MIDDLEWARE:
            success("WhiteNoise middleware está configurado")
        else:
            error("WhiteNoise middleware NO está configurado")
        
        # Verificar configuraciones de WhiteNoise
        if hasattr(settings, 'WHITENOISE_ADD_HEADERS_FUNCTION'):
            success(f"WHITENOISE_ADD_HEADERS_FUNCTION: {settings.WHITENOISE_ADD_HEADERS_FUNCTION}")
        
        if hasattr(settings, 'WHITENOISE_MIMETYPES'):
            success("WHITENOISE_MIMETYPES está configurado")
            log("📋 TIPOS MIME CONFIGURADOS:")
            for ext, mime in settings.WHITENOISE_MIMETYPES.items():
                print(f"   {ext}: {mime}")
        
        return True
        
    except Exception as e:
        error(f"Error en configuración Django: {e}")
        return False

def check_mime_types():
    """Verifica configuración de tipos MIME"""
    log("\n🔍 VERIFICANDO TIPOS MIME...")
    
    # Verificar tipos MIME básicos
    js_mime = mimetypes.guess_type('test.js')[0]
    css_mime = mimetypes.guess_type('test.css')[0]
    
    success(f"MIME para .js: {js_mime}")
    success(f"MIME para .css: {css_mime}")
    
    if js_mime != 'application/javascript':
        warning(f"MIME para .js debería ser 'application/javascript', es '{js_mime}'")
    
    if css_mime != 'text/css':
        warning(f"MIME para .css debería ser 'text/css', es '{css_mime}'")
    
    return True

def check_utils_function():
    """Verifica que la función utils esté disponible"""
    log("\n🔍 VERIFICANDO FUNCIÓN UTILS...")
    
    try:
        from core.utils import add_headers_function
        success("Función add_headers_function importada correctamente")
        
        # Test básico de la función
        test_url = '/static/js/main.123.js'
        headers = {}
        add_headers_function(test_url, headers, lambda: None)
        
        if 'Content-Type' in headers:
            success(f"Función utils establece Content-Type: {headers['Content-Type']}")
        else:
            warning("Función utils no está estableciendo Content-Type")
        
        return True
        
    except Exception as e:
        error(f"Error importando función utils: {e}")
        return False

def check_template_hashes():
    """Verifica que los hashes en template coincidan con build"""
    log("\n🔍 VERIFICANDO HASHES EN TEMPLATE...")
    
    template_path = Path("templates/index.html")
    if not template_path.exists():
        error("templates/index.html no existe")
        return False
    
    with open(template_path, 'r') as f:
        template_content = f.read()
    
    # Extraer hashes del template
    import re
    css_match = re.search(r'main\.([a-f0-9]+)\.css', template_content)
    js_match = re.search(r'main\.([a-f0-9]+)\.js', template_content)
    
    if css_match:
        css_hash = css_match.group(1)
        success(f"Hash CSS en template: {css_hash}")
        
        # Verificar que el archivo exista
        css_file = Path(f"build/static/css/main.{css_hash}.css")
        if css_file.exists():
            success(f"Archivo CSS con hash existe: {css_file}")
        else:
            error(f"Archivo CSS con hash NO existe: {css_file}")
    
    if js_match:
        js_hash = js_match.group(1)
        success(f"Hash JS en template: {js_hash}")
        
        # Verificar que el archivo exista
        js_file = Path(f"build/static/js/main.{js_hash}.js")
        if js_file.exists():
            success(f"Archivo JS con hash existe: {js_file}")
        else:
            error(f"Archivo JS con hash NO existe: {js_file}")
    
    return True

def main():
    """Función principal de validación"""
    log(f"{Colors.BOLD}🚀 VALIDACIÓN COMPLETA DE CONFIGURACIÓN{Colors.END}")
    log("=" * 60)
    
    all_good = True
    
    # Ejecutar todas las verificaciones
    checks = [
        check_build_assets,
        check_django_config,
        check_mime_types,
        check_utils_function,
        check_template_hashes,
    ]
    
    for check in checks:
        try:
            if not check():
                all_good = False
        except Exception as e:
            error(f"Error en verificación {check.__name__}: {e}")
            all_good = False
    
    log("\n" + "=" * 60)
    if all_good:
        success("🎉 TODAS LAS VERIFICACIONES PASARON - LISTO PARA DEPLOY")
        return 0
    else:
        error("💥 ALGUNAS VERIFICACIONES FALLARON - REVISAR ANTES DE DEPLOY")
        return 1

if __name__ == "__main__":
    sys.exit(main())
