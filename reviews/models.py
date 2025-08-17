from django.db import models


class Review(models.Model):

    work_description = models.CharField(max_length=100)

    text = models.TextField()

    is_visible_on_main = models.BooleanField(default=False)

    name = models.CharField(max_length=100)

    link = models.CharField(blank=True, max_length=200)

    source_name = models.CharField(blank=True, max_length=100)

    source = models.ImageField(
        verbose_name="source image",
        help_text="upload an image of source",
        upload_to="images/review_sources/",
        blank=True,
    )

    class Meta:
        verbose_name = "review"
        verbose_name_plural = "reviews"

    def __str__(self):
        return f"Отзыв от {self.name}: {self.work_description}"
