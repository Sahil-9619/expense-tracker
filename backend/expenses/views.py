from rest_framework.decorators import api_view  # type: ignore[reportMissingImports]
from rest_framework.response import Response  # type: ignore[reportMissingImports]
from rest_framework import status  # type: ignore[reportMissingImports]
from .models import Expense
from .serializers import ExpenseSerializer

@api_view(['GET', 'POST'])
def expense_list(request):
    if request.method == 'GET':
        expenses = Expense.objects.all()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)