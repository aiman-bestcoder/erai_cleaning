from django.views import generic
from order.forms import CleaningOrderForm
from catalog import models


class CatalogView(generic.TemplateView):
    template_name = "catalog/catalog.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['order_form'] = CleaningOrderForm()
        context['services'] = models.Service.objects.filter(service_is_published=True)
        context['extras'] = models.Extra.objects.filter
        return context
