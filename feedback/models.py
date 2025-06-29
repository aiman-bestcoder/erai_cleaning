from django.db import models


class Feedback(models.Model):

    subject = models.CharField(
        verbose_name="subject",
        help_text="enter your subject",
        max_length=50,
    )

    text = models.TextField(
        verbose_name="text",
        help_text="enter your text",
    )

    class Meta:
        verbose_name = "feedback"
        verbose_name_plural = "feedbacks"
