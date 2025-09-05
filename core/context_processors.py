from .assets import get_react_assets

def react_assets(request):
    """
    Context processor que hace disponibles los assets de React en todos los templates
    Se actualiza automáticamente cada vez que cambian los hashes
    """
    assets = get_react_assets()
    
    return {
        'react_css': assets['css'],
        'react_js': assets['js'],
        'react_assets': assets,
    }
