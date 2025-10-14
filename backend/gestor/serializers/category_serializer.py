from rest_framework import serializers
from gestor.models import Category

class CategorySerializer(serializers.ModelSerializer):

    class Meta: 
        model = Category
        fields = ['id','user','category_name','description','is_active']
        read_only_fields = ['id','is_active']