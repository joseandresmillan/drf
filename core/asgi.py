#Existen dos metodos para enviar y recibir informacion 

#La funcion se ejecuta un paso a la vez, al terminarse de ejecutar envia un response


#Asincrono 




"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings') #Variables de ambiente y llama al archivo settings.

application = get_asgi_application()
 