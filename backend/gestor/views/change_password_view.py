from rest_framework import status, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from gestor.serializers import ChangePasswordSerializer

"""
    I'M USING APIView BECAUSE THIS VIEW IS A CUSTOM ACTION.
    THIS VIEW HANDLES ONLY THE PUT METHOD TO CHANGE THE CURRENT USER'S PASSWORD.
"""

class ChangePasswordView(views.APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request):

        serializer = ChangePasswordSerializer(data=request.data, context={"request" : request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "message" : "Password changed successfully.",
        }, status= status.HTTP_200_OK)