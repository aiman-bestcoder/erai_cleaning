from django.urls import path
from order import views


app_name = "order"
urlpatterns = [
    path("", views.OrderView.as_view(), name="order"),
    path("order/", views.order_create, name="order_create"),
    path("ajax/calculate/", views.ajax_calculate_price, name="ajax_calculate"),
]
