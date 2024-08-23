import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import logo from './logo.png';
import './styles.css';
function Home(){
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/movies/')
      .then(response => response.json())
      .then(data => setMovies(data));
  },[]);


  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className='App'>
      {/* <div className= "logo"> */}
          <p className="title">
          <img className = "logo" src={logo} alt="LOGO"/>
        <p className='webname'>CineScope</p></p>
      {/* </div> */}
      <div className="movie-list">
        <br></br>
        {movies.map((movie) => (
          <MovieCard
            movie = {movie}
            id={movie.id}
            title={movie.title}
            imageUrl={movie.imageUrl}  // Ensure your backend returns or maps image URLs
            onMovieClick={openModal}
          />
        ))}
        {selectedMovie && (
          <MovieModal
            isOpen={isModalOpen}
            onClose={closeModal}
            id={selectedMovie.id}
          />
        )}
      </div>
    </div>
  );
}

export default Home;