from rest_framework import viewsets
from apps.common.permissions import IsSuperUserOrReadOnly
from .models import Service, ServiceCategory
from .serializers import ServiceSerializer, ServiceListSerializer, ServiceCategorySerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    permission_classes = [IsSuperUserOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if not (self.request.user.is_authenticated and self.request.user.is_superuser):
            qs = qs.filter(is_active=True)
        return qs


class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [IsSuperUserOrReadOnly]
