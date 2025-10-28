from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from gestor.models import Expense
from gestor.serializers import ExpenseSerializer
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from datetime import datetime

class ExpensePagination(PageNumberPagination):
    page_size = 20  # Gastos por página
    page_size_query_param = 'page_size'
    max_page_size = 100

class ExpenseView(viewsets.ModelViewSet):
    
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ExpensePagination

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user, is_active=True)

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False,methods=['get'])
    def summary_by_month(self, request):
        data = (
            Expense.objects
            .filter(user=request.user)
            .annotate(month=TruncMonth('date'))
            .values('month')
            .annotate(total=Sum('amount'))
            .order_by('month')
        )
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def summary_by_category(self, request):
        user = request.user
        year = request.query_params.get('year')
        month = request.query_params.get('month')

        filters = {'user': user, 'category__isnull': False}
        if year:
            filters['date__year'] = year
        if month:
            filters['date__month'] = month

        if not Expense.objects.filter(**filters).exists():
            return Response([])

        data = (
            Expense.objects
            .filter(**filters)
            .values('category__name')
            .annotate(total=Sum('amount'))
            .order_by('-total')
        )

        return Response(data)

    @action(detail=False, methods=['get'])
    def summary_dashboard(self, request):
        user = request.user

        year = request.query_params.get('year')
        now = datetime.now()
        year = int(year) if year else now.year

        year_total = (
            Expense.objects
            .filter(user=user,date__year = year)
            .aggregate(total=Sum('amount'))['total'] or 0
        )
        
        month_total = (
            Expense.objects
            .filter(user=user,date__year=year,date__month=now.month)
            .aggregate(total=Sum('amount'))['total'] or 0
        )

        # Promedio mensual
        monthly_data = (
            Expense.objects
            .filter(user=user, date__year=year)
            .annotate(month=TruncMonth('date'))
            .values('month')
            .annotate(total=Sum('amount'))
        ) 

        average_expense = (
            sum(item['total'] for item in monthly_data) / len(monthly_data)
            if monthly_data else 0
        )

        data = {
            "year": year,
            "year_total": year_total,
            "month_total": month_total,
            "average_expense": round(average_expense, 2),
        }

        return Response(data)