from django.db import models


class Review(models.Model):

    work_description = models.CharField(max_length=100)

    text = models.TextField()

    is_visible_on_main = models.BooleanField(default=False)

    name = models.CharField(max_length=100)

    def __str__(self):
        return f"Отзыв от {self.name}: {self.work_description}"
