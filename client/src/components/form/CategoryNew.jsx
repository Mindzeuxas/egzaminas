import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CategoriesContext } from "../../context/categories/CategoriesContext";

export function CategoryNewForm() {
  const { adminRefreshCategory } = useContext(CategoriesContext);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function handleResetClick() {
    setName("");
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5445/api/admin/categories", {
      method: "POST",
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
          Create
        </button>
        <button onClick={handleResetClick} className="btn btn-secondary btn-lg ms-auto" type="reset">
          Reset
        </button>
      </div>
    </form>
  );
}
