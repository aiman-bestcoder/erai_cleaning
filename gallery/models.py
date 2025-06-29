from django.db import models
from django.utils.html import mark_safe
from sorl.thumbnail import get_thumbnail


class Result(models.Model):
    results = models.ImageField(
        verbose_name="before/after",
        help_text="upload your result",
        upload_to="images/results/",
    )

    date_added = models.DateField(
        verbose_name="date added",
        help_text="add the date",
        auto_now_add=True,
    )

    result_is_published = models.BooleanField(
        verbose_name="image is posted",
        help_text="is this image posted?",
        default=True,
    )

    def get_thumbnail_300x300(self):
        thumbnail = get_thumbnail(
            self.results,
            '300x300',
            quality=51,
        )
        return mark_safe(
            thumbnail.url
        )

    class Meta:
        verbose_name = "gallery_photo"
        verbose_name_plural = "gallery_photos"
