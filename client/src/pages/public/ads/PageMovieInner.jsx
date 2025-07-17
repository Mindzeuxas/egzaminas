import { useContext } from "react";
import { Link, useParams } from "react-router";
import defaultImg from "../../../assets/logo.jpg";
import { MoviesContext } from "../../../context/ads/AdsContext";

export function PageMovieInner() {
  const { movies } = useContext(MoviesContext);
  const params = useParams();
  let movie = null;

  for (const m of movies) {
    if (m.url_slug === params.movie) {
      movie = m;
      break;
    }
  }

  if (!movie) {
    return (
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={defaultImg}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Not found</h1>
            <p className="lead">Nothing with address "{params.movie}" found.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/movies" className="btn btn-primary btn-lg px-4 me-md-2">
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src={`http://localhost:5445/img/thumbnails/${movie.thumbnail}`}
            className="inner-thumbnail d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">{movie.title}</h1>
          <p className="lead">{movie.description}</p>
          <p className="lead">Duration: {movie.duration}</p>
          <p className="lead">
            Genre: <a href={`/categories/${movie.categoryUrlSlug.toLowerCase()}`}>{movie.categoryName}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
