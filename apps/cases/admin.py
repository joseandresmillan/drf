from django.contrib import admin
from .models import Case


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'is_published', 'created_at')
    list_filter = ('is_published',)
    search_fields = ('title', 'client')
    prepopulated_fields = {'slug': ('title',)}
