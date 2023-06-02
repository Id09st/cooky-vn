import React from 'react';
import { Link } from 'react-router-dom';
import '~/components/Layouts/DefaultLayout/Header/Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
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
            <div className="col-lg-2">
              <nav className="header__menu">
                <button className="btn btn-primary-outline" id="signup">
                  SignUp
                </button>
                <button className="btn btn-primary-outline" id="login">
                  Login
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="col-lg-12">
          <div className="hero__search">
            <div className="hero__search__form">
              <form action="#">
                <div className="hero__search__categories">
                  All Categories
                  <span className="arrow_carrot-down" />
                </div>
                <input type="text" placeholder="What do you need?" />
                <button type="submit" className="site-btn">
                  SEARCH
                </button>
              </form>
            </div>
            <div className="hero__search__phone">
              <div className="hero__search__phone__text">
                <div className="header__cart">
                  <ul>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={faHeart} size="xl" style={{ color: '#426342' }} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={faBasketShopping} size="xl" style={{ color: '#426342' }} />
                      </a>
                    </li>
                  </ul>
                  <div className="header__cart__price">
                    item: <span>$150.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
