import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FullscreenOutlined, FavoriteBorderRounded, ShoppingCartOutlined } from '@mui/icons-material';
import { Categories, Featured, Lasted } from './HomImage';
import { Box, Button, Container} from '@mui/material';
import ImageSlider from './Slider/ImageSlider';
import 'src/sass/_slide.scss';

export default function Home() {
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredItems = filter === 'All' ? Featured : Featured.filter((item) => item.class.includes(filter));

  const isMobile = useMediaQuery('(max-width: 601px)');

  return (
    <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '80px' }}>
      <Box>
        <ImageSlider slides={Categories} style={{ padding: '20px', paddingTop: '67px' }} />
        </Box>
      {/* Featured Section Begin */}

      <div className="row" >
        <div className="col-lg-12">
          <div className="section-title">
            <h2>Featured Product</h2>
          </div>
          <div className="featured__controls">
            <Button variant="text" style={{ color: 'var(--primary-color)' }} onClick={() => handleFilterChange('All')}>
              All
            </Button>
            <Button
              variant="text"
              style={{ color: 'var(--primary-color)' }}
              onClick={() => handleFilterChange('oranges')}
            >
              Oranges
            </Button>
            <Button
              variant="text"
              style={{ color: 'var(--primary-color)' }}
              onClick={() => handleFilterChange('fresh-meat')}
            >
              Fresh Meat
            </Button>
            <Button
              variant="text"
              style={{ color: 'var(--primary-color)' }}
              onClick={() => handleFilterChange('vegetables')}
            >
              Vegetables
            </Button>
            <Button
              variant="text"
              style={{ color: 'var(--primary-color)' }}
              onClick={() => handleFilterChange('fastfood')}
            >
              Fastfood
            </Button>
          </div>
        </div>
      </div>

          <div className="row featured__filter">
            {filteredItems.map((featured, index) => (
              <div className={`col-lg-3 col-md-4 col-sm-6 mix ${featured.class}`} key={index}>
                <div className="featured__item">
                  <div className="featured__item__pic set-bg" style={{ backgroundImage: `url(${featured.url})` }}>
                    <ul className="featured__item__pic__hover">
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
                  <div className="featured__item__text">
                    <h6>
                      <Link to="/#">{featured.title}</Link>
                    </h6>
                    <h5>{featured.price}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Featured Section End */}

          {/* Banner Begin */}
          <div className="banner">
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
          {/* Banner End */}
          {/* Latest Product Section Begin */}
          <section className="latest-product spad">
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
          </section>
          {/* Latest Product Section End */}
        </Container>
      )}
    </>
  );
}
