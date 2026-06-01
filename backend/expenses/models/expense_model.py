from django.db import models
from .user_model import User


class Expense(models.Model):
    TYPE_CHOICES = [
        ("expense", "Expense"),
        ("income", "Income"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="expenses")

    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default="expense")
    wallet = models.ForeignKey(
        "Wallet",
        on_delete=models.SET_NULL,
        related_name="transactions",
        null=True,
        blank=True,
    )

    date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wallets")
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    color = models.CharField(max_length=20, default="emerald")
    status = models.CharField(max_length=30, default="Active")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="budgets")
    category = models.CharField(max_length=100)
    limit = models.DecimalField(max_digits=12, decimal_places=2)
    color = models.CharField(max_length=20, default="emerald")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "category")

    def __str__(self):
        return f"{self.category} budget"


class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="goals")
    title = models.CharField(max_length=120)
    target = models.DecimalField(max_digits=12, decimal_places=2)
    current = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    deadline = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=20, default="emerald")
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.completed = self.current >= self.target if self.target else False
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ReportFolder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="report_folders")
    name = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "name")

    def __str__(self):
        return self.name


class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reports")
    folder = models.ForeignKey(
        ReportFolder,
        on_delete=models.CASCADE,
        related_name="reports",
        null=True,
        blank=True,
    )
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=255, blank=True)
    report_type = models.CharField(max_length=50, default="summary")
    size_label = models.CharField(max_length=30, blank=True)
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
