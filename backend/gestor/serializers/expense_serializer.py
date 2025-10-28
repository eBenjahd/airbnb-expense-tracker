from rest_framework import serializers
from gestor.models import Expense

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Expense
        fields = [
            'id',
            'user',
            'title',
            'amount',
            'payment_method',
            'category',
            'supplier',
            'description',
            'date',
            'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user if request else None

        expense = Expense.objects.create(
            user=user,
            **validated_data
        )

        return expense
