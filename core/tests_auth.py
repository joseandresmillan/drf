from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status

User = get_user_model()


class AuthEndpointsTests(APITestCase):
    def setUp(self):
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword123',
            're_password': 'testpassword123',
            'email': 'testuser@example.com'
        }

    def _create_user(self):
        """Crea un usuario directamente en la DB (sin pasar por la API)."""
        data = self.user_data.copy()
        data.pop('re_password', None)
        return User.objects.create_user(**data)

    def _get_tokens(self):
        """Crea usuario y retorna sus tokens JWT {access, refresh}."""
        self._create_user()
        response = self.client.post(
            '/auth/jwt/create/',
            {'username': 'testuser', 'password': 'testpassword123'},
            secure=True
        )
        return response.data

    def test_user_creation(self):
        response = self.client.post('/auth/users/', self.user_data, secure=True)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

    def test_get_jwt_token(self):
        self._create_user()
        response = self.client.post(
            '/auth/jwt/create/',
            {'username': 'testuser', 'password': 'testpassword123'},
            secure=True
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_verify_jwt_token(self):
        tokens = self._get_tokens()
        response = self.client.post(
            '/auth/jwt/verify/',
            {'token': tokens['access']},
            secure=True
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_refresh_jwt_token(self):
        tokens = self._get_tokens()
        response = self.client.post(
            '/auth/jwt/refresh/',
            {'refresh': tokens['refresh']},
            secure=True
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_get_current_user_authenticated(self):
        tokens = self._get_tokens()
        self.client.credentials(HTTP_AUTHORIZATION=f"JWT {tokens['access']}")
        response = self.client.get('/auth/users/me/', secure=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser')
        self.assertEqual(response.data['email'], 'testuser@example.com')

    def test_get_current_user_unauthenticated(self):
        response = self.client.get('/auth/users/me/', secure=True)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
