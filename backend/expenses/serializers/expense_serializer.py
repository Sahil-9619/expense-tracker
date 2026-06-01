from rest_framework import serializers
from expenses.models import Budget, Expense, Goal, Report, ReportFolder, Wallet



class ExpenseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = [
            'id', 'title', 'description', 'amount', 'category',
            'type', 'wallet', 'date', 'created_at', 'updated_at'
        ]



class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = [
            'id', 'user', 'title', 'description', 'amount', 'category',
            'type', 'wallet', 'date', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def to_internal_value(self, data):
        data = data.copy()
        if not data.get('title') and data.get('description'):
            data['title'] = data.get('description')
        if not data.get('description') and data.get('title'):
            data['description'] = data.get('title')
        return super().to_internal_value(data)

    def validate_title(self, value):
        if not value or value.strip() == "":
            raise serializers.ValidationError("Title is required")
        return value.strip()

    def validate_amount(self, value):
        if value is None:
            raise serializers.ValidationError("Amount is required")

        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than 0")

        return value

    def validate_category(self, value):
        if not value:
            raise serializers.ValidationError("Category is required")
        return value

    def validate_wallet(self, value):
        request = self.context.get('request')
        if value and request and value.user != request.user:
            raise serializers.ValidationError("Wallet does not belong to the current user")
        return value


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'user', 'name', 'type', 'balance', 'color', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def validate_name(self, value):
        if not value or value.strip() == "":
            raise serializers.ValidationError("Name is required")
        return value.strip()


class BudgetSerializer(serializers.ModelSerializer):
    spent = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = ['id', 'user', 'category', 'limit', 'color', 'spent', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'spent', 'created_at', 'updated_at']

    def get_spent(self, obj):
        total = obj.user.expenses.filter(type='expense', category=obj.category).values_list('amount', flat=True)
        return float(sum(total) or 0)

    def validate_category(self, value):
        if not value or value.strip() == "":
            raise serializers.ValidationError("Category is required")
        return value.strip()

    def validate_limit(self, value):
        if value <= 0:
            raise serializers.ValidationError("Limit must be greater than 0")
        return value


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'user', 'title', 'target', 'current', 'deadline', 'color', 'completed', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'completed', 'created_at', 'updated_at']

    def validate_title(self, value):
        if not value or value.strip() == "":
            raise serializers.ValidationError("Title is required")
        return value.strip()

    def validate_target(self, value):
        if value <= 0:
            raise serializers.ValidationError("Target must be greater than 0")
        return value


class ReportFolderSerializer(serializers.ModelSerializer):
    report_count = serializers.IntegerField(source='reports.count', read_only=True)

    class Meta:
        model = ReportFolder
        fields = ['id', 'user', 'name', 'report_count', 'created_at']
        read_only_fields = ['id', 'user', 'report_count', 'created_at']


class ReportSerializer(serializers.ModelSerializer):
    folder_name = serializers.CharField(source='folder.name', read_only=True)
    date = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = [
            'id', 'user', 'folder', 'folder_name', 'title', 'description',
            'report_type', 'size_label', 'date', 'generated_at'
        ]
        read_only_fields = ['id', 'user', 'folder_name', 'date', 'generated_at']

    def get_date(self, obj):
        return obj.generated_at.strftime('Generated %b %d')
