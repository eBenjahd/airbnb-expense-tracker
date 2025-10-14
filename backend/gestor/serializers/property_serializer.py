from rest_framework import serializers
from gestor.models import Property

class PropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = ['id','property_name','address','is_active']
        read_only_fields = ['id','is_active']