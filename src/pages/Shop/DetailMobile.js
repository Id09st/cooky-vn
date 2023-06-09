import {
  Add,
  Archive,
  Facebook,
  Favorite,
  FavoriteBorderRounded,
  Instagram,
  Pinterest,
  Remove,
  Restore,
  Twitter,
} from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ImageSlider from './Slider/ImageSlider';

export default function DetailMobile() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [recipe, setRecipe] = useState(null);
  const [packages, setPackages] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleQuantityChange = (event, value) => {
    const updatedQuantity = quantity + value;
    // Giới hạn giá trị từ 1 đến 10
    const limitedQuantity = Math.max(0, Math.min(updatedQuantity, 10));
    setQuantity(limitedQuantity);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeResponse = await fetch('https://cookyzz.azurewebsites.net/api/Recipes/');
        const recipeData = await recipeResponse.json();
        const recipeItem = recipeData.find((item) => item.id === parseInt(id));
        setRecipe(recipeItem);

        const packageResponse = await fetch('https://cookyzz.azurewebsites.net/api/Packages/');
        const packageData = await packageResponse.json();
        setPackages(packageData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const calculateTotalPrice = (recipeId) => {
    const relatedPackages = packages.filter((packageItem) => packageItem.recipeId === recipeId);
    const totalPrice = relatedPackages.reduce((sum, packageItem) => sum + packageItem.price, 0);
    return totalPrice;
  };

  const calculateTotalSales = (recipeId) => {
    const relatedPackages = packages.filter((packageItem) => packageItem.recipeId === recipeId);
    const totalSales = relatedPackages.reduce((sum, packageItem) => sum + packageItem.sales, 0);
    return totalSales;
  };
  const isMobile = useMediaQuery('(max-width: 601px)');

  if (!recipe || !packages) {
    return <div>Không có PACK phù hợp</div>;
  }

  let priceSale = 0;
  if (calculateTotalSales(recipe.id) > 0) {
    priceSale = calculateTotalPrice(recipe.id) - calculateTotalSales(recipe.id);
  } else {
    priceSale = calculateTotalPrice(recipe.id);
  }

  return (
    <>
      {isMobile ? (
        <Container style={{ paddingBottom: '70px' }}>
          <ImageSlider style={{ width: '415px', height: '415px' }} />
          <>
            <Typography variant="h6" style={{ marginTop: '110px', marginBottom: '10px' }}>
              {recipe.title}
            </Typography>
            <Rating name="read-only" value="5" readOnly />
            <Typography variant="h6" style={{ marginTop: '10px', marginBottom: '10px' }}>
              {priceSale == calculateTotalPrice(recipe.id) ? (
                <span>{calculateTotalPrice(recipe.id).toLocaleString('vi-VN')}₫</span>
              ) : (
                <Box component="span">
                  {priceSale.toLocaleString('vi-VN')}₫{' '}
                  <span style={{ textDecoration: 'line-through', color: 'var(--sale-color)' }}>
                    {calculateTotalPrice(recipe.id).toLocaleString('vi-VN')}₫
                  </span>
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
            <IconButton onClick={(event) => handleQuantityChange(event, -1)}>
              <Remove sx={{ fontSize: 10 }} />
            </IconButton>
            <TextField
              name="quantity"
              value={quantity}
              style={{ width: '40px', height: '10px' }}
              onChange={(event) => {
                handleQuantityChange(event.target.value, 0);
              }}
              inputProps={{
                min: 1,
                max: 10,
              }}
            />
            <IconButton onClick={(event) => handleQuantityChange(event, 1)}>
              <Add sx={{ fontSize: 10 }} />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)', marginTop: '20px' }}
              component={Link}
              to="/shoping-cart"
            >
              Thêm vào giỏ
            </Button>
            <Link to="/" style={{ marginTop: '20px' }}>
              <FavoriteBorderRounded style={{ color: 'var(--primary-color)' }} sx={{ fontSize: 30 }} />
            </Link>
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
          </>
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Home" icon={<Restore />} component={Link} to="/" />
              <BottomNavigationAction label="Favorites" icon={<Favorite />} />
              <BottomNavigationAction label="Archive" icon={<Archive />} />
            </BottomNavigation>
          </Paper>
        </Container>
      ) : (
        <Navigate to={`/shop-detail/${id}`} replace={true} />
      )}
    </>
  );
}
