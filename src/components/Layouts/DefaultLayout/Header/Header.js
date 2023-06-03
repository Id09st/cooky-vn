import React from 'react';
import { Link } from 'react-router-dom';
import '~/sass/_header.scss';
import '~/sass/_responsive.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import logo from '~/assets/images/logo.png';


export default function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row">
            <div class="col-lg-3">
              <div class="header__logo">
                <Link to="/">
                  <img src={logo} alt="/" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul>
                  <li className="active">
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/shop-grid">Shop</Link>
                  </li>
                  <li>
                    <a href="#">Pages</a>
                    <ul className="header__menu__dropdown">
                      <li>
                        <Link to="/shop-detail">Shop Detail</Link>
                      </li>
                      <li>
                        <Link to="/shoping-cart">Shoping Cart</Link>
                      </li>
                      <li>
                        <Link to="/checkout">Check Out</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div class="header__cart">
                <ul>
                  <li>
                    <a href="#">
                      <FavoriteIcon color="success" sx={{ fontSize: 25 }} /> <span>1</span>
                    </a>
                  </li>
                  <li>
                    <Link to="/shoping-cart">
                      <ShoppingCartIcon color="success" sx={{ fontSize: 25 }} /> <span>3</span>
                    </Link>
                  </li>
                </ul>
                <div class="header__cart__price">
                  item: <span>$150.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <>
      </>
    </>
  );
}
