import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullscreenOutlined, FavoriteBorderRounded, ShoppingCartOutlined } from '@mui/icons-material';
import { Slider, Featured, Lasted } from './HomImage';
import { Button, CardContent, Container, Grid, Typography, useMediaQuery, Tabs, Tab, Box } from '@mui/material';
import ImageSlider from './Slider/ImageSlider';
import 'src/sass/_slide.scss';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [displayedRecipes, setDisplayedRecipes] = useState(12);
  const [showMore, setShowMore] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Tất cả');
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const nameFromStorage = localStorage.getItem('name');
        const response = await fetch('https://cookyzz.azurewebsites.net/api/Users/');
        const users = await response.json();
        const user = users.find((user) => user.username === nameFromStorage);
        const userResponse = await fetch(`https://cookyzz.azurewebsites.net/api/Users/${user.id}`);
        const data = await userResponse.json();
        const onCartOrder = data.orders.find((order) => order.status === 'On-cart');
        if (onCartOrder) {
          setOrderId(onCartOrder.id);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
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

  const handleAddToCart = async (pkg, event) => {
    console.log('dfsbahjfbgdjshfb ', event);
    event.preventDefault();
    const responseOders = await fetch(`https://cookyzz.azurewebsites.net/api/Orders/${orderId}`);
    const data = await responseOders.json();

    const currentItem = data.items.find((item) => item.packageId === pkg.id);
    const currentQuantity = currentItem ? currentItem.quantity : 0;

    const response = await fetch(`https://cookyzz.azurewebsites.net/api/Orders/addCart/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        orderId: orderId,
        packageId: pkg.id,
        quantity: currentQuantity + 1,
        price: (pkg.price - pkg.sales) * (currentQuantity + 1),
      }),
    });

    if (!response.ok) {
      console.error('Response status:', response.status, 'status text:', response.statusText);
      throw new Error('Error adding to cart');
    }
    window.scrollTo(0, 0);
    navigate('/shoping-cart');
  };

  const handleTabChange = (event, newValue) => {
    setSelectedRegion(newValue);
  };

  const regions = ['Tất cả', 'Miền Bắc', 'Miền Trung', 'Miền Nam', 'Miền Tây'];

  const filteredRecipes = recipes.filter((recipe) => {
    if (selectedRegion === 'Tất cả') {
      return true;
    } else {
      return recipe.categories.some((category) => category.name === selectedRegion);
    }
  });

  const visibleRecipes = filteredRecipes.slice(0, displayedRecipes);

  const handleViewMoreClick = () => {
    setDisplayedRecipes(filteredRecipes.length);
    setShowMore(true);
  };

  const handleHideMoreClick = () => {
    setShowMore(false);
    setDisplayedRecipes(8);
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  const isMobile = useMediaQuery('(max-width: 601px)');
  const role = localStorage.getItem('role');

  return (
    <>
      {isMobile ? (
        <>
          <Container maxWidth="lg" style={{ paddingTop: '60px' }}>
            {/* Categories Section Begin */}
            <section>
              <Grid container spacing={1}>
                {categories &&
                  categories.map((category) => (
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={2}
                      lg={2}
                      key={category.id}
                      component={Link}
                      to={`/results/${category.tag}`}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img src={category.images} alt="Category" style={{ width: '50px', height: '50px' }} />
                        <div style={{ width: '156px', height: '27px' }}>
                          <Typography variant="h6" align="center" style={{ marginBottom: '20px' }}>
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
                  variant="h6"
                  style={{ marginTop: '10px', marginBottom: '30px', fontWeight: 'bold' }}
                >
                  Mừng bạn đến với <br /> Nice Cook
                </Typography>
              </div>
            </div>

            <Tabs
              value={selectedRegion}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="Recipe Tabs"
              style={{ marginBottom: '40px' }}
            >
              {regions.map((region, index) => (
                <Tab key={index} label={region} value={region} style={{ fontSize: '20px' }} />
              ))}
            </Tabs>

            <div className="row featured__filter">
              {filteredRecipes.map((recipe) => {
                const pkg = packages.find((pkg) => pkg.recipeId === recipe.id);
                if (pkg) {
                  return (
                    <div key={recipe.id} className={`col-lg-3 col-md-4 col-sm-6 mix ${recipe.title}`}>
                      <div className="featured__item">
                        <div
                          className="featured__item__pic set-bg"
                          style={{ backgroundImage: `url(${recipe.image.split('\n')[0]})` }}
                        >
                          {role === 'User' || role === 'Admin' ? (
                            <ul className="featured__item__pic__hover">
                              <li>
                                <Link to="/">
                                  <FavoriteBorderRounded />
                                </Link>
                              </li>
                              <li>
                                <Link to={`shop-detail/${recipe.id}`}>
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                              <li>
                                <Link to="/shoping-cart" onClick={(event) => handleAddToCart(pkg, event)}>
                                  <ShoppingCartOutlined />
                                </Link>
                              </li>
                            </ul>
                          ) : (
                            <ul className="featured__item__pic__hover">
                              <li>
                                <Link to={`shop-detail/${recipe.id}`}>
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                            </ul>
                          )}
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
                    <img src="img/banner/banner-1.jpg" alt="" style={{ borderRadius: '15px' }} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="banner__pic" style={{ marginTop: '10px' }}>
                    <img src="img/banner/banner-2.jpg" alt="" style={{ borderRadius: '15px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Banner End */}
          </Container>
        </>
      ) : (
        <>
          <Container maxWidth="lg" style={{ padding: '10px', paddingTop: '80px' }}>
            <ImageSlider slides={Slider} style={{ padding: '20px', paddingTop: '67px' }} />
            {/* Categories Section Begin */}
            <section>
              <Grid container spacing={1}>
                {categories &&
                  categories.map((category) => (
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={2}
                      lg={2}
                      key={category.id}
                      component={Link}
                      to={`/results/${category.tag}`}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img src={category.images} alt="Category" style={{ width: '90px', height: '90px' }} />
                        <div style={{ width: '156px', height: '27px' }}>
                          <Typography variant="h6" align="center" style={{ marginBottom: '20px' }}>
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
                  style={{ marginTop: '5px', marginBottom: '30px', fontWeight: 'bold' }}
                >
                  Mừng bạn đến với Nice Cook
                </Typography>
              </div>
            </div>

            <Tabs
              value={selectedRegion}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="Recipe Tabs"
              style={{ marginBottom: '40px' }}
            >
              {regions.map((region, index) => (
                <Tab key={index} label={region} value={region} style={{ fontSize: '20px' }} />
              ))}
            </Tabs>

            <div className="row featured__filter">
              {visibleRecipes.map((recipe) => {
                const pkg = packages.find((pkg) => pkg.recipeId === recipe.id);
                if (pkg) {
                  return (
                    <div key={recipe.id} className={`col-lg-3 col-md-4 col-sm-6 mix ${recipe.title}`}>
                      <div className="featured__item">
                        <div
                          className="featured__item__pic set-bg"
                          style={{ backgroundImage: `url(${recipe.image.split('\n')[0]})` }}
                        >
                          {role === 'User' || role === 'Admin' ? (
                            <ul className="featured__item__pic__hover">
                              <li>
                                <Link to="/">
                                  <FavoriteBorderRounded />
                                </Link>
                              </li>
                              <li>
                                <Link to={`shop-detail/${recipe.id}`} onClick={scrollToTop}>
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                              <li>
                                <Link to="/shoping-cart" onClick={(event) => handleAddToCart(pkg, event)}>
                                  <ShoppingCartOutlined />
                                </Link>
                              </li>
                            </ul>
                          ) : (
                            <ul className="featured__item__pic__hover">
                              <li>
                                <Link to={`shop-detail/${recipe.id}`}>
                                  <FullscreenOutlined />
                                </Link>
                              </li>
                            </ul>
                          )}
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
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              {showMore ? (
                <Button variant="outlined" color="primary" onClick={handleHideMoreClick} style={{ width: '100%' }}>
                  Ẩn bớt
                </Button>
              ) : (
                displayedRecipes < filteredRecipes.length && (
                  <Button variant="outlined" color="primary" onClick={handleViewMoreClick} style={{ width: '100%' }}>
                    Xem thêm
                  </Button>
                )
              )}
            </div>

            {/* Featured Section End */}

            {/* Banner Begin */}
            <div className="banner">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="banner__pic">
                    <img
                      src="img/banner/banner-1.jpg"
                      alt=""
                      style={{ height: '300px', width: '565px', borderRadius: '15px' }}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="banner__pic">
                    <img
                      src="img/banner/banner-2.jpg"
                      alt=""
                      style={{ height: '300px', width: '565px', borderRadius: '15px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Banner End */}
          </Container>
        </>
      )}
    </>
  );
}
