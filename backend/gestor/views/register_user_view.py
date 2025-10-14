from rest_framework import generics
from rest_framework.permissions import AllowAny
from gestor.models import User
from gestor.serializers import UserSerializer

'''
    I'M CREATING THIS VIEW WITH GENERICS APIVIEW BECAUSE 
    IT DOESN'T REQUIRE TO EDIT, LIST OR DELETE.
'''

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]