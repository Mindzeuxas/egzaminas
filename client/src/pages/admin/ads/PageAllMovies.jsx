import { useContext } from "react";
import { AdminTitle } from "../../../components/page-title/AdminTitle";
import { MoviesTable } from "../../../components/table/MoviesTable";
// import { MoviesContext } from "../../../context/movies/MoviesContext";

export function PageAllMovies() {
  // const { movies } = useContext(MoviesContext);

  // laikinai, - ištrinti ir naudi iš Context
  const movies = 0;
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="All " />
      <MoviesTable data={movies} />
    </main>
  );
}
