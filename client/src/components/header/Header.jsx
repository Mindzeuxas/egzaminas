import { Link } from "react-router";
import { MenuLink } from "./MenuLink";
import { publicMenuData, userMenuData } from "../../data/mainMenuData";

import logo from "../../assets/logo.jpg";

import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";

export function Header({ isPublicPage }) {
  const { isLoggedIn, role, logout } = useContext(UserContext);

  function handleLogoutClick() {
    fetch("http://localhost:5445/api/admin/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          logout();
        }
      })
      .catch(console.error);
  }

  return (
    <div className={isPublicPage ? "container" : "container-fluid"}>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
            <img src={logo} alt="Logo" style={{ height: "3rem" }} />
          </Link>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {publicMenuData.map((link) => (
            <MenuLink key={link.text} to={link.href}>
              {link.text}
            </MenuLink>
          ))}
        </ul>

        {isLoggedIn && role === "user" && (
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            {userMenuData.map((link) => (
              <MenuLink key={link.text} to={link.href}>
                {link.text}
              </MenuLink>
            ))}
          </ul>
        )}
        <form /*onSubmit={handleSearch}*/ className="search-form">
          <select /*value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}*/>
            {/* {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))} */}
          </select>
          <input
            type="text"
            placeholder="Search ads..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {isLoggedIn && role === "admin" && (
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <Link to="/admin" className="btn btn-primary me-2">
              Admin Dashboard
            </Link>
          </ul>
        )}
        {isLoggedIn ? (
          <div className="col-md-3 text-end">
            <button onClick={handleLogoutClick} className="btn btn-secondary">
              Log out
            </button>
          </div>
        ) : (
          <div className="col-md-3 text-end">
            <Link to="/register" className="btn btn-primary me-2">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
