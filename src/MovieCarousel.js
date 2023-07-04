import React, { useState, useEffect } from 'react';
import './MovieCarousel.css';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);

  const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWM5ZDZlOTc4OTBhYTZlNjJhNjEzM2U3NGY5YzViYiIsInN1YiI6IjY0MmFmZjRmYTNlNGJhM2QzZTEyZjlkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8xMZPYryCXx2mWpb4lOiXhlTjZJdjv5QStdeTxDHHY'
      }
    })
    .then(response => response.json())
    .then(data => setMovies(shuffleArray(data.results)))
    .catch(error => console.error(error));
  }, []);

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='carousel-container'>
      {movies.slice(0, 5).map((movie, index) => (
        <div className='movie-card' key={index}>
          <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : "fallback-poster-url"} 
              alt={movie.title} 
              style={{ width: '100%' }}
            />
            <p style={{ wordWrap: 'break-word' }}>{movie.title}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default MovieCarousel;

