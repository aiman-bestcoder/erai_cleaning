from django.urls import path
import catalog.views
from order import views as order_views

app_name = "catalog"
urlpatterns = [
    path("", catalog.views.CatalogView.as_view(), name="catalog"),
    # Обработка сабмита и AJAX-запроса калькулятора прямо в пространстве имен catalog
    path("order/", order_views.order_create, name="order_create"),
    path("ajax/calculate/", order_views.ajax_calculate_price, name="ajax_calculate"),
]
