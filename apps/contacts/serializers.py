from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
        read_only_fields = ['name', 'email', 'phone', 'message', 'created_at']


class ContactCreateSerializer(serializers.ModelSerializer):
    """Used for public contact form submissions."""

    class Meta:
        model = Contact
        fields = ['name', 'email', 'phone', 'message']
