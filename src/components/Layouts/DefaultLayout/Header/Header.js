import React from 'react';
import { Link } from 'react-router-dom';
import '~/sass/_header.scss';
import '~/sass/_responsive.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import logo from '~/assets/images/logo.png';

export default function Header() {
  return (
    <>
      <>
        {/* Humberger Begin */}
        <div className="humberger__menu__overlay" />
        <div className="humberger__menu__wrapper">
          <div className="humberger__menu__logo">
            <a href="#">
              <img src="img/logo.png" alt="" />
            </a>
          </div>
          <div className="humberger__menu__cart">
            <ul>
              <li>
                <a href="#">
                  <i className="fa fa-heart" /> <span>1</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-shopping-bag" /> <span>3</span>
                </a>
              </li>
            </ul>
            <div className="header__cart__price">
              item: <span>$150.00</span>
            </div>
          </div>
          <div className="humberger__menu__widget">
            <div className="header__top__right__language">
              <img src="img/language.png" alt="" />
              <div>English</div>
              <span className="arrow_carrot-down" />
              <ul>
                <li>
                  <a href="#">Spanis</a>
                </li>
                <li>
                  <a href="#">English</a>
                </li>
              </ul>
            </div>
            <div className="header__top__right__auth">
              <a href="#">
                <i className="fa fa-user" /> Login
              </a>
            </div>
          </div>
          <nav className="humberger__menu__nav mobile-menu">
            <ul>
              <li className="active">
                <a href="./index.html">Home</a>
              </li>
              <li>
                <a href="./shop-grid.html">Shop</a>
              </li>
              <li>
                <a href="#">Pages</a>
                <ul className="header__menu__dropdown">
                  <li>
                    <a href="./shop-details.html">Shop Details</a>
                  </li>
                  <li>
                    <a href="./shoping-cart.html">Shoping Cart</a>
                  </li>
                  <li>
                    <a href="./checkout.html">Check Out</a>
                  </li>
                  <li>
                    <a href="./blog-details.html">Blog Details</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="./blog.html">Blog</a>
              </li>
              <li>
                <a href="./contact.html">Contact</a>
              </li>
            </ul>
          </nav>
          <div id="mobile-menu-wrap" />
          <div className="header__top__right__social">
            <a href="#">
              <i className="fa fa-facebook" />
            </a>
            <a href="#">
              <i className="fa fa-twitter" />
            </a>
            <a href="#">
              <i className="fa fa-linkedin" />
            </a>
            <a href="#">
              <i className="fa fa-pinterest-p" />
            </a>
          </div>
          <div className="humberger__menu__contact">
            <ul>
              <li>
                <i className="fa fa-envelope" /> hello@colorlib.com
              </li>
              <li>Free Shipping for all Order of $99</li>
            </ul>
          </div>
        </div>
        {/* Humberger End */}
      </>

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
      <>
        {/* Hero Section Begin */}
        <section className="hero">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="hero__categories">
                  <div className="hero__categories__all">
                    <i className="fa fa-bars" />
                    <span>All departments</span>
                  </div>
                  <ul>
                    <li>
                      <a href="#">Fresh Meat</a>
                    </li>
                    <li>
                      <a href="#">Vegetables</a>
                    </li>
                    <li>
                      <a href="#">Fruit &amp; Nut Gifts</a>
                    </li>
                    <li>
                      <a href="#">Fresh Berries</a>
                    </li>
                    <li>
                      <a href="#">Ocean Foods</a>
                    </li>
                    <li>
                      <a href="#">Butter &amp; Eggs</a>
                    </li>
                    <li>
                      <a href="#">Fastfood</a>
                    </li>
                    <li>
                      <a href="#">Fresh Onion</a>
                    </li>
                    <li>
                      <a href="#">Papayaya &amp; Crisps</a>
                    </li>
                    <li>
                      <a href="#">Oatmeal</a>
                    </li>
                    <li>
                      <a href="#">Fresh Bananas</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="hero__search">
                  <div className="hero__search__form">
                    <form action="#">
                      <div className="hero__search__categories">
                        All Categories
                        <span className="arrow_carrot-down" />
                      </div>
                      <input type="text" placeholder="What do yo u need?" />
                      <button type="submit" className="site-btn">
                        SEARCH
                      </button>
                    </form>
                  </div>
                  <div className="hero__search__phone">
                    <div className="hero__search__phone__icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="hero__search__phone__text">
                      <h5>+65 11.188.888</h5>
                      <span>support 24/7 time</span>
                    </div>
                  </div>
                </div>
                <div className="hero__item set-bg" data-setbg="img/hero/banner.jpg">
                  <div className="hero__text">
                    <span>FRUIT FRESH</span>
                    <h2>
                      Vegetable <br />
                      100% Organic
                    </h2>
                    <p>Free Pickup and Delivery Available</p>
                    <a href="#" className="primary-btn">
                      SHOP NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Hero Section End */}
      </>
    </>
  );
}
