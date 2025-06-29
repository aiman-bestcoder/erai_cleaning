from django.contrib import admin
from gallery import models


@admin.register(models.Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = (
        "get_thumbnail_300x300",
        "result_is_published",
        "date_added",
    )
