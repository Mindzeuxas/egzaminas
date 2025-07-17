import { Link } from "react-router";

export function Sidebar() {
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Company name
          </h5>{" "}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-3 pt-lg-3 overflow-y-auto">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <Link to="/admin/" className="nav-link d-flex align-items-center gap-2">
                Dashboard
              </Link>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Categories</span>
          </h6>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <Link to="/admin/categories/new" className="nav-link d-flex align-items-center gap-2">
                Add new
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/categories" className="nav-link d-flex align-items-center gap-2">
                All categories
              </Link>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Movies</span>
          </h6>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <Link to="/admin/movies/new" className="nav-link d-flex align-items-center gap-2">
                Add new
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/movies" className="nav-link d-flex align-items-center gap-2">
                All movies
              </Link>
            </li>
          </ul>
          <hr className="my-3" />
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <Link to="/admin/settings" className="nav-link d-flex align-items-center gap-2">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
