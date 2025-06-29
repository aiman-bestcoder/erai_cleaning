from django.shortcuts import redirect
from django.views import generic, View

from gallery.models import Result
from feedback.forms import FeedbackForm
from reviews.models import Review
from catalog.models import Service


class HomeView(generic.TemplateView):
    template_name = "homepage/homepage.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["reviews"] = Review.objects.filter(is_visible_on_main=True)
        context["results"] = Result.objects.filter(result_is_published=True)
        context["form"] = FeedbackForm()
        context["services"] = Service.objects.filter(service_is_published=True)
        return context


class AddReviewView(View):
    def post(self, request, *args, **kwargs):
        name = request.POST.get("name")
        work_description = request.POST.get("work_description")
        text = request.POST.get("text")

        Review.objects.create(
            name=name,
            work_description=work_description,
            text=text,
        )
        return redirect("homepage:home")


class GalleryView(generic.ListView):
    model = Result
    template_name = "gallery/gallery.html"
    context_object_name = "results"

    def get_queryset(self):
        return Result.objects.filter(result_is_published=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["results"] = Result.objects.filter(result_is_published=True)
        return context
