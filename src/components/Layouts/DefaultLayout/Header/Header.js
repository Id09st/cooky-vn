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
                    <a href="#">
                      <ShoppingCartIcon color="success" sx={{ fontSize: 25 }} /> <span>3</span>
                    </a>
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
