import { useContext, useEffect, useState } from "react";
import { initialMoviesContext } from "./initialMoviesContext";
import { MoviesContext } from "./MoviesContext";
import { UserContext } from "../user/UserContext";

export function MoviesContextWrapper(props) {
  const [movies, setMovies] = useState(initialMoviesContext.movies);

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      fetchMovies();
    }
  }, [isLoggedIn]);

  function fetchMovies() {
    fetch("http://localhost:5445/api/public/movies", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setMoviesList(data.list);
        }
      })
      .catch(console.error);
  }

  function setMoviesList(data) {
    setMovies(() => data);
  }

  function adminDeleteMovie(id) {
    setMovies((list) => list.filter((m) => m.id !== id));
  }

  function adminRefreshMovies() {
    fetchMovies();
  }

  const value = {
    movies,
    setMovies,
    adminDeleteMovie,
    adminRefreshMovies,
  };

  return <MoviesContext.Provider value={value}>{props.children}</MoviesContext.Provider>;
}
