from rest_framework import serializers
from expenses.models import Expense



class ExpenseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'title', 'amount', 'category']



class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

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