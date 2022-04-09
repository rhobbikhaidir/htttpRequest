import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-http-2c84f-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (lisMovie) => {
    const response = await fetch(
      "https://react-http-2c84f-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(lisMovie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

  let content = <p>Found No Movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (loading) {
    content = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
