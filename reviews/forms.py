from django import forms
from .models import Review


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ["work_description", "text", "name"]
        widgets = {
            "work_description": forms.TextInput(
                attrs={
                    "class": "input",
                    "placeholder": "Описание работы",
                }
            ),
            "text": forms.Textarea(
                attrs={
                    "class": "input",
                    "placeholder": "Ваш отзыв",
                }
            ),
            "name": forms.TextInput(
                attrs={
                    "class": "input",
                    "placeholder": "Ваше имя",
                }
            ),
        }
        labels = {
            "work_description": "Описание работы",
            "text": "Отзыв",
            "name": "Имя",
        }
