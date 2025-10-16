from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return Response({
            "message": "User created successfully",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
            },
            "tokens": {
                "refresh": str(refresh),
                "access": str(access)
            }
        }, status=status.HTTP_201_CREATED)