import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CategoriesContext } from "../../context/categories/CategoriesContext";

export function CategoryEditForm() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { categories, adminRefreshCategory } = useContext(CategoriesContext);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  useEffect(handleResetClick, [categories, category]);

  function handleResetClick() {
    const categoryData = category ? categories.filter((c) => c.name === category)[0] : null;
    if (categoryData) {
      setId(categoryData.id);
      setName(categoryData.name);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5445/api/admin/categories/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminRefreshCategory();
          navigate("/admin/categories");
        }
      })
      .catch(console.error);
  }

  return (
    <form onSubmit={handleFormSubmit} className="needs-validation col-12 col-md-10 col-lg-8 col-xl-6">
      <div className="row g-3">
        <div className="col-sm-12">
          <label htmlFor="id" className="form-label">
            ID
          </label>
          <input value={id} type="text" className="form-control" id="id" placeholder="" required />
          <div className="invalid-feedback">Valid last name is required.</div>
        </div>

        <div className="col-sm-12">
          <label htmlFor="name" className="form-label">
            Category name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="form-control"
            id="name"
            placeholder=""
            required
          />
          <div className="invalid-feedback">Valid first name is required.</div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="d-flex" style={{ gap: "1rem" }}>
        <button className="btn btn-success btn-lg" type="submit">
          Update
        </button>
        <button onClick={handleResetClick} className="btn btn-secondary btn-lg ms-auto" type="button">
          Reset
        </button>
      </div>
    </form>
  );
}
