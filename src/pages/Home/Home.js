import React, { useEffect } from 'react';
import { Categories, Featured, Lasted, Image4 } from './HomImage';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    const setBgImages = () => {
      const elements = document.getElementsByClassName('set-bg');
      Array.from(elements).forEach((element) => {
        const bg = element.dataset.setbg;
        element.style.backgroundImage = `url(${bg})`;
      });
    };
    setBgImages();
  }, []);

  return (
    <>
      {/* Categories Section Begin */}
      <section className="categories">
        <div className="container">
          <div className="row">
            {Categories.map((categories) => (
              <div className="col-lg-3" key={categories.id}>
                <div className="categories__item set-bg" data-setbg={categories.url}>
                  <h5>
                    <Link to="/#">{categories.title}</Link>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Categories Section End */}
      {/* Featured Section Begin */}
      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Featured Product</h2>
              </div>
              <div className="featured__controls">
                <ul>
                  <li className="active" data-filter="*">
                    All
                  </li>
                  <li data-filter=".oranges">Oranges</li>
                  <li data-filter=".fresh-meat">Fresh Meat</li>
                  <li data-filter=".vegetables">Vegetables</li>
                  <li data-filter=".fastfood">Fastfood</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {Featured.map((featured) => (
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className={featured.class}>
                  <div className="featured__item">
                    <div className="featured__item__pic set-bg" data-setbg={featured.url}>
                      <ul className="featured__item__pic__hover">
                        <li>
                          <a href="#">
                            <FavoriteIcon />
                          </a>
                        </li>
                        <li>
                          <Link to="/shop-detail">
                            <CropFreeIcon />
                          </Link>
                        </li>
                        <li>
                          <Link to="/shoping-cart">
                            <ShoppingCartIcon />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="featured__item__text">
                      <h6>
                        <Link to="/#">{featured.title}</Link>
                      </h6>
                      <h5>{featured.price}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Section End */}
      {/* Banner Begin */}
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src="img/banner/banner-1.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src="img/banner/banner-2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner End */}
      {/* Latest Product Section Begin */}
      <section className="latest-product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="latest-product__text">
                <h4>Latest Products</h4>
                <div class="latest-product__slider">
                  <div className="latest-prdouct__slider__item">
                    {Lasted.map((lasted) => (
                      <a href="#" className="latest-product__item">
                        <div className="latest-product__item__pic">
                          <img src={lasted.url} alt="" />
                        </div>
                        <div className="latest-product__item__text">
                          <h6>{lasted.title}</h6>
                          <span>{lasted.price}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="latest-product__text">
                <h4>Top Rated Products</h4>
                <div className="latest-product__slider">
                  <div className="latest-prdouct__slider__item">
                    {Lasted.map((lasted) => (
                      <a href="#" className="latest-product__item">
                        <div className="latest-product__item__pic">
                          <img src={lasted.url} alt="" />
                        </div>
                        <div className="latest-product__item__text">
                          <h6>{lasted.title}</h6>
                          <span>{lasted.price}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="latest-product__text">
                <h4>Review Products</h4>
                <div className="latest-product__slider">
                  <div className="latest-prdouct__slider__item">
                    {Lasted.map((lasted) => (
                      <a href="#" className="latest-product__item">
                        <div className="latest-product__item__pic">
                          <img src={lasted.url} alt="" />
                        </div>
                        <div className="latest-product__item__text">
                          <h6>{lasted.title}</h6>
                          <span>{lasted.price}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Product Section End */}
    </>
  );
}
