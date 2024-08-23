
from django.urls import path
from .views import movie_list, movie_detail, submit_review

urlpatterns = [
    path('movies/', movie_list),
    path('movies/<int:pk>/', movie_detail),
    path('movies/<int:pk>/review/', submit_review),
]