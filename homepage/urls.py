from django.urls import path

import homepage.views
import gallery

app_name = "homepage"

urlpatterns = [
    path(
        "",
        homepage.views.HomeView.as_view(),
        name="home",
    ),
    path(
        "add-review/",
        homepage.views.AddReviewView.as_view(),
        name="add_review",
    ),
    path(
        "",
        gallery.views.GalleryView.as_view(),
        name="gallery"
    ),
]
