import React from "react";
import "./App.css";

const Favorites = ({ favorites }) => {
  return (
    <div className="white-background search-container">
      <h1>Favorite Movies</h1>
      {favorites?.length > 0 ? (
        <ul>
          {favorites.map((movie) => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite movies yet.</p>
      )}
    </div>
  );
};

export default Favorites;
