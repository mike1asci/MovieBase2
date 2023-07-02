import React from 'react';

const Favorites = ({ favorites }) => {
  return (
    <div>
      <h1>Favorite Movies</h1>
      {favorites?.length > 0 ? (
        <ul>
          {favorites.map((movie) => (
            <li key={movie.id}>
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
