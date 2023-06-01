import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ShopGrid from './pages/Shop/ShopGrid';
import ShopDetail from './pages/Shop/ShopDetail';
import ShopingCart from './pages/Shop/ShopingCart';
import CheckOut from './pages/Shop/CheckOut';
import Contact from './pages/Contact/Contact';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop-grid" element={<ShopGrid />} />
          <Route path="/shop-details" element={<ShopDetail />} />
          <Route path="/shoping-cart" element={<ShopingCart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
