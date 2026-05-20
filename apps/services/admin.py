from django.contrib import admin
from .models import Service, ServiceCategory


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'name_en', 'slug', 'created_at')
    search_fields = ('name', 'name_en')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_active', 'is_popular', 'order')
    list_filter = ('is_active', 'is_popular', 'category')
    search_fields = ('name', 'name_en', 'description', 'description_en')
