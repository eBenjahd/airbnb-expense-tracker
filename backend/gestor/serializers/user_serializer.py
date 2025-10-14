from rest_framework import serializers
from gestor.models import User

class UserSerializer(serializers.ModelSerializer):
    # THIS SERIALIZER IS FOR CREATING A USER 
    # NEED ALSO FOR A LOGIN AND LOGOUT VIEW 

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id','name','email','password','created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):

        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user
