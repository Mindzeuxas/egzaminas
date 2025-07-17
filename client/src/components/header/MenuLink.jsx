import { Link, useLocation } from "react-router";

export function MenuLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to ? "link-secondary" : "";

  return (
    <li>
      <Link className={`nav-link px-2 ${isActive}`} to={to}>
        {children}
      </Link>
    </li>
  );
}
