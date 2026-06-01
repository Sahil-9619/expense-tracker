from django.contrib import admin
from expenses.models import Budget, Expense, Goal, Report, ReportFolder, Wallet

admin.site.register(Expense)
admin.site.register(Wallet)
admin.site.register(Budget)
admin.site.register(Goal)
admin.site.register(ReportFolder)
admin.site.register(Report)
