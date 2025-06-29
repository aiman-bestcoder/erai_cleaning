from django import forms


class FeedbackForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    phone = forms.CharField(max_length=20)
    subject = forms.CharField(max_length=150)
    message = forms.CharField(widget=forms.Textarea)
