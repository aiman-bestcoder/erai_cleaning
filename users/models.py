from django.db import models


class Registration(models.Model):

    first_name = models.CharField(
        max_length=50,
        verbose_name='first name',
        help_text='enter your first name.',
    )
    last_name = models.CharField(
        max_length=50,
        verbose_name='last name',
        help_text='enter your last name.',
    )
    email = models.EmailField(
        unique=True,
        verbose_name='email address',
        help_text='enter a valid email address.',
    )
    password = models.CharField(
        max_length=128,
        verbose_name='password',
        help_text='enter a strong password.',
    )
    confirm_password = models.CharField(
        max_length=128,
        verbose_name='confirm password',
        help_text='re-enter the password for confirmation.',
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.email})'

    class Meta:
        verbose_name = "registration"
        verbose_name_plural = "registrations"
