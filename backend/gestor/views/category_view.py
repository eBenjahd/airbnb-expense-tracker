from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from gestor.models import Category
from gestor.serializers import CategorySerializer

"""
    USING ModelViewSet BECAUSE WE REQUIRE FULL CRUD OPERATIONS.
    THE QUERYSET AND CREATION ARE FILTERED BY THE AUTHENTICATED USER.
"""

class CategoryView(viewsets.ModelViewSet):

    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user = self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user) # Automatically assign the logged-in user the category