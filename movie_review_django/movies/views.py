from django.shortcuts import render
from .models import Movie, Review
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# 2. Exempt the view from CSRF checks

# Create your views here.
def movie_list(request):
    movies = Movie.objects.all()
    data = [
        {
            "id": movie.id,
            "title": movie.title,
            "director": movie.director,
            "release_year": movie.release_year,
            "description":movie.description,
            "average_rating": movie.average_rating(),
        } for movie in movies
    ]
    return JsonResponse(data,safe = False)
    
def movie_detail(request, pk):
    movie = Movie.objects.get(pk=pk)
    reviews = movie.reviews.all()
    data = {
        "title": movie.title,
        "director": movie.director,
        "release_year": movie.release_year,
        "description": movie.description,
        "average_rating": movie.average_rating(),
        "reviews": [
            {
                "review_text": review.review_text,
                "rating": review.rating,
            } for review in reviews
        ]
    }
    return JsonResponse(data,safe = False)

@csrf_exempt
def submit_review(request, pk):
    if request.method == 'POST':
        movie = Movie.objects.get(pk=pk)
        review_text = request.POST.get('review_text')
        rating = int(request.POST.get('rating'))
        print(f"rating: {rating}")
        print(f"review text: {review_text}")
        review = Review(movie=movie, review_text=review_text, rating=rating)
        review.save()
        return JsonResponse({"message": "Review submitted successfully"})