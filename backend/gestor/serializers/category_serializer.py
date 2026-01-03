from rest_framework import serializers
from gestor.models import Category

class CategorySerializer(serializers.ModelSerializer):

    class Meta: 
        model = Category
        fields = ['id','user','category_name','description','is_active']
        read_only_fields = ['id','is_active']

    def validate_category_name(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Category name cannot be empty."
        )
        
        request = self.context.get('request')
        user = request.user

        qs = Category.objects.filter(
            user=user,
            category_name__iexact=value
        )

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            raise serializers.ValidationError(
                "This category already exists."
            )

        return value