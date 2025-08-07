
from pathlib import Path
import os
import environ

# Initialize environment variables
env = environ.Env(
    # Set casting and default values
    DEBUG=(bool, False),
    SECRET_KEY=(str, 'django-insecure-fallback-key-only-for-emergency'),
    ALLOWED_HOSTS_DEV=(list, ['localhost', '127.0.0.1']),
    ALLOWED_HOSTS_DEPLOY=(list, ['node.ec', 'www.node.ec']),
    CORS_ORIGIN_WHITELIST_DEV=(str, 'http://localhost:3000'),
    CORS_ORIGIN_WHITELIST_DEPLOY=(str, 'https://node.ec,https://www.node.ec'),
    CSRF_TRUSTED_ORIGINS_DEV=(str, 'http://localhost:3000'),
    CSRF_TRUSTED_ORIGINS_DEPLOY=(str, 'https://node.ec,https://www.node.ec'),
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file
try:
    environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
except:
    pass  # En producción puede no existir el archivo .env

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

# Allowed hosts
# ALLOWED_HOSTS
ALLOWED_HOSTS_DEPLOY = env('ALLOWED_HOSTS_DEPLOY', default='localhost,127.0.0.1')

# Verificar si es una cadena o una lista
if isinstance(ALLOWED_HOSTS_DEPLOY, str):
    ALLOWED_HOSTS = [host.strip() for host in ALLOWED_HOSTS_DEPLOY.split(',') if host.strip()]
else:
    ALLOWED_HOSTS = list(ALLOWED_HOSTS_DEPLOY)

# Agregar hosts adicionales para CapRover
ALLOWED_HOSTS.extend([
    'node-enterprise.node.ec',  # Host de CapRover
    'node.ec',
    'www.node.ec'
])

# Agregar hosts adicionales si DEBUG está activado
if DEBUG:
    ALLOWED_HOSTS.extend(['localhost', '127.0.0.1', '0.0.0.0'])


# Application definition

# Aplicaciones pre instaladas por Django
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
] 

# Aplicaciones del proyecto
PROJECT_APPS = [
    # Aquí agregarás tus apps personalizadas
]

# Aplicaciones de terceros
THIRD_PARTY_APPS = [
    'corsheaders',
    'rest_framework',
]

INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS + THIRD_PARTY_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Para servir archivos estáticos
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'es'

TIME_ZONE = 'America/Bogota'  # Timezone correcto para Colombia (UTC-5)

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Additional locations of static files
STATICFILES_DIRS = [
    # Archivos compilados de React (CSS, JS, Media)
    os.path.join(BASE_DIR, 'build/static'),
    # Archivos estáticos de Django (admin, rest_framework, etc.)
    os.path.join(BASE_DIR, 'static'),
]

# Configuración adicional para producción
if not DEBUG:
    # Usar WhiteNoise simple sin compresión para evitar errores con archivos faltantes
    STATICFILES_STORAGE = 'whitenoise.storage.StaticFilesStorage'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly'
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}

# CORS Configuration
try:
    if env('DEBUG'):
        CORS_ALLOWED_ORIGINS = env('CORS_ORIGIN_WHITELIST_DEV').split(',')
        CSRF_TRUSTED_ORIGINS = env('CSRF_TRUSTED_ORIGINS_DEV').split(',')
    else:
        CORS_ALLOWED_ORIGINS = env('CORS_ORIGIN_WHITELIST_DEPLOY').split(',')
        CSRF_TRUSTED_ORIGINS = env('CSRF_TRUSTED_ORIGINS_DEPLOY').split(',')
        # Agregar configuraciones adicionales para producción
        CORS_ALLOW_ALL_ORIGINS = False
        CORS_ALLOW_CREDENTIALS = True
        
        # Configuraciones de seguridad adicionales para producción
        SECURE_SSL_REDIRECT = True
        SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
except:
    # Fallback seguro si las variables no están configuradas
    CORS_ALLOWED_ORIGINS = ['https://node.ec', 'https://www.node.ec']
    CSRF_TRUSTED_ORIGINS = ['https://node.ec', 'https://www.node.ec']
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOW_CREDENTIALS = True

# Logging Configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'django.log'),
            'formatter': 'verbose',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

