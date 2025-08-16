from django.db import models

class User(models.Model):

    username = models.CharField(max_length=150, unique=True, verbose_name='Nombre de usuario')
    email = models.EmailField(unique=True, verbose_name='Correo electrónico')
    password = models.CharField(max_length=128, verbose_name='Contraseña')  # Nota: aquí no hay hash por simplicidad
    first_name = models.CharField(max_length=50, blank=True, null=True, verbose_name='Nombre')
    last_name = models.CharField(max_length=50, blank=True, null=True, verbose_name='Apellido')
    is_active = models.BooleanField(default=True, verbose_name='Activo')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')

    def __str__(self):
        return self.username