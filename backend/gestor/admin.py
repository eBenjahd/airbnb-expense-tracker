from django.contrib import admin
from .models import User, Category, Property, Expense

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Property)
admin.site.register(Expense)