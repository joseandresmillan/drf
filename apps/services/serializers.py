from rest_framework import serializers
from .models import Service, ServiceCategory


class ServiceCategorySerializer(serializers.ModelSerializer):
    service_count = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'name_en', 'slug', 'description', 'service_count', 'created_at']
        read_only_fields = ['slug', 'created_at']

    def get_service_count(self, obj):
        return obj.services.filter(is_active=True).count()


class ServiceListSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    category_name_en = serializers.SerializerMethodField()
    category_slug = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'name_en', 'description', 'description_en',
            'category', 'category_name', 'category_name_en', 'category_slug',
            'icon_name', 'price', 'is_active', 'is_popular', 'order',
        ]

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    def get_category_name_en(self, obj):
        return obj.category.name_en if obj.category else None

    def get_category_slug(self, obj):
        return obj.category.slug if obj.category else None


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField(read_only=True)
    category_name_en = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Service
        fields = '__all__'

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    def get_category_name_en(self, obj):
        return obj.category.name_en if obj.category else None
