from rest_framework import viewsets
from apps.common.permissions import IsSuperUser, IsSuperUserOrReadOnly
from .models import BlogPost, Category
from .serializers import BlogPostSerializer, BlogPostListSerializer, CategorySerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    permission_classes = [IsSuperUserOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        # Public users only see published posts
        if not (self.request.user.is_authenticated and self.request.user.is_superuser):
            qs = qs.filter(is_published=True)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsSuperUserOrReadOnly]
