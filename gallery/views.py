from django.views.generic import ListView
from gallery.models import Result


class GalleryView(ListView):
    model = Result
    template_name = "gallery/gallery.html"
    context_object_name = "results"

    def get_queryset(self):
        return Result.objects.filter(result_is_published=True)
