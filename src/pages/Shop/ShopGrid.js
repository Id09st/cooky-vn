import React, { useEffect, useState } from 'react';
import { Product } from '../Home/HomImage';
import { Link } from 'react-router-dom';
import { FavoriteBorderRounded, FullscreenOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Slider, TextField } from '@mui/material';

export default function ShopGrid() {
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

  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(5000000);

  const handleMinAmountChange = (event) => {
    let value = Number(event.target.value);
    value = Math.min(value, maxAmount); // Giới hạn giá trị không vượt quá maxAmount
    setMinAmount(value);
  };

  const handleMaxAmountChange = (event) => {
    let value = Number(event.target.value);
    value = Math.max(value, minAmount); // Giới hạn giá trị không nhỏ hơn minAmount
    setMaxAmount(value);
  };

  const handleSliderChange = (event, newValue) => {
    setMinAmount(newValue[0]);
    setMaxAmount(newValue[1]);
  };

  const formatCurrency = (value) => {
    return `$${value}`;
  };

  return (
    <>
      <>
        {/* Breadcrumb Section Begin */}
        <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb.jpg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="breadcrumb__text">
                  <h2>NiceCook Shop</h2>
                  <div className="breadcrumb__option">
                    <Link to="/">Trang chủ</Link>
                    <span>Shop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb Section End */}
        {/* Product Section Begin */}
        <section className="product spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-5">
                <div className="sidebar">
                  <div className="sidebar__item">
                    <h4>Department</h4>
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
                    </ul>
                  </div>
                  <div className="sidebar__item">
                    <h4>Price</h4>
                    <div className="price-range-wrap">
                      <Slider
                        value={[minAmount, maxAmount]}
                        min={0}
                        max={5000000}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={formatCurrency}
                      />
                      <div className="range-slider">
                        <div className="price-input">
                          <TextField
                            type="number"
                            value={minAmount}
                            onChange={handleMinAmountChange}
                            inputProps={{ max: maxAmount }}
                            InputProps={{
                              endAdornment: <span>$</span>,
                            }}
                          />
                          <span>-</span>
                          <TextField
                            type="number"
                            value={maxAmount}
                            onChange={handleMaxAmountChange}
                            inputProps={{ min: minAmount }}
                            InputProps={{
                              endAdornment: <span>$</span>,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar__item sidebar__item__color--option">
                    <h4>Colors</h4>
                    <div className="sidebar__item__color sidebar__item__color--white">
                      <label htmlFor="white">
                        White
                        <input type="radio" id="white" />
                      </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--gray">
                      <label htmlFor="gray">
                        Gray
                        <input type="radio" id="gray" />
                      </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--red">
                      <label htmlFor="red">
                        Red
                        <input type="radio" id="red" />
                      </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--black">
                      <label htmlFor="black">
                        Black
                        <input type="radio" id="black" />
                      </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--blue">
                      <label htmlFor="blue">
                        Blue
                        <input type="radio" id="blue" />
                      </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--green">
                      <label htmlFor="green">
                        Green
                        <input type="radio" id="green" />
                      </label>
                    </div>
                  </div>
                  <div className="sidebar__item">
                    <h4>Popular Size</h4>
                    <div className="sidebar__item__size">
                      <label htmlFor="large">
                        Large
                        <input type="radio" id="large" />
                      </label>
                    </div>
                    <div className="sidebar__item__size">
                      <label htmlFor="medium">
                        Medium
                        <input type="radio" id="medium" />
                      </label>
                    </div>
                    <div className="sidebar__item__size">
                      <label htmlFor="small">
                        Small
                        <input type="radio" id="small" />
                      </label>
                    </div>
                    <div className="sidebar__item__size">
                      <label htmlFor="tiny">
                        Tiny
                        <input type="radio" id="tiny" />
                      </label>
                    </div>
                  </div>
                  <div className="sidebar__item">
                    <div className="latest-product__text">
                      <h4>Latest Products</h4>
                      <div className="latest-product__slider owl-carousel">
                        <div className="latest-prdouct__slider__item">
                          <a href="#" className="latest-product__item">
                            <div className="latest-product__item__pic">
                              <img src="img/latest-product/lp-1.jpg" alt="" />
                            </div>
                            <div className="latest-product__item__text">
                              <h6>Crab Pool Security</h6>
                              <span>$30.00</span>
                            </div>
                          </a>
                          <a href="#" className="latest-product__item">
                            <div className="latest-product__item__pic">
                              <img src="img/latest-product/lp-2.jpg" alt="" />
                            </div>
                            <div className="latest-product__item__text">
                              <h6>Crab Pool Security</h6>
                              <span>$30.00</span>
                            </div>
                          </a>
                          <a href="#" className="latest-product__item">
                            <div className="latest-product__item__pic">
                              <img src="img/latest-product/lp-3.jpg" alt="" />
                            </div>
                            <div className="latest-product__item__text">
                              <h6>Crab Pool Security</h6>
                              <span>$30.00</span>
                            </div>
                          </a>
                        </div>
                        <div className="latest-prdouct__slider__item">
                          <a href="#" className="latest-product__item">
                            <div className="latest-product__item__pic">
                              <img src="img/latest-product/lp-1.jpg" alt="" />
                            </div>
                            <div className="latest-product__item__text">
                              <h6>Crab Pool Security</h6>
                              <span>$30.00</span>
                            </div>
                          </a>
                          <a href="#" className="latest-product__item">
                            <div className="latest-product__item__pic">
                              <img src="img/latest-product/lp-2.jpg" alt="" />
                            </div>
                            <div className="latest-product__item__text">
                              <h6>Crab Pool Security</h6>
                              <span>$30.00</span>
                            </div>
                          </a>
                          <a href="#" className="latest-product__item">
                            <div className="latest-product__item__pic">
                              <img src="img/latest-product/lp-3.jpg" alt="" />
                            </div>
                            <div className="latest-product__item__text">
                              <h6>Crab Pool Security</h6>
                              <span>$30.00</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-7">
                <div className="product__discount">
                  <div className="section-title product__discount__title">
                    <h2>Sale Off</h2>
                  </div>
                  <div className="row">
                    <div className="product__discount__slider owl-carousel">
                      <div className="col-lg-4">
                        <div className="product__discount__item">
                          <div
                            className="product__discount__item__pic set-bg"
                            data-setbg="img/product/discount/pd-1.jpg"
                          >
                            <div className="product__discount__percent">-20%</div>
                            <ul className="product__item__pic__hover">
                              <li>
                                <a href="#">
                                  <FavoriteBorderRounded />
                                </a>
                              </li>
                              <li>
                                <Link to="/shop-detail">
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                              <li>
                                <Link to="/shoping-cart">
                                  <ShoppingCartOutlined />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="product__discount__item__text">
                            <span>Dried Fruit</span>
                            <h5>
                              <a href="#">Raisin’n’nuts</a>
                            </h5>
                            <div className="product__item__price">
                              $30.00 <span>$36.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="product__discount__item">
                          <div
                            className="product__discount__item__pic set-bg"
                            data-setbg="img/product/discount/pd-2.jpg"
                          >
                            <div className="product__discount__percent">-20%</div>
                            <ul className="product__item__pic__hover">
                              <li>
                                <a href="#">
                                  <FavoriteBorderRounded />
                                </a>
                              </li>
                              <li>
                                <Link to="/shop-detail">
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                              <li>
                                <Link to="/shoping-cart">
                                  <ShoppingCartOutlined />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="product__discount__item__text">
                            <span>Vegetables</span>
                            <h5>
                              <a href="#">Vegetables’package</a>
                            </h5>
                            <div className="product__item__price">
                              $30.00 <span>$36.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="product__discount__item">
                          <div
                            className="product__discount__item__pic set-bg"
                            data-setbg="img/product/discount/pd-3.jpg"
                          >
                            <div className="product__discount__percent">-20%</div>
                            <ul className="product__item__pic__hover">
                              <li>
                                <a href="#">
                                  <FavoriteBorderRounded />
                                </a>
                              </li>
                              <li>
                                <Link to="/shop-detail">
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                              <li>
                                <Link to="/shoping-cart">
                                  <ShoppingCartOutlined />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="product__discount__item__text">
                            <span>Dried Fruit</span>
                            <h5>
                              <a href="#">Mixed Fruitss</a>
                            </h5>
                            <div className="product__item__price">
                              $30.00 <span>$36.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="product__discount__item">
                          <div
                            className="product__discount__item__pic set-bg"
                            data-setbg="img/product/discount/pd-4.jpg"
                          >
                            <div className="product__discount__percent">-20%</div>
                            <ul className="product__item__pic__hover">
                              <li>
                                <a href="#">
                                  <FavoriteBorderRounded />
                                </a>
                              </li>
                              <li>
                                <Link to="/shop-detail">
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                              <li>
                                <Link to="/shoping-cart">
                                  <ShoppingCartOutlined />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="product__discount__item__text">
                            <span>Dried Fruit</span>
                            <h5>
                              <a href="#">Raisin’n’nuts</a>
                            </h5>
                            <div className="product__item__price">
                              $30.00 <span>$36.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="product__discount__item">
                          <div
                            className="product__discount__item__pic set-bg"
                            data-setbg="img/product/discount/pd-5.jpg"
                          >
                            <div className="product__discount__percent">-20%</div>
                            <ul className="product__item__pic__hover">
                              <li>
                                <a href="#">
                                  <FavoriteBorderRounded />
                                </a>
                              </li>
                              <li>
                                <Link to="/shop-detail">
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                              <li>
                                <Link to="/shoping-cart">
                                  <ShoppingCartOutlined />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="product__discount__item__text">
                            <span>Dried Fruit</span>
                            <h5>
                              <a href="#">Raisin’n’nuts</a>
                            </h5>
                            <div className="product__item__price">
                              $30.00 <span>$36.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="product__discount__item">
                          <div
                            className="product__discount__item__pic set-bg"
                            data-setbg="img/product/discount/pd-6.jpg"
                          >
                            <div className="product__discount__percent">-20%</div>
                            <ul className="product__item__pic__hover">
                              <li>
                                <a href="#">
                                  <FavoriteBorderRounded />
                                </a>
                              </li>
                              <li>
                                <Link to="/shop-detail">
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                              <li>
                                <Link to="/shoping-cart">
                                  <ShoppingCartOutlined />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="product__discount__item__text">
                            <span>Dried Fruit</span>
                            <h5>
                              <a href="#">Raisin’n’nuts</a>
                            </h5>
                            <div className="product__item__price">
                              $30.00 <span>$36.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filter__item">
                  <div className="row">
                    <div className="col-lg-4 col-md-5">
                      <div className="filter__sort">
                        <span>Sort By</span>
                        <select>
                          <option value={0}>Default</option>
                          <option value={0}>Default</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="filter__found">
                        <h6>
                          <span>16</span> Products found
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-3">
                      <div className="filter__option">
                        <span className="icon_grid-2x2" />
                        <span className="icon_ul" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {Product.map((product) => (
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <div className="product__item">
                        <div className="product__item__pic set-bg" data-setbg={product.url}>
                          <ul className="product__item__pic__hover">
                            <li>
                              <a href="#">
                                <FavoriteBorderRounded />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <FullscreenOutlined />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <ShoppingCartOutlined />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="product__item__text">
                          <h6>
                            <a href="#">{product.title}</a>
                          </h6>
                          <h5>{product.price}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="product__pagination">
                  <a href="#">1</a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">
                    <i className="fa fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Product Section End */}
      </>
    </>
  );
}
