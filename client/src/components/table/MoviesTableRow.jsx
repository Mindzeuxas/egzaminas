import { useContext } from "react";
import { Link } from "react-router";
import { BadgeDanger } from "../badge/BadgeDanger";
import { BadgeDraft } from "../badge/BadgeDraft";
import { BadgeSuccess } from "../badge/BadgeSuccess";
import defaultImg from "../../assets/default.webp";
import { MoviesContext } from "../../context/movies/MoviesContext";

export function MoviesTableRow({ movie }) {
  const { adminDeleteMovie } = useContext(MoviesContext);
  const img = movie.thumbnail ? movie.thumbnail : defaultImg;

  function handleDeleteClick() {
    fetch("http://localhost:5445/api/admin/movies/" + movie.id, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminDeleteMovie(movie.id);
        }
      })
      .catch(console.error);
  }

  return (
    <tr>
      <td>{movie.id}</td>
      <td>
        <img style={{ maxWidth: "5rem", maxHeight: "5rem" }} src={img} alt="Movie thumbnail" />
      </td>
      <td>{movie.title}</td>
      <td>{movie.url_slug}</td>
      <td>{movie.description ? <BadgeSuccess text="Provided" /> : <BadgeDanger text="Missing" />}</td>
      <td>{movie.is_published ? <BadgeSuccess text="Published" /> : <BadgeDraft text="Draft" />}</td>
      <td>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          <Link className="btn btn-primary" to={`/admin/movies/${movie.url_slug}/edit`}>
            Edit
          </Link>
          <button onClick={handleDeleteClick} className="btn btn-danger" type="button">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
