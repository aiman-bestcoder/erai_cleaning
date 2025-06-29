from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class RegistrationForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput,
        label='Password',
        help_text='Enter a strong password.'
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput,
        label='Confirm password',
        help_text='Re-enter the password for confirmation.'
    )

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']
        labels = {
            'first_name': 'First name',
            'last_name': 'Last name',
            'email': 'Email address',
        }
        help_texts = {
            'first_name': 'Enter your first name.',
            'last_name': 'Enter your last name.',
            'email': 'Enter a valid email address.',
        }

    def clean(self):

        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            raise ValidationError({
                'confirm_password': 'Passwords do not match.'})


class LoginForm(AuthenticationForm):
    username = forms.CharField(
        label='Username or email',
        help_text='Enter your username or email address.'
    )
    password = forms.CharField(
        widget=forms.PasswordInput,
        label='Password',
        help_text='Enter your password.'
    )
