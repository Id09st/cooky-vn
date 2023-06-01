import React from 'react';
import { Link } from 'react-router-dom';
import '~/components/Header/Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div class="col-lg-3">
            <div class="header__logo">
            <Link to="/">
              <img src="https://o.remove.bg/downloads/ec011f8c-d27c-4963-9be6-ebab13206eb3/logo-removebg-preview.png" alt="" />
            </Link>
            </div>
          </div>
          <div className="col-lg-7">
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
                      <Link to="/shop-details">Shop Details</Link>
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
          <div className="col-lg-2">
            <nav className="header__menu">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <button className="btn btn-primary-outline" id="signup">
                    SignUp
                  </button>
                </li>
                <li>
                  <button className="btn btn-primary-outline" id="login">
                    Login
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
