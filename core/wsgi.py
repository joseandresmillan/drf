
'''WEB SERVER GATEWAY INTERFACE'''





'''Si el primer request toma mas tiempo de lo esperado al momento de ejecutar la funcion, salta al siguiente request y espera que se 
termine de ejecutar el primero 
'''
"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings') #Variables de ambiente y llama al archivo settings.

application = get_wsgi_application()
