import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import MovieSearch from "./MovieSearch";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Favorites from "./Favorites";
import MovieCarousel from "./MovieCarousel";

function App() {
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/11", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWM5ZDZlOTc4OTBhYTZlNjJhNjEzM2U3NGY5YzViYiIsInN1YiI6IjY0MmFmZjRmYTNlNGJhM2QzZTEyZjlkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8xMZPYryCXx2mWpb4lOiXhlTjZJdjv5QStdeTxDHHY",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  });

  const [favorites, setFavorites] = useState([]);
  //console.log(favorites)
  const addFavorite = (movie) => {
    setFavorites([...favorites, movie]);
  };
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="container">
        <nav className="nav">
          <h2 className="logo-text">MovieBase</h2>
          <div>
            <Link to="/search">Search</Link>
          </div>
          <div>
            <Link to="/favorites">Favorites</Link>
          </div>
        </nav>
        <div className="content">
          <MovieCarousel></MovieCarousel>
          <Routes>
            <Route
              path="/search"
              element={<MovieSearch addFavorite={addFavorite} />}
            />
            <Route
              path="/favorites"
              element={<Favorites favorites={favorites} />}
            />
            <Route
              path="/"
              element={<> {<MovieSearch addFavorite={addFavorite} />} </>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
