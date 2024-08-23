import React from 'react';
import './styles.css';


const images = require.context('./movieList', true);
const imageList = images.keys().map(image => images(image));

const MovieCard = ({movie,id, title, imageUrl, onMovieClick}) => {
    return (
        <div className="movie-card" data-title={title} onClick={() => onMovieClick(movie)}>
            <img src={imageList[id-1]} alt = {title} className="movie-image"/>
        </div>
    );
};

export default MovieCard;