import React, { useCallback, useEffect, useState } from 'react';
import { Related } from '../Home/HomImage';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  FullscreenOutlined,
  FavoriteBorderRounded,
  ShoppingCartOutlined,
  Facebook,
  Twitter,
  Instagram,
  Pinterest,
  Home,
  Whatshot,
  Grain,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Container,
  Breadcrumbs,
  Button,
  useMediaQuery,
  Rating,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import PropTypes from 'prop-types';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

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
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [packages, setPackages] = useState([]);
  const [value, setValue] = React.useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeResponse = await fetch('https://cookyz.somee.com/api/recipes/');
        const recipeData = await recipeResponse.json();
        const recipeItem = recipeData.find((item) => item.id === parseInt(id));
        setRecipe(recipeItem);

        const packageResponse = await fetch('https://cookyzz.azurewebsites.net/api/Packages/');
        const packageData = await packageResponse.json();
        setPackages(packageData);
        const relatedPackages = packageData.filter((packageItem) => packageItem.recipeId === parseInt(id));
        if (relatedPackages.length > 0) {
          setSelectedTitle(relatedPackages[0].title);
        }
        // const relatedPackages = packageData.filter((packageItem) => packageItem.recipeId === parseInt(id));
        // if (relatedPackages.length > 0) {
        //   setSelectedDetail(relatedPackages[0].detail.split('\n')[0]);
        // }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (recipe && recipe.image && recipe.image.length > 0) {
      setCurrentImage(recipe.image.split('\n')[0]);
    }
  }, [recipe]);

  const handleImageClick = (line) => {
    setCurrentImage(line);
  };

  const isMobile = useMediaQuery('(max-width: 601px)');

  if (!recipe || !packages) {
    return (
      <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '90px' }}>
        Không có PACK phù hợp
      </Container>
    );
  }

  const selectedPackage = packages.find((packageItem) => packageItem.title === selectedTitle);
  const selectedPrice = selectedPackage ? selectedPackage.price : 0;
  const selectedSales = selectedPackage ? selectedPackage.sales : 0;
  const selectedDetail = selectedPackage ? selectedPackage.detail : '';
  const selectedNutritionFacts = selectedPackage ? selectedPackage.nutritionFacts : '';

  let priceSale = 0;
  if (selectedSales > 0) {
    priceSale = selectedPrice - selectedSales;
  } else {
    priceSale = selectedPrice;
  }

  return (
    <>
      {isMobile ? (
        <Navigate to={`/detail-mobile/${id}`} />
      ) : (
        <>
          <Navigate to={`/shop-detail/${id}`} replace={true} />
          <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '90px' }}>
            {/* Bắt đầu breadcrumb Tablet pc*/}
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb" style={{ color: 'var(--black-color)' }}>
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  style={{ color: 'var(--black-color)' }}
                  to="/"
                >
                  <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                  Trang chủ
                </Link>
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  style={{ color: 'var(--black-color)' }}
                  to="/"
                >
                  <Whatshot sx={{ mr: 0.5 }} fontSize="inherit" />
                  {recipe.title}
                </Link>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                  <Grain sx={{ mr: 0.5 }} fontSize="inherit" />
                  {recipe.title}
                </Typography>
              </Breadcrumbs>
            </div>
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
                                  style={{
                                    marginLeft: '50px',
                                    ...imageSize[1],
                                    border: line === currentImage ? '2px solid red' : 'none',
                                  }}
                                  onClick={() => handleImageClick(line)}
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  src={line}
                                  alt={recipe.title}
                                  style={{
                                    margin: '9px 0 9px 9px',
                                    textAlign: 'center',
                                    ...imageSize,
                                    border: line === currentImage ? '2px solid red' : 'none',
                                  }}
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
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                  {recipe.title}
                </Typography>
                <Rating name="read-only" value={Number('5')} readOnly />
                <Typography variant="h5">
                  {' '}
                  {priceSale === selectedPrice ? (
                    <span style={{ fontWeight: 'bold' }}>{selectedPrice.toLocaleString('vi-VN')}₫</span>
                  ) : (
                    <Box component="span">
                      <Typography
                        variant="h6"
                        style={{ textDecoration: 'line-through', color: 'var(--sale-color)', fontWeight: 'bold' }}
                      >
                        {selectedPrice.toLocaleString('vi-VN')}₫
                      </Typography>
                      <Typography variant="h6">
                        {selectedSales >= 1000 ? (
                          <span style={{ color: 'red' }}>-{selectedSales / 1000}K </span>
                        ) : (
                          <span style={{ color: 'red' }}>-{selectedSales}₫ </span>
                        )}
                        {priceSale < 0 ? <b>{0}₫</b> : <b>{priceSale.toLocaleString('vi-VN')}₫</b>}
                      </Typography>
                    </Box>
                  )}
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
                  startIcon={<ShoppingCartOutlined style={{ color: 'var(--primary-color)' }} sx={{ fontSize: 30 }} />}
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
                  startIcon={<FavoriteBorderRounded style={{ color: 'var(--primary-color)' }} sx={{ fontSize: 30 }} />}
                >
                  Lưu
                </Button>
                {/* <ul>
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
                </ul> */}

                <div style={{ paddingTop: '20px' }}>
                  <Select value={selectedTitle} onChange={(event) => setSelectedTitle(event.target.value)}>
                    {packages
                      .filter((packageItem) => packageItem.recipeId === recipe.id)
                      .map((packageItem) => (
                        <MenuItem value={packageItem.title}>{packageItem.title}</MenuItem>
                      ))}
                  </Select>
                  <Typography variant="h5" style={{ fontWeight: 'bold', paddingTop: '20px' }}>
                    Thành phần
                  </Typography>
                  <p>
                    {selectedDetail.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                  <Typography variant="h5" style={{ fontWeight: 'bold', paddingTop: '20px' }}>
                    Dinh dưỡng
                  </Typography>
                  <p>
                    {selectedNutritionFacts.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </Grid>
              <Grid item lg={12}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChanges} aria-label="basic tabs example">
                      <Tab label="Mô tả" {...a11yProps(0)} />
                      <Tab label="Hướng dẫn chế biến" {...a11yProps(1)} />
                      <Tab label="Hướng dẫn bảo quản" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <span>
                      {recipe.description.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </span>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <span>
                      {recipe.instructions.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </span>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <span>
                      {recipe.preserveAdvice.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </span>
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
            {/* Related Product Section Begin */}
            <div style={{ paddingBottom: '30px' }}>
              <div className="row">
                <div className="col-lg-12">
                  <Typography className="my-title" variant="h4" style={{ marginBottom: '70px', fontWeight: 'bold' }}>
                    Related Product
                  </Typography>
                </div>
              </div>
              <div className="row">
                {Related.map((related, index) => (
                  <div key={index} className="col-lg-3 col-md-4 col-sm-6">
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
            {/* Related Product Section End */}
          </Container>
        </>
      )}
    </>
  );
}
