from django import forms
from order import models
import catalog


class CleaningOrderForm(forms.ModelForm):
    class Meta:
        model = models.CleaningOrder
        exclude = ['total_price', 'created_at']
        widgets = {
            'area': forms.NumberInput(attrs={
                'class': 'floating-input',
                'placeholder': ' '
            }),
            'num_rooms': forms.NumberInput(attrs={
                'class': 'floating-input',
                'placeholder': ' '
            }),
            'num_bathrooms': forms.NumberInput(attrs={
                'class': 'floating-input',
                'placeholder': ' '
            }),
            'carpet_area': forms.NumberInput(attrs={
                'class': 'floating-input',
                'placeholder': ' '
            }),
            # Селекты
            'room_type': forms.Select(attrs={
                'class': 'floating-select'
            }),
            'service_type': forms.Select(attrs={
                'class': 'floating-select'
            }),
            'frequency': forms.Select(attrs={
                'class': 'floating-select'
            }),
            'extras': forms.CheckboxSelectMultiple(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['service_type'].queryset = catalog.models.Service.objects.filter(service_is_published=True)
        self.fields['extras'].queryset = catalog.models.Extra.objects.all()


class BookingRequestForm(forms.ModelForm):
    class Meta:
        model = models.BookingRequest
        fields = ["name", "email", "date", "time", "message"]
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'floating-input',
                'placeholder': ' '
            }),
            'email': forms.EmailInput(attrs={
                'class': 'floating-input',
                'placeholder': ' '
            }),
            'date': forms.DateInput(attrs={
                'class': 'floating-input',
                'placeholder': ' ',
                'type': 'date'
            }),
            'time': forms.TimeInput(attrs={
                'class': 'floating-input',
                'placeholder': ' ',
                'type': 'time'
            }),
            'message': forms.Textarea(attrs={
                'class': 'floating-textarea',
                'placeholder': ' ',
                'rows': 3
            }),
        }
