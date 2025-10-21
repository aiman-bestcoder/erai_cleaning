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
                    "placeholder": "Describe our work in one word",
                }
            ),
            "text": forms.Textarea(
                attrs={
                    "class": "input",
                    "placeholder": "Your review",
                }
            ),
            "name": forms.TextInput(
                attrs={
                    "class": "input",
                    "placeholder": "Your name",
                }
            ),
        }
        labels = {
            "work_description": "Work Description",
            "text": "Review Text",
            "name": "Name",
        }
