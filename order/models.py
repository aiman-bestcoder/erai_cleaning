from django.db import models
from django.utils import timezone


class CleaningOrder(models.Model):
    ROOM_TYPE_CHOICES = [
        ("apartment", "Квартира"),
        ("house", "Дом"),
        ("townhouse", "Таунхаус"),
        ("office", "Офис"),
    ]

    SERVICE_TYPE_CHOICES = [
        ("standard", "Стандартная"),
        ("deep", "Генеральная"),
        ("moving", "Мувинг"),
    ]

    FREQUENCY_CHOICES = [
        ("once", "Разовая"),
        ("weekly", "Еженедельно"),
        ("biweekly", "Раз в 2 недели"),
        ("monthly", "Ежемесячно"),
    ]

    area = models.PositiveIntegerField(verbose_name="Площадь (в квадратных футах)")
    room_type = models.CharField(max_length=20, choices=ROOM_TYPE_CHOICES)
    num_rooms = models.PositiveIntegerField(default=1)
    num_bathrooms = models.PositiveIntegerField(default=1)

    # Допы
    clean_windows = models.BooleanField(default=False)
    clean_sills = models.BooleanField(default=False)
    clean_cabinets = models.BooleanField(default=False)
    clean_fridge = models.BooleanField(default=False)
    clean_oven = models.BooleanField(default=False)
    clean_microwave = models.BooleanField(default=False)
    clean_dishwasher = models.BooleanField(default=False)
    clean_terrace = models.BooleanField(default=False)
    clean_blinds = models.BooleanField(default=False)

    clean_carpet = models.BooleanField(default=False)
    carpet_area = models.PositiveIntegerField(null=True, blank=True)

    service_type = models.CharField(max_length=20, choices=SERVICE_TYPE_CHOICES)
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)

    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Заказ от {self.created_at.date()} на сумму ${self.total_price}"
