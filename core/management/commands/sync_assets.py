from django.core.management.base import BaseCommand
from core.assets import get_react_assets

class Command(BaseCommand):
    help = 'Sincroniza assets de React y muestra los hashes actuales'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🔍 SINCRONIZANDO ASSETS DE REACT...'))
        
        assets = get_react_assets()
        
        if assets['css']:
            self.stdout.write(
                self.style.SUCCESS(f'✅ CSS encontrado: {assets["css"]}')
            )
        else:
            self.stdout.write(
                self.style.ERROR('❌ CSS no encontrado')
            )
        
        if assets['js']:
            self.stdout.write(
                self.style.SUCCESS(f'✅ JS encontrado: {assets["js"]}')
            )
        else:
            self.stdout.write(
                self.style.ERROR('❌ JS no encontrado')
            )
        
        self.stdout.write(self.style.SUCCESS('\n📋 TODOS LOS ARCHIVOS EN MANIFEST:'))
        for key, path in assets['files'].items():
            self.stdout.write(f'   {key}: {path}')
        
        self.stdout.write(self.style.SUCCESS('\n🚀 ENTRYPOINTS:'))
        for entry in assets['entrypoints']:
            self.stdout.write(f'   {entry}')
        
        self.stdout.write(
            self.style.SUCCESS('\n✅ Sincronización completada. Los templates usarán automáticamente estos archivos.')
        )
