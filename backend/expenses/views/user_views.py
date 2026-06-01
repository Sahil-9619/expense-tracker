from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from expenses.serializers import UserSerializer, UserListSerializer
from expenses.services.user_service import (
    get_all_users,
    get_user_by_id,
    update_user,
    delete_user
)
from expenses.utils.password_utils import hash_password


#GET ALL 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):

    users = get_all_users()
    serializer = UserListSerializer(users, many=True)
    return Response(serializer.data)

#GET BY ID
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_detail(request, id):

    user = get_user_by_id(id)

    if not user:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

   
    if not hasattr(request, "user") or request.user.id != user.id:
        return Response({"error": "Unauthorized"}, status=403)

    
    if request.method == 'GET':
        return Response(UserListSerializer(user).data)

    #UPDATE
    if request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data

            # 🔐 hash password if present
            if "password" in data:
                data["password"] = hash_password(data["password"])

            updated = update_user(user, data)

            return Response({
                "message": "User updated",
                "data": UserListSerializer(updated).data
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #DELETE
    if request.method == 'DELETE':
        delete_user(user)
        return Response(
            {"message": "User deleted"},
            status=status.HTTP_204_NO_CONTENT
        )
