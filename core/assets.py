import json
import os
from django.conf import settings

def get_react_assets():
    """
    Lee el asset-manifest.json para obtener los archivos CSS y JS reales
    Funciona automáticamente sin importar los hashes generados
    """
    manifest_path = os.path.join(settings.BASE_DIR, 'build', 'asset-manifest.json')
    
    # Valores por defecto en caso de error
    assets = {
        'css': None,
        'js': None,
        'files': {},
        'entrypoints': []
    }
    
    try:
        if os.path.exists(manifest_path):
            with open(manifest_path, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
            
            # Obtener archivos y entrypoints
            assets['files'] = manifest.get('files', {})
            assets['entrypoints'] = manifest.get('entrypoints', [])
            
            # Buscar CSS y JS principales en entrypoints
            for entry in assets['entrypoints']:
                if entry.endswith('.css') and not assets['css']:
                    # Remover /static/ del inicio si existe
                    assets['css'] = entry.replace('/static/', '').replace('static/', '')
                elif entry.endswith('.js') and not assets['js']:
                    # Remover /static/ del inicio si existe
                    assets['js'] = entry.replace('/static/', '').replace('static/', '')
            
            # Si no encontramos en entrypoints, buscar en files
            if not assets['css'] or not assets['js']:
                for key, path in assets['files'].items():
                    if key == 'main.css' and not assets['css']:
                        assets['css'] = path.replace('/static/', '').replace('static/', '')
                    elif key == 'main.js' and not assets['js']:
                        assets['js'] = path.replace('/static/', '').replace('static/', '')
                        
        return assets
        
    except Exception as e:
        print(f"❌ Error leyendo asset-manifest.json: {e}")
        return assets
