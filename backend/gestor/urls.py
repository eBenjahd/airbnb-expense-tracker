from rest_framework import routers
from django.urls import path, include
from .views import RegisterView, LoginView, ChangePasswordView, CategoryView, ExpenseView, PropertyView

router = routers.DefaultRouter()

router.register(r'categories', CategoryView, basename='category')
router.register(r'expenses', ExpenseView, basename='expense')
router.register(r'properties', PropertyView, basename='property')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(),name='register'),
    path('login/', LoginView.as_view(),name='login'),
    path('change-password/', ChangePasswordView.as_view(),name='change-password')
]