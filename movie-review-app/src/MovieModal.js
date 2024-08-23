// MovieModal.js
import React, { useEffect, useState } from 'react';
import './MovieModal.css';
import { FaStar } from 'react-icons/fa';
const images = require.context('./movieDetails', true);
const imageList = images.keys().map(image => images(image));

const MovieModal = ({ isOpen, onClose, id }) => {

    const [hover,setHover] = useState(null)
    const [movie, setMovie] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [formVisible, setFormVisible] = useState(false);


    useEffect(() => {
    fetch(`http://localhost:8000/api/movies/${id}`)
        .then(response => response.json())
        .then(data => setMovie(data));
    },[]);


    if (!isOpen) return null;
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
            setRating(0);
            fetch(`http://127.0.0.1:8000/api/movies/${id}/`)
            .then(response => response.json())
            .then(data => setMovie(data));
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick = {(e) => e.stopPropagation()}>
            <div className='modal-movie-image-wrapper'>
                        <img src={imageList[id-1]} alt={movie.title} className="modal-movie-image" />
                        <button className="close-button" onClick={onClose}>&#10005;</button>
                    </div>
                <div className = "movie-details">
                    <div className='movie-info'>
                    <h2>{movie.title}</h2>
                    <div className='d-flex'>
                        
                        <div className='column description'> 
                            <p>{movie.description}</p>
                        </div>
                        <div className='column'>
                            <p><span>Director:</span> {movie.director} <br></br>
                            <span>Release Year:</span> {movie.release_year} <br></br>
                            <span>Rating:</span> { movie.average_rating ? movie.average_rating.toFixed(1) : <p>Loading...</p>}
                            </p>
                        </div>
                    </div>
                    <h3>Reviews:</h3>
                        <ul>
                        {movie.reviews ? 
                        movie.reviews.map((review, index) => (
                        <li key = {index}>
                            {review.review_text} - Rating: {review.rating}/5
                        </li>
                        )) : <p>Loading...</p>} 
                    </ul>
                    <div 
                        style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            cursor: 'pointer', 
                            color: '#007BFF',
                            marginBottom: '10px'
                        }}
                        onClick={() => setFormVisible(!formVisible)}
                    >
                        <span style={{ marginRight: '8px' }}>Submit a Review</span>
                        <span style={{ transform: formVisible ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                            ➤
                        </span>
                    </div>
                        {formVisible && (
                            <form onSubmit={submitReview}>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        fontSize: '14px',
                                        marginBottom: '10px',
                                        resize: 'none',
                                        background: 'black',
                                        color: 'white'
                                    }}
                                />
                                <div style={{ marginBottom: '10px' }}>
                                    <label>Rating:</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            size={30}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(null)}
                                            color={star <= (hover || rating) ? '#ffc107' : 'grey'}
                                            style={{ cursor: 'pointer', marginRight: 5 }}
                                        />
                                        ))}
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    style={{
                                        backgroundColor: '#007BFF',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                    }}
                                >
                                    Submit Review
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
