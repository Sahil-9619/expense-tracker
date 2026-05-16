from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from expenses.serializers import ExpenseSerializer, ExpenseListSerializer
from expenses.services.expense_service import (
    get_all_expenses,
    get_expense_by_id,
    create_expense,
    update_expense,
    delete_expense
)

#SWAGGER SCHEMA
expense_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['title', 'amount', 'category'],
    properties={
        'title': openapi.Schema(type=openapi.TYPE_STRING),
        'amount': openapi.Schema(type=openapi.TYPE_NUMBER),
        'category': openapi.Schema(type=openapi.TYPE_STRING),
    },
)


@swagger_auto_schema(
    method='get',
    operation_summary="Get all expenses (user-specific)",
    responses={200: ExpenseListSerializer(many=True)}
)
@swagger_auto_schema(
    method='post',
    operation_summary="Create a new expense",
    request_body=expense_request_body,
    responses={201: ExpenseSerializer}
)
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def expense_list(request):
    user = request.user

    # GET (only user’s expenses)
    if request.method == 'GET':
        expenses = get_all_expenses().filter(user=user)
        serializer = ExpenseListSerializer(expenses, many=True)
        return Response(serializer.data)

    # CREATE (attach user)
    if request.method == 'POST':
        serializer = ExpenseSerializer(data=request.data)

        if serializer.is_valid():
            expense = create_expense(
                {**serializer.validated_data, "user": user}
            )
            return Response(
                ExpenseSerializer(expense).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#SWAGGER SCHEMA
expense_id_param = openapi.Parameter(
    'id',
    openapi.IN_PATH,
    description="Expense ID",
    type=openapi.TYPE_INTEGER
)


@swagger_auto_schema(
    method='get',
    operation_summary="Get expense by ID",
    manual_parameters=[expense_id_param],
    responses={200: ExpenseSerializer}
)
@swagger_auto_schema(
    method='put',
    operation_summary="Update expense",
    manual_parameters=[expense_id_param],
    request_body=expense_request_body,
    responses={200: ExpenseSerializer}
)
@swagger_auto_schema(
    method='delete',
    operation_summary="Delete expense",
    manual_parameters=[expense_id_param],
    responses={204: "Deleted successfully"}
)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def expense_detail(request, id):
    user = request.user
    expense = get_expense_by_id(id)

    if not expense:
        return Response(
            {"error": "Expense not found"},
            status=status.HTTP_404_NOT_FOUND
        )

   
    if expense.user != user:
        return Response({"error": "Unauthorized"}, status=403)

    # GET
    if request.method == 'GET':
        return Response(ExpenseSerializer(expense).data)

    # UPDATE
    if request.method == 'PUT':
        serializer = ExpenseSerializer(expense, data=request.data)

        if serializer.is_valid():
            updated = update_expense(expense, serializer.validated_data)
            return Response({
                "message": "Expense updated",
                "data": ExpenseSerializer(updated).data
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    if request.method == 'DELETE':
        delete_expense(expense)
        return Response(
            {"message": "Expense deleted"},
            status=status.HTTP_204_NO_CONTENT
        )
