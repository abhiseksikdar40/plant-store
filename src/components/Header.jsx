import { Link } from 'react-router-dom';
import '../index.css';

export default function Header() {
  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between">

        <div className="d-flex gap-3">
          <Link className="navbar-brand fw-bold" to="/" style={{fontFamily: "Cinzel"}}>
            PLANTHEAVENS
          </Link>
          <a className="nav-link align-items-start pt-1" href="#ProductSection">Products</a>
          <a className="nav-link align-items-start pt-1" href="#AboutUs">About</a>
        </div>

        <div className="d-flex gap-3">
          <Link to="/wishlist">
            <img src="/favorite.png" alt="Wishlist" />
          </Link>
          <Link to="/cart" className="px-4"><img src="/shopping-cart.png" alt="Shopping-Cart" style={{height: "22px"}} /></Link>
          <Link to="/user"><img src="/person.png" alt="User-Profile" /></Link>
        </div>
      </div>
    </nav>
  );
}
