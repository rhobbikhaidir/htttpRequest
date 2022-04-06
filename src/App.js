import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

// https://swapi.dev/api/films/

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");

    const data = await response.json();
    const transformedMovies = data.results.map((res) => {
      return {
        id: res.episode_id,
        title: res.title,
        openingText: res.opening_crawl,
        releaseDate: res.release_date,
      };
    });

    setMovies(transformedMovies);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {loading && <p>Loading...</p>}
        {!loading && movies.length === 0 && <p>Found no Movies</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
