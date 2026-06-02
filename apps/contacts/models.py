from django.db import models


class ContactStatus(models.TextChoices):
    NEW = 'new', 'Nuevo'
    READ = 'read', 'Leído'
    REPLIED = 'replied', 'Respondido'


class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    message = models.TextField()
    status = models.CharField(
        max_length=10,
        choices=ContactStatus.choices,
        default=ContactStatus.NEW,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} <{self.email}>'
