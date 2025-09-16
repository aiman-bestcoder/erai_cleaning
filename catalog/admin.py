from django.contrib import admin

from catalog import models


class ServiceIconInline(admin.TabularInline):
    model = models.ServiceIcon
    extra = 1


@admin.register(models.Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        models.Service.service_title.field.name,
        models.Service.service_description.field.name,
        models.Service.get_thumbnail_300x300,
        models.Service.service_price.field.name,
        models.Service.service_is_published.field.name,
    )
    inlines = [ServiceIconInline]
    list_filter = (models.Service.service_is_published.field.name,)
    search_fields = (models.Service.service_title.field.name,)


@admin.register(models.Extra)
class ExtraAdmin(admin.ModelAdmin):
    list_display = (
        models.Extra.extra_title.field.name,
        models.Extra.get_thumbnail_extra,
        models.Extra.extra_price.field.name,
    )
