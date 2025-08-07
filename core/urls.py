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
from . import views
import os

# URLs principales
urlpatterns = [
    # Panel de administración de Django
    path('admin/', admin.site.urls),
    
    # Health check
    path('health/', views.health_check, name='health-check'),
    
    # Test view
    path('test/', views.home_view, name='test-view'),
    
    # Django REST Framework - Interfaz de autenticación
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    # APIs de la aplicación
    # Descomenta y modifica según tus necesidades:
    # path('api/v1/auth/', include('apps.authentication.urls')),
    # path('api/v1/blog/', include('apps.blog.urls')),
    # path('api/v1/services/', include('apps.services.urls')),
]

# Configuración para servir archivos estáticos y media
if settings.DEBUG:
    # En desarrollo: Django sirve archivos estáticos
    urlpatterns += static(
        settings.STATIC_URL, 
        document_root=settings.STATIC_ROOT
    )
    
    # Archivos media (uploads de usuarios)
    urlpatterns += static(
        settings.MEDIA_URL, 
        document_root=settings.MEDIA_ROOT
    )
else:
    # En producción: WhiteNoise sirve STATIC, pero necesitamos MEDIA
    urlpatterns += static(
        settings.MEDIA_URL, 
        document_root=settings.MEDIA_ROOT
    )
    
    # IMPORTANTE: En producción, WhiteNoise automáticamente sirve archivos de STATIC_ROOT
    # que incluye todo el contenido de build/static después de collectstatic
    # No necesitamos rutas manuales adicionales para archivos estáticos

# React SPA - Catch-all pattern específico
# IMPORTANTE: Excluir rutas de API y admin del catch-all
urlpatterns += [
    # React app para todas las rutas (incluida la principal)
    re_path(
        r'^(?!admin|api|static|media|health|test).*$', 
        views.ReactAppView.as_view(), 
        name='react-app'
    ),
]