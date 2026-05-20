from rest_framework import serializers
from .models import BlogPost, Category


class CategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'post_count', 'created_at']
        read_only_fields = ['slug', 'created_at']

    def get_post_count(self, obj):
        return obj.posts.filter(is_published=True).count()


class BlogPostListSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    category_slug = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'title_en', 'slug', 'excerpt', 'excerpt_en',
                  'image', 'author_name', 'category', 'category_name',
                  'category_slug', 'is_published', 'read_time', 'created_at']

    def get_author_name(self, obj):
        return obj.author.username if obj.author else None

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    def get_category_slug(self, obj):
        return obj.category.slug if obj.category else None


class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField(read_only=True)
    category_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ['slug', 'created_at', 'updated_at']

    def get_author_name(self, obj):
        return obj.author.username if obj.author else None

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None
