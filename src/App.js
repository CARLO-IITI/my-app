import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    searchMovies("Batman", currentPage);
  }, [currentPage]);

  const searchMovies = async (title, page) => {
    const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
    const data = await response.json();

    // If it's the first page, set the results; otherwise, append to existing results
    if (page === 1) {
      setMovies(data.Search);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
    }
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    searchMovies(searchTerm, 1);
  };

  const handleLoadMoreClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    searchMovies(searchTerm, nextPage);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img src={SearchIcon} alt="search" onClick={handleSearchClick} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
                  <div className="button-container">
                      <button className="load-more-button" onClick={handleLoadMoreClick}>
                          Load More
                      </button>
                  </div>
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
