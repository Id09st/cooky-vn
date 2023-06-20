import React, { useEffect, useState } from 'react';
import { Related } from '../Home/HomImage';
import { Link, Navigate } from 'react-router-dom';
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
  ButtonBase,
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

const images = [
  {
    url: './img/product/details/product-details-2.jpg',
    title: 'Marvel Studios',
    width: '120px',
  },
  {
    url: './img/product/details/product-details-3.jpg',
    title: 'DC Studios',
    width: '120px',
  },
  {
    url: './img/product/details/product-details-4.jpg',
    title: 'DC Studios',
    width: '120px',
  },
  {
    url: './img/product/details/product-details-5.jpg',
    title: 'DC Studios',
    width: '120px',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: '120px',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: '120px',
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

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

  const [selectedImage, setSelectedImage] = React.useState(null);

  React.useEffect(() => {
    // Kiểm tra xem trang có được tải lại hay không
    if (!selectedImage) {
      // Đặt ảnh mặc định khi trang được tải lại
      const defaultImage = {
        url: './img/product/details/product-details-1.jpg',
        title: 'Default Image',
      };
      setSelectedImage(defaultImage);
    }
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event, value) => {
    const updatedQuantity = quantity + value;
    // Giới hạn giá trị từ 1 đến 10
    const limitedQuantity = Math.max(0, Math.min(updatedQuantity, 10));
    setQuantity(limitedQuantity);
  };

  const isMobile = useMediaQuery('(max-width: 601px)');

  return (
    <>
      {isMobile ? (
        <Navigate to="/detail-mobile" />
      ) : (
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
                    Vegetable’s Package
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
                      <Typography style={{ color: 'var(--white-color)' }}>Home</Typography>
                    </Link>
                    <Link underline="hover" to="/">
                      <Typography style={{ color: 'var(--white-color)' }}>Vegetables</Typography>
                    </Link>
                    <Typography style={{ color: 'var(--white-color)' }} variant="body1">
                      Vegetable’s Package
                    </Typography>
                  </Breadcrumbs>
                </Box>
              </Container>
            </Box>
            {/* Kết thúc breadcrumb Tablet pc*/}
            <Grid container spacing={3} style={{ padding: '20px' }}>
              <Grid item lg={6} md={6}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                  {images.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: image.width,
                      }}
                      onClick={() => handleImageClick(image)}
                    >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                    </ImageButton>
                  ))}
                  {selectedImage && (
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.title}
                      loading="lazy"
                      style={{ weight: '500px', height: '480px' }}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <div className="product__details__text">
                  <Typography variant="h3">Vetgetable’s Package</Typography>
                  <Rating name="read-only" value="5" readOnly />
                  <Typography variant="h4">$50.00</Typography>
                  <Typography>
                    Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam
                    vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam
                    vehicula elementum sed sit amet dui. Proin eget tortor risus.
                  </Typography>
                  <IconButton onClick={(event) => handleQuantityChange(event, -1)}>
                    <Remove sx={{ fontSize: 15 }} />
                  </IconButton>
                  <TextField
                    name="quantity"
                    value={quantity}
                    style={{ width: '50px' }}
                    onChange={(event) => {
                      handleQuantityChange(event.target.value, 0);
                    }}
                    inputProps={{
                      min: 1,
                      max: 10,
                    }}
                  />
                  <IconButton onClick={(event) => handleQuantityChange(event, 1)}>
                    <Add sx={{ fontSize: 15 }} />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
                    component={Link}
                    to="/shoping-cart"
                  >
                    Add to cart
                  </Button>
                  <Link to="/">
                    <FavoriteBorderRounded style={{ color: 'var(--primary-color)' }} sx={{ fontSize: 30 }} />
                  </Link>
                  <ul>
                    <li>
                      <b>Availability</b> <span>In Stock</span>
                    </li>
                    <li>
                      <b>Shipping</b>{' '}
                      <span>
                        01 day shipping. <samp>Free pickup today</samp>
                      </span>
                    </li>
                    <li>
                      <b>Weight</b> <span>0.5 kg</span>
                    </li>
                    <li>
                      <b>Share on</b>
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
                      <Tab label="Description" {...a11yProps(0)} />
                      <Tab label="Information" {...a11yProps(1)} />
                      <Tab label="Reviews (1)" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <p>
                      Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id
                      orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor
                      volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum
                      congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu
                      erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque
                      nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec
                      velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.
                    </p>
                    <p>
                      Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras
                      ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed
                      porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac
                      diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac
                      diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.
                    </p>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <p>
                      Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id
                      orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor
                      volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum
                      congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu
                      erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque
                      nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec
                      velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.
                    </p>
                    <p>
                      Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras
                      ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed
                      porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                    </p>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <p>
                      Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id
                      orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor
                      volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum
                      congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu
                      erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque
                      nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec
                      velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.
                    </p>
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
  );
}
