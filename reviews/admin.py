from django.contrib import admin

from reviews import models


@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        models.Review.work_description.field.name,
        models.Review.text.field.name,
        models.Review.is_visible_on_main.field.name,
        models.Review.name.field.name,
    )
