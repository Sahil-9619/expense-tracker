from rest_framework import serializers
from expenses.models import User


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }

    def validate_name(self, value):
        if not value or value.strip() == "":
            raise serializers.ValidationError("Name is required")
        return value.strip()

    def validate_email(self, value):
        value = value.lower()
        user = self.instance

        if User.objects.filter(email=value).exclude(id=user.id if user else None).exists():
            raise serializers.ValidationError("Email already exists")

        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters")
        return value

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            name=validated_data['name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)

        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        instance.save()
        return instance
