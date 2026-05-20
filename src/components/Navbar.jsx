import { Link, useLocation } from "react-router-dom";
import { useLang } from "../LangContext";
import "./Navbar.css";

export default function Navbar() {
  const { t, toggle } = useLang();
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        {t("nav_logo")}
      </Link>

      <div className="nav-links">
        <Link to="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          {t("nav_home")}
        </Link>
        <Link to="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
          {t("nav_about")}
        </Link>
        <Link to="/games" className={`nav-link ${pathname.startsWith("/games") ? "active" : ""}`}>
          {t("nav_games")}
        </Link>
      </div>

      <button className="lang-toggle" onClick={toggle}>
        {t("lang_toggle")}
      </button>
    </nav>
  );
}
