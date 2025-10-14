from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from gestor.models import Property
from gestor.serializers import PropertySerializer

class PropertyView(viewsets.ModelViewSet):

    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user, is_active=True)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)