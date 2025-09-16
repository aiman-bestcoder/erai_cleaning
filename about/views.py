from django.views import generic
from catalog import models


class AboutView(generic.TemplateView):
    template_name = "about/about.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['services'] = models.Service.objects.filter(service_is_published=True)
        return context
