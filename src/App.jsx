import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import User from './pages/User';
import Home from './pages/Home';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import { StoreProvider } from './context/StoreContext';

function App() {
  return (
    <StoreProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/user" element={<User />} />
        <Route path='/productsList' element={<ProductList />} />
        <Route path='/product' element={<Product />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
