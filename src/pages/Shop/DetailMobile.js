import { FavoriteBorderOutlined, Home, Phone, ShoppingCart } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  Rating,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ImageSlider from './Slider/ImageSlider';

export default function DetailMobile() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [packages, setPackages] = useState([]);
  const [value, setValue] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [quantity, setQuantity] = useState([]);
  const [orderId, setOrderId] = useState('');

  const handleQuantityChange = (event, value) => {
    const updatedQuantity = quantity + value;
    // Giới hạn giá trị từ 1 đến 10
    const limitedQuantity = Math.max(0, Math.min(updatedQuantity, 10));
    setQuantity(limitedQuantity);
  };

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
          console.log(onCartOrder.id);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeResponse = await fetch('https://cookyzz.azurewebsites.net/api/Recipes');
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async (selectedPackage, priceSale) => {
    const responseOders = await fetch(`https://cookyzz.azurewebsites.net/api/Orders/${orderId}`);
    const data = await responseOders.json();
    setQuantity(data.items);

    const currentItem = data.items.find((item) => item.packageId === selectedPackage.id);
    const currentQuantity = currentItem ? currentItem.quantity : 0;

    const response = await fetch(`https://cookyzz.azurewebsites.net/api/Orders/addCart/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderId,
        packageId: selectedPackage.id,
        quantity: currentQuantity + 1,
        price: priceSale,
      }),
    });

    if (!response.ok) {
      throw new Error('Error adding to cart');
    }
  };

  const isMobile = useMediaQuery('(max-width: 601px)');

  if (!recipe || !packages) {
    return (
      <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '90px' }}>
        <CircularProgress style={{ color: 'var(--primary-color' }} />
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
        <Container style={{ paddingBottom: '70px' }}>
          <ImageSlider style={{ width: '375.85px', height: '375.85px' }} />
          <>
            <Typography variant="h6" style={{ marginTop: '65px', marginBottom: '10px' }}>
              <b>{recipe.title}</b>
            </Typography>
            <Rating name="read-only" value="5" readOnly />
            <Typography variant="h6" style={{ marginTop: '10px', marginBottom: '10px' }}>
              {priceSale === selectedPrice ? (
                <span style={{ fontWeight: 'bold' }}>{selectedPrice.toLocaleString('vi-VN')}₫</span>
              ) : (
                <Box component="span">
                  <Typography variant="h6">
                    {priceSale < 0 ? (
                      <b>{0}₫</b>
                    ) : (
                      <b style={{ color: 'var(--primary-color)' }}>{priceSale.toLocaleString('vi-VN')}₫ </b>
                    )}
                    <s style={{ textDecoration: 'line-through', color: 'var(--sale-color)', fontWeight: 'bold' }}>
                      {selectedPrice.toLocaleString('vi-VN')}₫
                    </s>
                    {selectedSales >= 1000 ? (
                      <span style={{ color: 'red' }}> -{selectedSales / 1000}K </span>
                    ) : (
                      <span style={{ color: 'red' }}> -{selectedSales}₫ </span>
                    )}
                  </Typography>
                </Box>
              )}
            </Typography>
            <Typography style={{ marginBottom: '10px' }}>
              <div>
                {recipe.description.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </Typography>
            <div>
              <Select value={selectedTitle} onChange={(event) => setSelectedTitle(event.target.value)}>
                {packages
                  .filter((packageItem) => packageItem.recipeId === recipe.id)
                  .map((packageItem) => (
                    <MenuItem value={packageItem.title}>{packageItem.title}</MenuItem>
                  ))}
              </Select>
              <Typography variant="h5" style={{ fontWeight: 'bold', paddingTop: '10px' }}>
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
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>
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

            <Typography variant="h5" style={{ fontWeight: 'bold', paddingTop: '20px' }}>
              Mô tả
            </Typography>
            <span>
              {recipe.description.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
            <Typography variant="h5" style={{ fontWeight: 'bold', paddingTop: '20px' }}>
              Hướn dẫn chế biến
            </Typography>
            <span>
              {recipe.instructions.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
            <Typography variant="h5" style={{ fontWeight: 'bold', paddingTop: '20px' }}>
              Hướng dẫn bảo quản
            </Typography>
            <span>
              {recipe.preserveAdvice.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
          </>
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                style={{ color: 'var(--primary-color)' }}
                label="Trang chủ"
                icon={<Home />}
                component={Link}
                to="/"
              />
              <BottomNavigationAction
                style={{ color: 'var(--primary-color)' }}
                label="Liên hệ"
                icon={<Phone />}
                component={Link}
                to="/contact"
              />
              {/* <BottomNavigationAction label="Archive" icon={<Archive />} /> */}
              <BottomNavigationAction
                label="Thêm vào giỏ"
                variant="contained"
                color="primary"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
                component={Link}
                icon={<ShoppingCart />}
                to="/shoping-cart"
                onClick={() => handleAddToCart(selectedPackage, priceSale)}
              ></BottomNavigationAction>
            </BottomNavigation>
          </Paper>
        </Container>
      ) : (
        <Navigate to={`/shop-detail/${id}`} replace={true} />
      )}
    </>
  );
}
