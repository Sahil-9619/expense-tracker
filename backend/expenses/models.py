from django.db import models

class Expense(models.Model):
    title = models.CharField(max_length=100)
    amount = models.FloatField()
    category = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title