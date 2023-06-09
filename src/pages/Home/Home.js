import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullscreenOutlined, FavoriteBorderRounded, ShoppingCartOutlined } from '@mui/icons-material';
import { Slider, Featured, Lasted } from './HomImage';
import { Button, CardContent, Container, Grid, Typography } from '@mui/material';
import ImageSlider from './Slider/ImageSlider';
import 'src/sass/_slide.scss';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('https://649febe0ed3c41bdd7a6d4a2.mockapi.io/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const recipesResponse = await fetch('https://cookyzz.azurewebsites.net/api/Recipes');
        const recipesData = await recipesResponse.json();
        setRecipes(recipesData);

        const packagesResponse = await fetch('https://cookyzz.azurewebsites.net/api/Packages');
        const packagesData = await packagesResponse.json();
        setPackages(packagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculatePriceSale = (price, sales) => {
    let priceSale = 0;
    if (sales > 0) {
      priceSale = price - sales;
    } else {
      priceSale = price;
    }
    return priceSale;
  };

  const handleAddToCart = async (pkg) => {
    const responseOders = await fetch('https://cookyzz.azurewebsites.net/api/Orders/1');
    const data = await responseOders.json();
    setQuantity(data.items);

    const currentItem = data.items.find((item) => item.packageId === pkg.id);
    const currentQuantity = currentItem ? currentItem.quantity : 0;

    const response = await fetch('https://cookyzz.azurewebsites.net/api/Orders/addCart/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        orderId: 1,
        packageId: pkg.id,
        quantity: currentQuantity + 1,
        price: pkg.price,
      }),
    });
    console.log(pkg.id);
    console.log(pkg.price);
    if (!response.ok) {
      console.error('Response status:', response.status, 'status text:', response.statusText);
      throw new Error('Error adding to cart');
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '80px' }}>
      <ImageSlider slides={Slider} style={{ padding: '20px', paddingTop: '67px' }} />

      {/* Categories Section Begin */}
      <section>
        <Grid container spacing={3}>
          {categories &&
            categories.map((category) => (
              <Grid item xs={4} sm={3} md={2} lg={2} key={category.id} component={Link} to="/">
                <div
                  style={{
                    width: '156px',
                    height: '117px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img src={category.images} alt="Category" style={{ width: '90px', height: '90px' }} />
                  <div style={{ width: '156px', height: '27px' }}>
                    <Typography variant="h6" align="center" style={{ marginTop: '10px' }}>
                      {category.name}
                    </Typography>
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>
      </section>
      {/* Categories Section End */}

      {/* Featured Section Begin */}
      <div className="row">
        <div className="col-lg-12">
          <Typography
            className="my-title"
            variant="h4"
            style={{ marginTop: '50px', marginBottom: '50px', fontWeight: 'bold' }}
          >
            Mừng bạn đến với Nice Cook
          </Typography>
        </div>
      </div>

      <div className="row featured__filter">
        {recipes.map((recipe) => {
          const pkg = packages.find((pkg) => pkg.recipeId === recipe.id);
          if (pkg) {
            return (
              <div key={recipe.id} className={`col-lg-3 col-md-4 col-sm-6 mix ${recipe.title}`}>
                <div className="featured__item">
                  <div
                    className="featured__item__pic set-bg"
                    style={{ backgroundImage: `url(${recipe.image.split('\n')[0]})` }}
                  >
                    <ul className="featured__item__pic__hover">
                      <li>
                        <a href="#">
                          <FavoriteBorderRounded />
                        </a>
                      </li>
                      <li>
                        <Link to={`shop-detail/${recipe.id}`}>
                          <FullscreenOutlined />
                        </Link>
                      </li>
                      <li>
                        <Link to="/shoping-cart" onClick={() => handleAddToCart(pkg)}>
                          <ShoppingCartOutlined />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <CardContent style={{ paddingTop: '15px' }}>
                    <Typography
                      variant="h6"
                      component={Link}
                      style={{
                        color: 'var(--black-color)',
                        fontSize: '18px',
                        fontWeight: '700',
                        height: '48px',
                        paddingTop: '10px',
                        marginBottom: '5px',
                      }}
                      to="/#"
                    >
                      {recipe.title}
                    </Typography>
                    <Typography variant="subtitle1" style={{}}>
                      {calculatePriceSale(pkg.price, pkg.sales).toLocaleString('vi-VN')}₫
                      {pkg.sales >= 1000 ? (
                        <s
                          style={{
                            marginLeft: '10px',
                            fontSize: '14px',
                            lineHeight: '20px',
                            textDecorationLine: 'line-through',
                            color: 'var(--sale-color)',
                            position: 'relative',
                            marginBottom: '5px',
                          }}
                        >
                          {pkg.sales / 1000}k
                        </s>
                      ) : pkg.sales === 0 ? (
                        <></>
                      ) : (
                        <s
                          style={{
                            marginLeft: '10px',
                            fontSize: '14px',
                            lineHeight: '20px',
                            textDecorationLine: 'line-through',
                            color: 'var(--sale-color)',
                            position: 'relative',
                            marginBottom: '5px',
                          }}
                        >
                          {pkg.sales}₫
                        </s>
                      )}
                    </Typography>
                  </CardContent>
                </div>
              </div>
            );
          }
          return null;
        })}
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
              <div className="latest-product__slider">
                <div className="latest-prdouct__slider__item">
                  {Lasted.map((lasted) => (
                    <a key={lasted.id} href="#" className="latest-product__item">
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
                    <a key={lasted.id} href="#" className="latest-product__item">
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
                    <a key={lasted.id} href="#" className="latest-product__item">
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
  );
}
