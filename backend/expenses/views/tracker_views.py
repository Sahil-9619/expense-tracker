from django.db.models import Sum
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from expenses.models import Budget, Goal, Report, ReportFolder
from expenses.serializers import (
    BudgetSerializer,
    GoalSerializer,
    ReportFolderSerializer,
    ReportSerializer,
)


def _list_create(request, model, serializer_class):
    if request.method == 'GET':
        serializer = serializer_class(model.objects.filter(user=request.user), many=True, context={'request': request})
        return Response(serializer.data)

    serializer = serializer_class(data=request.data, context={'request': request})
    if serializer.is_valid():
        instance = serializer.save(user=request.user)
        return Response(serializer_class(instance, context={'request': request}).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def _detail(request, model, serializer_class, id):
    try:
        instance = model.objects.get(id=id, user=request.user)
    except model.DoesNotExist:
        return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(serializer_class(instance, context={'request': request}).data)

    if request.method == 'PUT':
        serializer = serializer_class(instance, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            return Response(serializer_class(serializer.save(), context={'request': request}).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    instance.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)





@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def budget_list(request):
    return _list_create(request, Budget, BudgetSerializer)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def budget_detail(request, id):
    return _detail(request, Budget, BudgetSerializer, id)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def goal_list(request):
    return _list_create(request, Goal, GoalSerializer)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def goal_detail(request, id):
    return _detail(request, Goal, GoalSerializer, id)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def report_folder_list(request):
    return _list_create(request, ReportFolder, ReportFolderSerializer)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def report_list(request):
    if request.method == 'GET':
        reports = Report.objects.filter(user=request.user).select_related('folder')
        return Response(ReportSerializer(reports, many=True).data)

    folder_name = request.data.get('folder_name') or f"Fiscal {timezone.now().year}"
    folder, _ = ReportFolder.objects.get_or_create(user=request.user, name=folder_name)

    transaction_count = request.user.expenses.count()
    total_spend = request.user.expenses.filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0
    payload = {
        **request.data,
        "folder": folder.id,
        "title": request.data.get('title') or f"Financial Audit {timezone.now().strftime('%b %d')}",
        "description": request.data.get('description') or f"{transaction_count} transactions, spend total INR {total_spend}",
        "report_type": request.data.get('report_type') or "summary",
        "size_label": request.data.get('size_label') or f"{max(transaction_count, 1) * 0.4:.1f} MB",
    }

    serializer = ReportSerializer(data=payload)
    if serializer.is_valid():
        report = serializer.save(user=request.user)
        return Response(ReportSerializer(report).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def report_detail(request, id):
    return _detail(request, Report, ReportSerializer, id)
