from django import forms
from .models import CleaningOrder


class CleaningOrderForm(forms.ModelForm):
    class Meta:
        model = CleaningOrder
        fields = "__all__"
