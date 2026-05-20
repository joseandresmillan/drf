from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

User = get_user_model()

class AuthEndpointsTests(APITestCase):
    def setUp(self):
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword123',
            'email': 'testuser@example.com'
        }
        
    def test_user_creation(self):
        # Using djoser default URL pattern for user creation
        url = '/auth/users/'
        response = self.client.post(url, self.user_data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')
        
    def test_get_jwt_token(self):
        # First create a user
        User.objects.create_user(**self.user_data)
        
        # Then get a token
        # Using simplejwt default URL pattern (which djoser wraps)
        url = '/auth/jwt/create/'
        
        login_data = {
            'username': 'testuser',
            'password': 'testpassword123'
        }
        response = self.client.post(url, login_data)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
