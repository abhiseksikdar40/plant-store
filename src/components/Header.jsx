import { Link } from 'react-router-dom';
import '../index.css';
import WishlistCounter from './WishlistCounter';
import CartCounter from './CartCounter';

export default function Header() {
  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between">

        <div className="d-flex gap-3">
          <Link className="navbar-brand fw-bold" to="/" style={{fontFamily: "Cinzel"}}>
            PLANTHEAVENS
          </Link>
          <Link className="nav-link align-items-start pt-1" to="/">Home</Link>
          <Link className="nav-link align-items-start pt-1" to='/productsList'>Products</Link>
          <a className="nav-link align-items-start pt-1" href="#AboutUs">About</a>
        </div>

        <div className="d-flex align-items-center gap-4">
        <div className='position-relative'>
        <Link to="/wishlist">
            <img src="/favorite.png" alt="Wishlist" />
          </Link>
          <WishlistCounter />
            </div>
          
         <div className='position-relative px-2'>
         <Link to="/cart"><img src="/shopping-cart.png" alt="Shopping-Cart" style={{height: "22px"}} /></Link>
         <CartCounter />
         </div>
         <div>
          <Link to="/user"><img src="/person.png" alt="User-Profile" /></Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
