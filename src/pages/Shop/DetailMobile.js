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
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Paper,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function DetailMobile() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event, value) => {
    const updatedQuantity = quantity + value;
    // Giới hạn giá trị từ 1 đến 10
    const limitedQuantity = Math.max(0, Math.min(updatedQuantity, 10));
    setQuantity(limitedQuantity);
  };

  const isMobile = useMediaQuery('(max-width: 601px)');

  const [value, setValue] = React.useState(0);

  return (
    <>
      {isMobile ? (
        <Container style={{ paddingBottom: '70px' }}>
          <img src="./img/product/details/product-details-2.jpg" />
          <div className="product__details__text">
            <b>
              <Typography variant="h6" style={{ marginTop: '20px', marginBottom: '10px' }}>
                Vetgetable’s Package
              </Typography>
              <Rating name="read-only" value="5" readOnly />
              <Typography variant="h6" style={{ marginTop: '10px', marginBottom: '10px' }}>
                $50.00
              </Typography>
            </b>
            <Typography style={{ marginBottom: '10px' }}>
              Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula
              elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum
              sed sit amet dui. Proin eget tortor risus.
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
              Add to cart
            </Button>
            <Link to="/" style={{ marginTop: '20px' }}>
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
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Recents" icon={<Restore />} />
              <BottomNavigationAction label="Favorites" icon={<Favorite />} />
              <BottomNavigationAction label="Archive" icon={<Archive />} />
            </BottomNavigation>
          </Paper>
        </Container>
      ) : (
        <Navigate to="/shop-detail" replace={true} />
      )}
    </>
  );
}
