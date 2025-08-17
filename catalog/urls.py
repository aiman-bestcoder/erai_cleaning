from django.urls import path
import catalog.views

app_name = "catalog"
urlpatterns = [
    path("", catalog.views.CatalogView.as_view(), name="catalog"),
]
