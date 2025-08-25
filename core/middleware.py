"""
Middleware personalizado para manejar tipos MIME
"""
from whitenoise.middleware import WhiteNoiseMiddleware
import mimetypes

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
