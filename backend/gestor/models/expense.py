from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
from decimal import Decimal
from .user import User 
from .category import Category

def today_date():
    return timezone.now().date() # This returns a date not datetime


class Expense(models.Model):
    
    ''' Model representing an expense. '''
    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash'),
        ('bank_transfer', 'Bank Transfer'),
        ('yape', 'Yape'),
        ('plin', 'Plin'),
        ('other', 'Other'),
    ]
 
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='expenses', 
        verbose_name='User'
        ) # ForeignKey to User model
    
    title = models.CharField(
        max_length=100, 
        verbose_name='Title'
        ) # Title of the expense
    
    amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(Decimal('0.01'))], 
        verbose_name='Amount',
        ) # Amount of the expense
    
    payment_method = models.CharField(
        max_length=20, 
        choices=PAYMENT_METHOD_CHOICES, 
        default='cash', 
        verbose_name='Payment Method'
    ) # Method of payment for the expense
    
    category = models.ForeignKey(Category,
        on_delete=models.SET_NULL,  # Si se borra la categoría, el gasto queda con category=null
        null=True,
        blank=True,
        related_name='expenses',
        verbose_name='Category',
    )
    supplier = models.CharField(
        max_length=100, 
        blank=True, 
        null=True, 
        verbose_name='Supplier'
        ) # Supplier of the expense
    
    description = models.TextField(
        blank=True, 
        null=True, 
        verbose_name='Description'
        ) # Description of the expense
    
    date = models.DateField(
        default=today_date,
        verbose_name='Date'
        ) # Date of the expense
    
    created_at = models.DateTimeField(
        auto_now_add=True, 
        verbose_name='Created At'
        ) # Date when the expense was created
    
    is_active = models.BooleanField(
        default= True,
        verbose_name='Is Active',
    )

    def __str__(self):
        return f'{self.title} - {self.amount} - {self.date}'
    
    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = 'Expense'
        verbose_name_plural = 'Expenses'