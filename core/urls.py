"""
URL Configuration para Agencia de Marketing

La lista `urlpatterns` enruta URLs a vistas. Para más información visita:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

# URLs principales
urlpatterns = [
    # Panel de administración de Django
    path('admin/', admin.site.urls),
    
    # Django REST Framework - Interfaz de autenticación
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    # APIs de la aplicación
    # Descomenta y modifica según tus necesidades:
    # path('api/v1/auth/', include('apps.authentication.urls')),
    # path('api/v1/blog/', include('apps.blog.urls')),
    # path('api/v1/services/', include('apps.services.urls')),
]

# Configuración para servir archivos estáticos y media en desarrollo
if settings.DEBUG:
    # Archivos estáticos (CSS, JS, imágenes)
    urlpatterns += static(
        settings.STATIC_URL, 
        document_root=settings.STATIC_ROOT
    )
    
    # Archivos media (uploads de usuarios)
    urlpatterns += static(
        settings.MEDIA_URL, 
        document_root=settings.MEDIA_ROOT
    )

# React SPA - Catch-all pattern específico
# IMPORTANTE: Excluir rutas de API y admin del catch-all
urlpatterns += [
    re_path(
        r'^(?!admin|api|static|media).*$', 
        TemplateView.as_view(template_name='index.html'), 
        name='react-app'
    ),
]