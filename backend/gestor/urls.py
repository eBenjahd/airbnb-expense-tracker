from rest_framework import routers
from django.urls import path, include
from .views import UserViewSet, CategoryViewSet, PropertyViewSet, ExpenseViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]