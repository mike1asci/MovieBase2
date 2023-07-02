import React, { useState } from 'react';
import './MovieSearch.css';  // Import the CSS file. Adjust the path based on your project structure.

const MovieSearch = ({addFavorite}) => {
  const [movieTitle, setMovieTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWM5ZDZlOTc4OTBhYTZlNjJhNjEzM2U3NGY5YzViYiIsInN1YiI6IjY0MmFmZjRmYTNlNGJhM2QzZTEyZjlkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8xMZPYryCXx2mWpb4lOiXhlTjZJdjv5QStdeTxDHHY'
      }
    })
    .then(response => response.json())
    .then(data => setSearchResults(data.results))
    .catch((error) => console.error('Error:', error));
  };

  
  const handleChange = (event) => {
    setMovieTitle(event.target.value);
  };
  return (
    <div><h1>MovieBase</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={movieTitle} onChange={handleChange} placeholder="Enter movie title" required />
        <button type="submit">Search</button>
      </form>

      {searchResults.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Release Date</th>
              <th>Overview</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((movie) => (
              <tr key={movie.id}>
                <td><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/></td>
                <td>{movie.title}</td>
                <td>{movie.release_date}</td>
                <td>{movie.overview}</td>
                <td><button onClick={() => addFavorite(movie)}>Add to Favorites</button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MovieSearch;



