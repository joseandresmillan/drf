from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from datetime import datetime

def home_view(request):
    """Vista simple para testing"""
    context = {
        'current_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')
    }
    return render(request, 'test.html', context)

def health_check(request):
    """Health check endpoint"""
    return HttpResponse("OK - Django is running!", content_type="text/plain")

class ReactAppView(TemplateView):
    template_name = 'index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['current_time'] = datetime.now()
        return context
