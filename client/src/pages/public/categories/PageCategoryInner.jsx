import { useParams } from "react-router";
import { PageTitle } from "../../../components/page-title/PageTitle";
import { capitalize } from "../../../lib/capitalize";
import { useContext } from "react";
import { MovieList } from "../../../components/movies/MovieList";
import { MoviesContext } from "../../../context/ads/AdsContext";

export function PageCategoryInner() {
  const { movies } = useContext(MoviesContext);
  const params = useParams();
  const categoryMovies = movies.filter((m) => m.categoryUrlSlug === params.category);

  return (
    <div className="container">
      <PageTitle title={capitalize(params.category)} />
      <MovieList data={categoryMovies} />
    </div>
  );
}
