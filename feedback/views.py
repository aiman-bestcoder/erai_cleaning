from django.views.generic.edit import FormView
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse_lazy
from feedback.forms import FeedbackForm
from feedback.models import Feedback


class FeedbackView(FormView):
    template_name = "feedback/feedback.html"
    form_class = FeedbackForm
    success_url = reverse_lazy("feedback:feedback")

    def form_valid(self, form):
        print("FORM VALID: sending email...")
        data = form.cleaned_data
        subject = f"New contact: {data['subject']}"
        message = (
            f"Name: {data['name']}\n"
            f"Email: {data['email']}\n"
            f"Phone: {data['phone']}\n\n"
            f"Message:\n{data['message']}"
        )

        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            ["aimansclub@gmail.com"],
            fail_silently=False,
        )

        Feedback.objects.create(
            subject=data["subject"],
            text=message,
        )

        return super().form_valid(form)


class FeedbackHomeView(FormView):
    template_name = "feedback/feedback_home.html"
    form_class = FeedbackForm
    success_url = reverse_lazy("homepage:home")

    def form_valid(self, form):
        print("FORM VALID: sending email...")
        data = form.cleaned_data
        subject = f"New contact: {data['subject']}"
        message = (
            f"Name: {data['name']}\n"
            f"Email: {data['email']}\n"
            f"Phone: {data['phone']}\n\n"
            f"Message:\n{data['message']}"
        )

        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            ["aimansclub@gmail.com"],
            fail_silently=False,
        )

        Feedback.objects.create(
            subject=data["subject"],
            text=message,
        )

        return super().form_valid(form)