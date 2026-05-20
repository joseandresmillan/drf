from rest_framework import viewsets
from apps.common.permissions import IsSuperUserOrReadOnly
from .models import Case
from .serializers import CaseSerializer


class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [IsSuperUserOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        if not (self.request.user.is_authenticated and self.request.user.is_superuser):
            qs = qs.filter(is_published=True)
        return qs
