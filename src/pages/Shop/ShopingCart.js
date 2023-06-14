import React, { useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Container,
  useMediaQuery,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Breadcrumbs,
  TextField,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 2, image: '/img/cart/cart-1.jpg' },
    { id: 2, name: 'Product 2', price: 15, quantity: 3, image: '/img/cart/cart-2.jpg' },
    { id: 3, name: 'Product 3', price: 20, quantity: 1, image: '/img/cart/cart-3.jpg' },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);

  const handleQuantityChange = (itemId, amount) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + amount,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const handleDelete = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleApplyCoupon = () => {
    // Placeholder logic to check and apply coupon code
    if (couponCode === 'SAVE20') {
      setCouponAmount(20); // Assuming a fixed discount of $20
    } else {
      setCouponAmount(0);
    }
  };

  const isMobile = useMediaQuery('(max-width: 601px)');

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal - couponAmount;

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      {isMobile ? (
        <div>
          {cartItems.map((item) => (
            <Card key={item.id} style={{ marginBottom: '10px' }}>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                  </div>
                  <div style={{ marginLeft: '5px' }}>
                    <div>
                      Quantity:
                      <IconButton onClick={() => handleQuantityChange(item.id, -1)}>-</IconButton>
                      {item.quantity}
                      <IconButton onClick={() => handleQuantityChange(item.id, 1)}>+</IconButton>
                    </div>
                    <div>Total: ${item.price * item.quantity}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: '1' }}>
                    <div>{item.name}</div>
                    <div>Price: ${item.price}</div>
                  </div>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
            >
              Continue Shopping
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              label="Enter your coupon code"
              variant="outlined"
              size="small"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleApplyCoupon}
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
            >
              APPLY COUPON
            </Button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div>Subtotal: ${subtotal}</div>
            <div>Coupon: ${couponAmount}</div>
            <div>Total: ${total}</div>
            <Button
              variant="contained"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
            >
              PROCEED TO CHECKOUT
            </Button>
          </div>
        </div>
      ) : (
        <>
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
                  Shopping Cart
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
                  <Typography style={{ color: 'var(--white-color)' }} variant="body1">
                    Shopping Cart
                  </Typography>
                </Breadcrumbs>
              </Box>
            </Container>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Products</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                        <span style={{ marginLeft: '10px' }}>{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleQuantityChange(item.id, -1)}>-</IconButton>
                      {item.quantity}
                      <IconButton onClick={() => handleQuantityChange(item.id, 1)}>+</IconButton>
                    </TableCell>
                    <TableCell>${item.price * item.quantity}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
              >
                Continue Shopping
              </Button>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Enter your coupon code"
                  variant="outlined"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <Button
                  variant="contained"
                  onClick={handleApplyCoupon}
                  style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
                >
                  APPLY COUPON
                </Button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <div>
                <div>Subtotal: ${subtotal}</div>
                <div>Coupon: ${couponAmount}</div>
                <div>Total: ${total}</div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </div>
            </div>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
