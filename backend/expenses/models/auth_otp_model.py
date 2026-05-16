from datetime import timedelta

from django.db import models
from django.utils import timezone


class AuthOTP(models.Model):
    SIGNUP = 'signup'
    PASSWORD_RESET = 'password_reset'

    PURPOSE_CHOICES = [
        (SIGNUP, 'Signup'),
        (PASSWORD_RESET, 'Password reset'),
    ]

    email = models.EmailField(db_index=True)
    purpose = models.CharField(max_length=32, choices=PURPOSE_CHOICES)
    otp_hash = models.CharField(max_length=128)
    expires_at = models.DateTimeField()
    attempts = models.PositiveSmallIntegerField(default=0)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def is_expired(self):
        return timezone.now() >= self.expires_at

    @classmethod
    def expiry_time(cls):
        return timezone.now() + timedelta(minutes=10)

    def __str__(self):
        return f'{self.email} - {self.purpose}'
