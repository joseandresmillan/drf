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
from django.views.static import serve
from django.http import HttpResponse
from rest_framework.routers import DefaultRouter
from apps.blog.views import BlogPostViewSet, CategoryViewSet
from apps.services.views import ServiceViewSet, ServiceCategoryViewSet
from apps.cases.views import CaseViewSet
from apps.contacts.views import ContactViewSet
from apps.common.admin_users import AdminUserViewSet
from . import views
import os

router = DefaultRouter()
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'services', ServiceViewSet, basename='services')
router.register(r'service-categories', ServiceCategoryViewSet, basename='service-categories')
router.register(r'cases', CaseViewSet, basename='cases')
router.register(r'contacts', ContactViewSet, basename='contacts')
router.register(r'admin-users', AdminUserViewSet, basename='admin-users')

def favicon_view(request):
    """Redirigir favicon.ico al archivo estático correcto"""
    try:
        from django.shortcuts import redirect
        return redirect('/static/favicon.ico')
    except:
        return HttpResponse(status=404)

# URLs principales
urlpatterns = [
    # Panel de administración de Django
    path('admin/', admin.site.urls),
    
    # Autenticación (Djoser y JWT)
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('favicon.ico', favicon_view, name='favicon'),
    
    # Health check
    path('health/', views.health_check, name='health-check'),
    
    # Test view
    path('test/', views.home_view, name='test-view'),
    
    # Django REST Framework - Interfaz de autenticación
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # API REST
    path('api/', include(router.urls)),
]

# Configuración para servir archivos estáticos y media
if settings.DEBUG:
    # En desarrollo: Servir archivos estáticos con tipos MIME correctos
    from django.views.static import serve
    import os
    
    # Servir archivos estáticos desde staticfiles
    urlpatterns += static(
        settings.STATIC_URL, 
        document_root=settings.STATIC_ROOT
    )
    
    # Servir archivos específicamente desde build (con override para desarrollo)
    urlpatterns += [
        re_path(
            r'^static/static/(?P<path>.*)$',
            serve,
            {'document_root': os.path.join(settings.BASE_DIR, 'build', 'static')},
        ),
        re_path(
            r'^static/(?P<path>favicon\.ico|manifest\.json|robots\.txt|logo.*\.png)$',
            serve,
            {'document_root': os.path.join(settings.BASE_DIR, 'build')},
        ),
    ]
    
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