"""
Utilidades para configuración de headers y MIME types en producción
"""

def add_headers_function(headers, path, url):
    """
    Función personalizada para agregar headers correctos a archivos estáticos
    Especialmente importante para CapRover donde WhiteNoise puede no detectar MIME types
    """
    # Mapear extensiones a tipos MIME correctos
    mime_types = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.map': 'application/json',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.webp': 'image/webp',
    }
    
    # Obtener la extensión del archivo
    import os
    _, ext = os.path.splitext(path.lower())
    
    # Aplicar el tipo MIME correcto si existe
    if ext in mime_types:
        headers['Content-Type'] = mime_types[ext]
    
    # Headers adicionales para archivos JS y CSS
    if ext in ['.js', '.css']:
        # Prevenir errores de MIME type
        headers['X-Content-Type-Options'] = 'nosniff'
        # Cache para archivos hasheados
        headers['Cache-Control'] = 'public, max-age=31536000'
    
    return headers
