from django.views import generic
from django.shortcuts import render
from django.http import JsonResponse
from order.forms import CleaningOrderForm


ROOM_TYPE_PRICES = {
    "apartment": 0.125,
    "house": 0.15,
    "townhouse": 0.135,
    "office": 0.1,
}

SERVICE_TYPE_MULTIPLIERS = {
    "standard": 1,
    "deep": 1.4,
    "moving": 2,
}

FREQUENCY_MULTIPLIERS = {
    "once": 1,
    "weekly": 0.9,
    "biweekly": 0.95,
    "monthly": 0.97,
}

EXTRAS_PRICES = {
    "clean_windows": 30,
    "clean_sills": 15,
    "clean_cabinets": 15,
    "clean_fridge": 30,
    "clean_oven": 30,
    "clean_microwave": 15,
    "clean_dishwasher": 15,
    "clean_terrace": 20,  # выбрал сам
    "clean_blinds": 30,
}


def calculate_price(data):
    S = int(data.get("area", 0))
    Tr = ROOM_TYPE_PRICES.get(data.get("room_type"), 0)
    Nr = int(data.get("num_rooms", 0))
    Nb = int(data.get("num_bathrooms", 0))

    # Сумма всех включенных допов
    A = sum(
        price
        for field_name, price in EXTRAS_PRICES.items()
        if data.get(field_name)  # достаточно, что параметр есть в запросе
    )

    # Ковры
    C = 0
    if data.get("clean_carpet"):
        # если carpet_area пусто, возьмём площадь объекта
        carpet_sqft = int(data.get("carpet_area") or S)
        C = carpet_sqft * 0.33

    Ts = SERVICE_TYPE_MULTIPLIERS.get(data.get("service_type"), 1)
    V = FREQUENCY_MULTIPLIERS.get(data.get("frequency"), 1)

    base = S * Tr + 26 * Nr + 31 * Nb + A + C
    return round(base * Ts * V, 2)


def order_create(request):
    if request.method == "POST":
        form = CleaningOrderForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            price = calculate_price(request.POST)
            order.total_price = price
            order.save()
            return render(request, "cleaning/order_success.html", {"order": order})
    else:
        form = CleaningOrderForm()
    return render(request, "cleaning/order_form.html", {"form": form})


def ajax_calculate_price(request):
    if request.method == "GET":
        price = calculate_price(request.GET)
        return JsonResponse({"price": price})


class OrderView(generic.TemplateView):
    template_name = "order/order.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['order_form'] = CleaningOrderForm()
        return context
