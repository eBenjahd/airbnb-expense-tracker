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
from datetime import date
import calendar

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

    @action(detail=False, methods=['get'])
    def summary_by_month(self, request):
        user = request.user

        from_month = request.query_params.get('from')  # YYYY-MM
        to_month = request.query_params.get('to')      # YYYY-MM

        qs = Expense.objects.filter(user=user)

        if from_month:
            y, m = map(int, from_month.split('-'))
            qs = qs.filter(date__gte=date(y, m, 1))

        if to_month:
            y, m = map(int, to_month.split('-'))
            last_day = calendar.monthrange(y, m)[1]
            qs = qs.filter(date__lte=date(y, m, last_day))

        data = (
            qs
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

            if not user.is_authenticated:
                return Response({"error": "User not authenticated"}, status=401)

            filters = {'user': user, 'category__isnull': False}

            if year:
                filters['date__year'] = int(year)
            if month:
                filters['date__month'] = int(month)

            if not Expense.objects.filter(**filters).exists():
                return Response([])

            data = (
                Expense.objects
                .filter(**filters)
                .annotate(period=TruncMonth('date'))
                .values('category__category_name','period')
                .annotate(total=Sum('amount'))
                .order_by('-total')
            )

            return Response(data, status=200)

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
    
    @action(detail=False, methods=['get'])
    def summary_by_category_month(self, request):
        user = request.user

        year = request.query_params.get('year')
        month = request.query_params.get('month')

        now = datetime.now()
        year = int(year) if year else now.year
        month = int(month) if month else now.month

        data = (
            Expense.objects
            .filter(
                user=user,
                date__year=year,
                date__month=month,
                category__isnull=False
            )
            .values('category__category_name')
            .annotate(total=Sum('amount'))
            .order_by('-total')
        )

        return Response(list(data), status=200)
