import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import defaultImg from "../../assets/default.webp";
import { AdsContext } from "../../context/ads/AdsContext";
import { CategoriesContext } from "../../context/categories/CategoriesContext";

export function AdNewForm() {
  const navigate = useNavigate();
  const { categories } = useContext(CategoriesContext);
  const { adminRefreshAds } = useContext(AdsContext);

  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  function handleCancelClick() {
    navigate("/ads");
  }

  function handleImageChange(e) {
    const formData = new FormData();
    formData.append("thumbnail", e.target.files[0]);
    fetch("http://localhost:5445/api/admin/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setImg(data.msg);
        }
      })
      .catch(console.error);
  }

  function handleMainFormSubmit(e) {
    e.preventDefault();

    const data = { name };

    if (img) {
      data.img = img.split("/").at(-1);
    }
    if (description) {
      data.description = description;
    }
    if (price) {
      data.price = price;
    }

    if (category) {
      data.category = category;
    }

    fetch("http://localhost:5445/api/admin/ads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminRefreshAds();
          navigate("/ads");
        }
      })
      .catch(console.error);
  }

  return (
    <>
      <div className="container">
        <form className="needs-validation col-12 col-md-10 col-lg-8 col-xl-6 mb-3">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="thumbnail" className="form-label">
                Thumbnail
              </label>
              <input
                onChange={handleImageChange}
                className="form-control"
                id="thumbnail"
                name="thumbnail"
                type="file"
                required
              />
              <div className="invalid-feedback">Valid image is required.</div>
            </div>
            <img id="image" className="col-12 thumbnail" src={img ? img : defaultImg} alt="" />
            <p>Image url: {img}</p>
          </div>
        </form>

        <form onSubmit={handleMainFormSubmit} className="needs-validation col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="name" className="form-label">
                Ad name
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
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="text"
                className="form-control"
                id="price"
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
              ></textarea>
              <div className="invalid-feedback">Valid description is required.</div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="form-control"
                id="category"
              >
                <option value="">Choose...</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="my-4" />
          <div className="d-flex" style={{ gap: "1rem" }}>
            <button className="btn btn-success btn-lg" type="submit">
              Create
            </button>
            <button onClick={handleCancelClick} className="btn btn-secondary btn-lg ms-auto" type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
