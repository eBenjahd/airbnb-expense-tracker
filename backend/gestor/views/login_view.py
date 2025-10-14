from rest_framework import status, views
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from gestor.serializers import LoginSerializer

'''
    I'M USING APIView BECAUSE LOGIN IS A CUSTOM ACTION 
    THAT DOESN'T REQUIRE STANDARD CRUD OPERATIONS.
    THIS VIEW HANDLES ONLY THE POST METHOD TO AUTHENTICATE USERS.
'''

class LoginView(views.APIView):
    
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']    

        refresh = RefreshToken.for_user(user=user)
        access = refresh.access_token

        return Response ({
            "message": 'Login Successful',
            "user" : {
                "id" : user.id,
                "name" : user.name,
                "email" : user.email
            },
            "tokens" : {
                "refresh" : str(refresh),
                "access" : str(access),
            }
        }, status=status.HTTP_200_OK)