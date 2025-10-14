from django.db import models
from django.conf import settings

class Category(models.Model):
    ''' Model representing a category for expenses. '''
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE, 
        related_name = "categories",
        null=True,
        blank=True,
    )
    category_name = models.CharField(max_length=100, verbose_name='Category Name')
    description = models.TextField(blank=True, null=True, verbose_name='Description')
    is_active = models.BooleanField(default=True, verbose_name='Is Active')  # para activar/desactivar categorías

    def __str__(self):
        return f'{self.category_name}({self.user})'

    class Meta:
        ordering = ['category_name']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        unique_together = ("user", "category_name")