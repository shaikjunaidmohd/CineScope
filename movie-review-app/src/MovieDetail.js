import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail(){
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() =>{
    fetch(`http://127.0.0.1:8000/api/movies/${id}/`)
      .then(response => response.json())
      .then(data => setMovie(data));
  },[id]);

  const submitReview = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/movies/${id}/review/`,{
      method : 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        review_text: reviewText,
        rating: rating,
      }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setReviewText('');
        setRating(5);
        fetch(`http://127.0.0.1:8000/api/movies/${id}/`)
        .then(response => response.json())
        .then(data => setMovie(data));
      });
  };
  if(!movie){
    return <p>Loading...</p>
  }
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Directed by: {movie.director}</p>
      <p>Released in: {movie.release_year}</p>
      <h2>Average Rating: {movie.average_rating.toFixed(1)}/5</h2>
      <h3>Reviews:</h3>
      <ul>
        {movie.reviews.map((review, index) => (
          <li key = {index}>
            {review.review_text} - Rating: {review.rating}/5
          </li>
        ))}
      </ul>
      <h3>Submit a Review:</h3>
      <form onSubmit={submitReview}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          />
          <br />
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1,2,3,4,5].map(r =>(
              <option key = {r} value={r}>{r}</option>
            ))}
          </select>
          <br/>
          <button type = "submit"> Submit Review</button>
      </form>
    </div>
  );
}

export default MovieDetail;