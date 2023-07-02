import React, { useEffect, useState } from 'react';
import { Related } from '../Home/HomImage';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  FullscreenOutlined,
  FavoriteBorderRounded,
  ShoppingCartOutlined,
  Remove,
  Add,
  Facebook,
  Twitter,
  Instagram,
  Pinterest,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Container,
  Breadcrumbs,
  IconButton,
  TextField,
  Grid,
  Button,
  useMediaQuery,
  Rating,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ShopDetail() {
  const { recipeId } = useParams();
  const { packagesId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [packages, setPackages] = useState(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`https://cookyz.azurewebsites.net/api/Packages/6`);
        if (response.ok) {
          const data = await response.json();
          setPackages(data);
        } else {
          throw new Error('Error fetching package');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackages();
  }, [packagesId]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://cookyz.azurewebsites.net/api/Recipes/6`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else {
          throw new Error('Error fetching recipe');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const [currentImage, setCurrentImage] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (recipe && recipe.image && recipe.image.length > 0) {
      setCurrentImage(recipe.image.split('\n')[0]);
    }
  }, [recipe]);

  const handleImageClick = (line) => {
    setCurrentImage(line);
    setIsClicked(true);
  };

  const isMobile = useMediaQuery('(max-width: 601px)');

  return (
    <>
      {isMobile ? (
        <Navigate to="/detail-mobile" />
      ) : (
        <>
          {recipe && (
            <>
              <Navigate to="/shop-detail" replace={true} />
              <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '70px' }}>
                {/* Bắt đầu breadcrumb Tablet pc*/}
                <Box
                  component="section"
                  sx={{
                    backgroundImage: 'url(img/breadcrumb.jpg)',
                    backgroundSize: 'cover',
                    py: 4,
                  }}
                >
                  <Container maxWidth="lg">
                    <Box textAlign="center">
                      <Typography variant="h2" style={{ color: 'var(--white-color)' }}>
                        {recipe.title}
                      </Typography>
                      <Breadcrumbs
                        aria-label="breadcrumb"
                        separator="›"
                        style={{ color: 'var(--white-color)' }}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Link underline="hover" to="/">
                          <Typography style={{ color: 'var(--white-color)' }}>Trang chủ</Typography>
                        </Link>
                        <Link underline="hover" to="/">
                          <Typography style={{ color: 'var(--white-color)' }}>{packages.title}</Typography>
                        </Link>
                        <Typography style={{ color: 'var(--white-color)' }} variant="body1">
                          {recipe.title}
                        </Typography>
                      </Breadcrumbs>
                    </Box>
                  </Container>
                </Box>
                {/* Kết thúc breadcrumb Tablet pc*/}
                <Grid container spacing={3} style={{ padding: '20px' }}>
                  <Grid item lg={6} md={6}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                      <div>
                        {recipe &&
                          recipe.image &&
                          recipe.image.split('\n').map((line, index) => {
                            const imageSize =
                              index === 0
                                ? [
                                    { width: '508px', height: '508px' },
                                    { width: '93px', height: '93px' },
                                  ]
                                : { width: '93px', height: '93px' };

                            return (
                              <React.Fragment key={index}>
                                {index === 0 ? (
                                  <>
                                    <img
                                      src={currentImage}
                                      alt={recipe.title}
                                      style={{ width: '508px', height: '508px' }}
                                    />
                                    <br />
                                    <img
                                      src={line}
                                      alt={recipe.title}
                                      style={imageSize[1]}
                                      onClick={() => handleImageClick(line)}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={line}
                                      alt={recipe.title}
                                      style={imageSize}
                                      onClick={() => handleImageClick(line)}
                                    />
                                  </>
                                )}
                              </React.Fragment>
                            );
                          })}
                      </div>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="product__details__text">
                      <Typography variant="h3">{recipe.title}</Typography>
                      <Rating name="read-only" value="5" readOnly />
                      <Typography variant="h4">₫{packages.price.toLocaleString('vi-VN')}</Typography>
                      <Typography>
                        {packages.nutritionFacts.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </Typography>
                      <Typography>
                        {packages.detail.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor: 'var(--background)',
                          color: 'var(--white-color)',
                          width: '328px',
                          height: '50px',
                          marginRight: '20px',
                          marginTop: '10px',
                        }}
                        component={Link}
                        to="/shoping-cart"
                        startIcon={
                          <ShoppingCartOutlined style={{ color: 'var(--primary-color)' }} sx={{ fontSize: 30 }} />
                        }
                      >
                        Thêm vào giỏ
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor: 'var(--white-color)',
                          color: 'var(--black-color)',
                          width: '200px',
                          height: '50px',
                          marginTop: '10px',
                        }}
                        component={Link}
                        to="/shoping-cart"
                        startIcon={
                          <FavoriteBorderRounded style={{ color: 'var(--primary-color)' }} sx={{ fontSize: 30 }} />
                        }
                      >
                        Lưu
                      </Button>
                      <ul>
                        <li>
                          <b>Sản phẩm có sẵn</b> <span>In Stock</span>
                        </li>
                        <li>
                          <b>Thời gian giao hàng</b>{' '}
                          <span>
                            01 day shipping. <samp>Free pickup today</samp>
                          </span>
                        </li>
                        <li>
                          <b>Trọng lượng</b> <span>0.5 kg</span>
                        </li>
                        <li>
                          <b>Chia sẻ</b>
                          <div className="share">
                            <Link to="#">
                              <Facebook />
                            </Link>
                            <Link to="#">
                              <Twitter />
                            </Link>
                            <Link to="#">
                              <Instagram />
                            </Link>
                            <Link to="#">
                              <Pinterest />
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Grid>
                  <Grid item lg={12}>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                          <Tab label="Mô tả" {...a11yProps(0)} />
                          <Tab label="Hướng dẫn chế biến" {...a11yProps(1)} />
                          <Tab label="Hướng dẫn bảo quản" {...a11yProps(2)} />
                        </Tabs>
                      </Box>
                      <TabPanel value={value} index={0}>
                        <div>
                          {recipe.description.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <div>
                          {recipe.instructions.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        <div>
                          {recipe.preserveAdvice.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </div>
                      </TabPanel>
                    </Box>
                  </Grid>
                </Grid>
                {/* Related Product Section Begin */}
                <section className="related-product">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="section-title related__product__title">
                          <h2>Related Product</h2>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {Related.map((related) => (
                        <div className="col-lg-3 col-md-4 col-sm-6">
                          <div className="product__item">
                            <div className="product__item__pic set-bg" data-setbg={related.url}>
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
                                  <a href="#">
                                    <ShoppingCartOutlined />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="product__item__text">
                              <h6>
                                <Link to="/">{related.title}</Link>
                              </h6>
                              <h5>{related.price}</h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                {/* Related Product Section End */}
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
}
