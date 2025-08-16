from django.db import models

class Category(models.Model):
    ''' Model representing a category for expenses. '''

    category_name = models.CharField(max_length=100, unique=True, verbose_name='Category Name')
    description = models.TextField(blank=True, null=True, verbose_name='Description')
    is_active = models.BooleanField(default=True, verbose_name='Is Active')  # para activar/desactivar categorías

    def __str__(self):
        return self.category_name

    class Meta:
        ordering = ['category_name']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'