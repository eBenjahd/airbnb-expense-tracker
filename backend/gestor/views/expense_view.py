from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from gestor.models import Expense
from gestor.serializers import ExpenseSerializer

class ExpenseView(viewsets.ModelViewSet):
    
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user, is_active=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)