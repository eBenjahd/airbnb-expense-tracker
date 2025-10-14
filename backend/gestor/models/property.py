from django.db import models

class Property(models.Model):

    ''' Model representing a property. '''

    owner = models.ForeignKey(
        'User', on_delete=models.CASCADE, related_name='properties', verbose_name='Owner'
    )  # ForeignKey to User model representing the owner of the property
    property_name = models.CharField(max_length=100, verbose_name='Property Name')  # Name of the property
    address = models.CharField(max_length=255, verbose_name='Address')  # Address of the property
    is_active = models.BooleanField(default=True, verbose_name='Is Active')  # Status of the property

    def __str__(self):
        return self.property_name
    
    class Meta:
        ordering = ['property_name']
        verbose_name = 'Property'
        verbose_name_plural = 'Properties'
        unique_together = ("owner", "property_name")