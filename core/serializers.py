from django.contrib.auth import get_user_model
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreatePasswordRetypeSerializer as BaseCreateSerializer

User = get_user_model()


class CustomUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_superuser', 'is_staff')
        read_only_fields = ('id', 'username', 'is_superuser', 'is_staff')


class CustomUserCreateSerializer(BaseCreateSerializer):
    class Meta(BaseCreateSerializer.Meta):
        fields = ('id', 'username', 'email', 'password', 're_password')
