from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from apps.common.permissions import IsSuperUser
from .models import Contact
from .serializers import ContactSerializer, ContactCreateSerializer


class ContactViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Contact.objects.all()

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsSuperUser()]

    def get_serializer_class(self):
        if self.action == 'create':
            return ContactCreateSerializer
        return ContactSerializer
