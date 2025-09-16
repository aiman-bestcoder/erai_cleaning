from django.db import models
from django.utils.html import mark_safe
from django.utils.text import slugify
from sorl.thumbnail import get_thumbnail


class Service(models.Model):

    service_title = models.CharField(
        verbose_name="service title",
        help_text="input service name",
        max_length=20,
    )

    service_description = models.TextField(
        verbose_name="service description",
        help_text="input service deescription",
    )

    service_included = models.TextField(
        verbose_name="service included",
        help_text="what does this service include",
        max_length=100,
        default="everything that you need)"
    )

    service_coefficient = models.DecimalField(
        verbose_name="coefficient of service",
        help_text="little decimal number",
        max_digits=5,
        decimal_places=3,
        default=1,
    )

    service_thumbnail = models.ImageField(
        verbose_name="service image",
        help_text="upload an image",
        upload_to="images/service_thumbnails/",
    )

    service_price = models.PositiveIntegerField(
        verbose_name="service price",
        help_text="enter service average price",
    )

    service_is_published = models.BooleanField(
        verbose_name="is published",
        help_text="is this service published?",
    )

    def get_thumbnail_300x300(self):
        service_image = Service.objects.get(service_thumbnail=self)
        service_thumbnail = get_thumbnail(
            service_image.photo,
            '300x300',
            quality=51,
        )
        return mark_safe(
            service_thumbnail.url,
        )

    slug = models.SlugField(max_length=50, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.service_title)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "service"
        verbose_name_plural = "services"

    def __str__(self):
        return self.service_title


class Extra(models.Model):

    extra_title = models.CharField(
        verbose_name="extra title",
        help_text="input extra name",
        max_length=20,
    )

    extra_price = models.PositiveIntegerField(
        verbose_name="extra price",
        help_text="enter price for this extra",
    )

    extra_thumbnail = models.ImageField(
        verbose_name="extra image",
        help_text="upload an image",
        upload_to="images/extra_thumbnails/",
    )

    def get_thumbnail_extra(self):
        extra_image = Service.objects.get(service_thumbnail=self)
        extra_thumbnail = get_thumbnail(
            extra_image.photo,
            '300x300',
            quality=51,
        )
        return mark_safe(
            extra_thumbnail.url,
        )

    def __str__(self):
        return self.extra_title


class ServiceIcon(models.Model):
    service = models.ForeignKey(Service, related_name="icons", on_delete=models.CASCADE)
    svg_code = models.TextField(
        help_text="Вставь сюда код SVG",
        default="pipikaka"
    )
    text = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.service.service_title} - {self.text or 'SVG'}"
