import { Link } from "react-router";
import { useContext } from "react";
import { CategoriesContext } from "../../context/categories/CategoriesContext";

export function CategoriesTableRow({ category }) {
  const { adminDeleteCategory } = useContext(CategoriesContext);

  function handleDeleteClick() {
    fetch("http://localhost:5445/api/admin/categories/" + category.id, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminDeleteCategory(category.id);
        }
      })
      .catch(console.error);
  }

  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>{category.count}</td>

      <td>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          <Link to={`/admin/categories/${category.name}/edit`} className="btn btn-primary">
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
