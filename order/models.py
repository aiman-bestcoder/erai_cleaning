from django.db import models
from django.utils import timezone
from catalog import models as cat


class CleaningOrder(models.Model):
    ROOM_TYPE_CHOICES = [
        ("apartment", "Apartment"),
        ("house", "House"),
        ("townhouse", "Townhouse"),
        ("office", "Office"),
    ]

    FREQUENCY_CHOICES = [
        ("once", "One-time"),
        ("weekly", "Weekly"),
        ("biweekly", "Bi-weekly"),
        ("monthly", "Monthly"),
    ]

    area = models.PositiveIntegerField(verbose_name="Площадь (в квадратных футах)")
    carpet_area = models.PositiveIntegerField(null=True, blank=True)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPE_CHOICES)
    num_rooms = models.PositiveIntegerField()
    num_bathrooms = models.PositiveIntegerField()

    extras = models.ManyToManyField(cat.Extra, blank=True)
    carpet = models.BooleanField(default=False)

    service_type = models.ForeignKey(
        cat.Service,
        on_delete=models.CASCADE,
        verbose_name="Service Type"
    )

    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)

    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Заказ от {self.created_at.date()} на сумму ${self.total_price}"


class BookingRequest(models.Model):
    name = models.CharField(verbose_name="Имя", max_length=100)
    email = models.EmailField(verbose_name="Email")
    date = models.DateField(verbose_name="Дата уборки")
    time = models.TimeField(verbose_name="Время уборки")
    message = models.TextField(verbose_name="Комментарий", blank=True)
