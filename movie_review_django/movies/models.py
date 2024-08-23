from django.db import models

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length = 200)
    director = models.CharField(max_length = 100)
    release_year = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return self.title
    
    def average_rating(self):
        reviews = self.reviews.all()
        if reviews.exists():
            return sum([review.rating for review in reviews])/ reviews.count()
        return 0

class Review(models.Model):
    movie = models.ForeignKey(Movie, related_name = 'reviews', on_delete = models.CASCADE)
    review_text = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return f"{self.movie.title} Review"