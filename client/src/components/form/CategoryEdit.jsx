import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
// import { CategoriesContext } from "../../context/categories/CategoriesContext";

export function CategoryEditForm() {
  const navigate = useNavigate();
  const { category } = useParams();
  // const { categories, adminRefreshCategory } = useContext(CategoriesContext);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");

  // useEffect(handleResetClick, [categories, category]);

  function handleResetClick() {
    // const categoryData = category ? categories.filter((c) => c.url_slug === category)[0] : null;
    // if (categoryData) {
    //   setId(categoryData.id);
    //   setName(categoryData.name);
    //   setUrl(categoryData.url_slug);
    //   setDescription(categoryData.description);
    //   setStatus(categoryData.is_published === 0 ? "draft" : "publish");
    // }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // fetch("http://localhost:5445/api/admin/categories/" + id, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({ name, url, description, status }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.status === "success") {
    //       adminRefreshCategory();
    //       navigate("/admin/categories");
    //     }
    //   })
    //   .catch(console.error);
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
        <div className="col-sm-12">
          <label htmlFor="url" className="form-label">
            URL slug
          </label>
          <input
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            type="text"
            className="form-control"
            id="url"
            placeholder=""
            required
          />
          <div className="invalid-feedback">Valid last name is required.</div>
        </div>
        <div className="col-sm-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
            id="description"
            placeholder=""
            required
          ></textarea>
          <div className="invalid-feedback">Valid description is required.</div>
        </div>
        <div className="my-3">
          <div className="form-check">
            <input
              onChange={() => setStatus("draft")}
              checked={status === "draft" ? "checked" : ""}
              id="draft"
              value="draft"
              name="status"
              type="radio"
              className="form-check-input"
              required
            />
            <label className="form-check-label" htmlFor="draft">
              Draft
            </label>
          </div>
          <div className="form-check">
            <input
              onChange={() => setStatus("publish")}
              checked={status === "publish" ? "checked" : ""}
              id="publish"
              value="publish"
              name="status"
              type="radio"
              className="form-check-input"
              required
            />
            <label className="form-check-label" htmlFor="publish">
              Publish
            </label>
          </div>
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
