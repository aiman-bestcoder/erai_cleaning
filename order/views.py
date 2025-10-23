from django.core.mail import send_mail
from django.conf import settings
from django.views import View
from django.http import JsonResponse
from django.shortcuts import render
from order import forms
from catalog.models import Service, Extra


ROOM_TYPE_PRICES = {
    "apartment": 0.125,
    "house": 0.15,
    "townhouse": 0.135,
    "office": 0.1,
}

FREQUENCY_MULTIPLIERS = {
    "once": 1,
    "weekly": 0.8,
    "biweekly": 0.85,
    "monthly": 0.9,
}


def calculate_price(data):
    S = int(data.get("area", 0))
    Tr = ROOM_TYPE_PRICES.get(data.get("room_type"), 1)
    Nr = int(data.get("num_rooms", 0))
    Nb = int(data.get("num_bathrooms", 0))

    base_price = S * Tr + 26 * Nr + 31 * Nb

    service_id = data.get("service_type")
    try:
        service = Service.objects.get(pk=service_id)
        Ts = float(service.service_coefficient)
        service_label = service.service_title
    except (Service.DoesNotExist, ValueError, TypeError):
        Ts = 1
        service_label = "Unknown"

    price_with_service = base_price * Ts

    extras_total = 0
    extras = []
    extra_ids = data.getlist("extras")
    for eid in extra_ids:
        try:
            extra = Extra.objects.get(pk=eid)
            extras.append({"label": extra.extra_title, "price": extra.extra_price})
            extras_total += extra.extra_price
        except Extra.DoesNotExist:
            continue

    carpet_price = 0
    carpet_area = 0
    if data.get("carpet"):
        try:
            carpet_area = int(data.get("carpet_area")) if data.get("carpet_area") else S
        except ValueError:
            carpet_area = S
        if carpet_area == 0:
            carpet_area = S
        carpet_price = carpet_area * 0.33
        extras.append({
            "label": f"Carpet Cleaning ({carpet_area} sqft)",
            "price": round(carpet_price, 2),
        })
        extras_total += carpet_price

    subtotal = price_with_service + extras_total

    V_key = data.get("frequency")
    V = FREQUENCY_MULTIPLIERS.get(V_key, 1)

    total_price = round(subtotal * V, 2)

    discount_amount = round(subtotal - total_price, 2) if V < 1 else 0
    discount_percent = int(round((1 - V) * 100)) if V < 1 else 0

    breakdown = [
        {"label": f"Area ({S} sqft)", "price": round(S * Tr, 2)},
        {"label": f"{Nr} Room(s)", "price": 26 * Nr},
        {"label": f"{Nb} Bathroom(s)", "price": 31 * Nb},
        {"label": f"Service Type: {service_label}", "price": f"x{Ts}"},
    ]

    breakdown.extend(extras)

    if V_key and V != 1:
        breakdown.append({"label": f"Frequency Discount: -{discount_percent}%", "price": ""})
        breakdown.append({"label": "Discount Amount", "price": f"-${discount_amount:.2f}"})

    return total_price, breakdown


def ajax_calculate_price(request):
    if request.method == "GET":
        total, breakdown = calculate_price(request.GET)
        return JsonResponse({"total": total, "breakdown": breakdown})


class OrderView(View):
    template_name = "order/order.html"

    def get(self, request, *args, **kwargs):
        context = {
            "order_form": forms.CleaningOrderForm(),
            "booking_form": forms.BookingRequestForm(),
            "services": Service.objects.filter(service_is_published=True),
        }
        return render(request, self.template_name, context)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["booking_form"] = kwargs.get("booking_form") or forms.BookingRequestForm()
        context["services"] = Service.objects.filter(service_is_published=True)
        return context

    def post(self, request, *args, **kwargs):
        try:
            order_form = forms.CleaningOrderForm(request.POST)
            booking_form = forms.BookingRequestForm(request.POST)

            if order_form.is_valid() and booking_form.is_valid():
                print("OrderForm valid:", order_form.is_valid(), order_form.errors)
                print("BookingForm valid:", booking_form.is_valid(), booking_form.errors)

                order = order_form.save(commit=False)
                booking = booking_form.save()

                total_price, breakdown = calculate_price(request.POST)
                order.total_price = total_price
                order.save()

                data = request.POST
                message_lines = [
                    "Client Info:",
                    f"Name: {booking.name}",
                    f"Email: {booking.email}",
                    f"Date: {booking.date}",
                    f"Time: {booking.time}",
                    f"Note: {booking.message}",
                    "",
                    "Cleaning Details:",
                    f"Room Type: {data.get('room_type')}",
                    f"Area: {data.get('area')} sqft",
                    f"Rooms: {data.get('num_rooms')}",
                    f"Bathrooms: {data.get('num_bathrooms')}",
                    f"Service Type: {data.get('service_type')}",
                    f"Frequency: {data.get('frequency')}",
                ]

                for extra in order.extras.all():
                    message_lines.append(f"Extra: {extra.extra_title} - ${extra.extra_price}")

                if data.get("carpet"):
                    carpet_area = data.get("carpet_area") or data.get("area")
                    message_lines.append(f"Carpet Cleaning: {carpet_area} sqft")

                message_lines.append("\nBreakdown:")
                for row in breakdown:
                    label = row.get("label", "")
                    price = row.get("price", "")
                    if isinstance(price, (int, float)):
                        price = f"${price:.2f}"
                    message_lines.append(f"{label}: {price}")

                message_lines.append(f"\nTotal: ${total_price:.2f}")
                message = "\n".join(message_lines)

                send_mail(
                    "New Cleaning Order",
                    message,
                    settings.EMAIL_HOST_USER,
                    ["aimansclub@gmail.com"],
                    fail_silently=False,
                )

                return JsonResponse({"success": True, "message": "Order successfully submitted!"})

            errors = {
                "order_form": order_form.errors,
                "booking_form": booking_form.errors,
            }
            return JsonResponse({"success": False, "errors": errors}, status=400)

        except Exception:
            import traceback
            print("ERROR:", traceback.format_exc())
            return JsonResponse({"success": False, "message": "Internal server error."}, status=500)
