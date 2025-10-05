import "../css/NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
    return <nav className = "navBar">
        <div className = "navbar-brand">
            <Link to = "/" className = "navbar-brand-a"> CineBox </Link>
        </div>
        <div className = "navbar-links">
            <Link to = "/" className = "nav-link"> Home </Link>
            <Link to = "Favorites" className = "nav-link"> Favorites </Link>
        </div>
    </nav>
}

export default NavBar;