from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path


urlpatterns = [
    path("about/", include("about.urls")),
    path("admin/", admin.site.urls),
    path("catalog/", include("catalog.urls")),
    path("feedback/", include("feedback.urls")),
    path("gallery/", include("gallery.urls")),
    path("", include("homepage.urls")),
    path("order/", include("order.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
