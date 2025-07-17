import { MovieCard } from "./MovieCard";

export function MovieList({ data }) {
  return (
    <div className="container">
      <div id="movies" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {data.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
    </div>
  );
}
