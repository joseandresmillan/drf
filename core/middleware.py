"""
Middleware personalizado para manejar tipos MIME
"""
from whitenoise.middleware import WhiteNoiseMiddleware
from django.http import HttpResponse
from django.conf import settings
import mimetypes
import os

class CustomWhiteNoiseMiddleware(WhiteNoiseMiddleware):
    """
    WhiteNoise middleware personalizado que configura tipos MIME específicos
    """
    
    def __init__(self, get_response, settings=None):
        super().__init__(get_response, settings)
        
        # Configurar tipos MIME manualmente
        mimetypes.add_type('application/javascript', '.js')
        mimetypes.add_type('application/javascript', '.jsx')
        mimetypes.add_type('application/javascript', '.ts')
        mimetypes.add_type('application/javascript', '.tsx')
        mimetypes.add_type('text/css', '.css')
        mimetypes.add_type('text/css', '.scss')
        mimetypes.add_type('text/css', '.sass')
        mimetypes.add_type('application/json', '.map')
        mimetypes.add_type('application/json', '.json')
        mimetypes.add_type('font/woff', '.woff')
        mimetypes.add_type('font/woff2', '.woff2')
        mimetypes.add_type('font/ttf', '.ttf')
        mimetypes.add_type('application/vnd.ms-fontobject', '.eot')
        mimetypes.add_type('image/svg+xml', '.svg')
        
    def process_request(self, request):
        """
        Procesar request y asegurar tipos MIME correctos
        """
        response = super().process_request(request)
        
        if response and hasattr(response, 'headers'):
            # Corregir tipos MIME específicos si es necesario
            if request.path.endswith('.js'):
                response['Content-Type'] = 'application/javascript'
            elif request.path.endswith('.css'):
                response['Content-Type'] = 'text/css'
                
        return response


class ProductionMimeTypeMiddleware:
    """
    Middleware específico para producción (CapRover) que fuerza tipos MIME correctos
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Aplicar para archivos estáticos independientemente del modo DEBUG
        if request.path.startswith('/static/'):
            # Obtener la extensión del archivo
            _, ext = os.path.splitext(request.path.lower())
            
            # Mapear extensiones a tipos MIME - CRÍTICO para CapRover
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
            
            # Forzar el tipo MIME correcto SIEMPRE
            if ext in mime_types:
                response['Content-Type'] = mime_types[ext]
                # Headers adicionales para seguridad
                response['X-Content-Type-Options'] = 'nosniff'
                
                # Log para debugging en producción
                print(f"MIME Fix: {request.path} -> {mime_types[ext]}")
        
        return response


class StaticFilesMimeTypeMiddleware:
    """
    Middleware para corregir MIME types de archivos estáticos en desarrollo
    """
    def __init__(self, get_response):
        self.get_response = get_response
        # Configurar tipos MIME adicionales
        mimetypes.add_type('application/javascript', '.js')
        mimetypes.add_type('text/css', '.css')
        mimetypes.add_type('application/json', '.map')

    def __call__(self, request):
        response = self.get_response(request)
        
        # Solo aplicar en desarrollo
        if settings.DEBUG and request.path.startswith('/static/'):
            # Obtener la extensión del archivo
            _, ext = os.path.splitext(request.path)
            
            # Mapear extensiones a tipos MIME
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
            }
            
            # Aplicar el tipo MIME correcto si está disponible
            if ext in mime_types and hasattr(response, '__setitem__'):
                response['Content-Type'] = mime_types[ext]
        
        return response
