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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 1, image: '/img/cart/cart-1.jpg' },
    { id: 2, name: 'Product 2', price: 15, quantity: 1, image: '/img/cart/cart-2.jpg' },
    { id: 3, name: 'Product 3', price: 20, quantity: 1, image: '/img/cart/cart-3.jpg' },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleQuantityChange = (itemId, value) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, Math.min(value, 10));
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const handleDelete = (itemId) => {
    const itemToDelete = cartItems.find((item) => item.id === itemId);
    setDeleteConfirmation(itemToDelete);
  };

  const handleConfirmDelete = () => {
    const updatedCartItems = cartItems.filter((item) => item.id !== deleteConfirmation.id);
    setCartItems(updatedCartItems);
    setDeleteConfirmation(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
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
    <>
      {isMobile ? (
        <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '55px' }}>
          {/* Bắt đầu breadcrumb Mobile*/}
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
                <Typography variant="h4" style={{ color: 'var(--white-color)' }}>
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
          {/* Kết thúc breadcrumb Mobile*/}

          {cartItems.map((item) => (
            <Card key={item.id} style={{ marginBottom: '10px' }}>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <img src={item.image} alt={item.name} style={{ width: '86px', height: '86px' }} />
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <Typography variant="h6" component="h6">
                      <div>{item.name}</div>
                    </Typography>
                    <div>
                      <Typography variant="subtitle1" component="subtitle1">
                        Price:{' '}
                      </Typography>
                      ${item.price}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                  <div style={{ flex: '1' }}>
                    <div>
                      <Typography variant="subtitle1" component="subtitle1">
                        Quantity:
                      </Typography>
                      <IconButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                        <Remove sx={{ fontSize: 10 }} />
                      </IconButton>
                      <TextField
                        name="quantity"
                        value={item.quantity}
                        size="small"
                        InputProps={{
                          style: { height: '30px' }, // Thay đổi chiều cao của ô nhập
                        }}
                        style={{ width: '47px' }}
                        onChange={(event) => {
                          handleQuantityChange(item.id, event.target.value);
                        }}
                      ></TextField>
                      <IconButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                        <Add sx={{ fontSize: 10 }} />
                      </IconButton>
                    </div>
                    <div>
                      <Typography variant="subtitle1" component="subtitle1">
                        Total:{' '}
                      </Typography>
                      ${item.price * item.quantity}
                    </div>
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
        </Container>
      ) : (
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
          {/* Kết thúc breadcrumb Tablet pc*/}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5" component="h5">
                      Products
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" component="h5">
                      Price
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" component="h5">
                      Quantity
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" component="h5">
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                        <span style={{ marginLeft: '20px' }}>
                          <Typography variant="h6" component="h6">
                            {item.name}
                          </Typography>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" component="subtitle1">
                        ${item.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                        <Remove sx={{ fontSize: 15 }} />
                      </IconButton>
                      <TextField
                        name="quantity"
                        value={item.quantity}
                        InputProps={{
                          style: { height: '30px' }, // Thay đổi chiều cao của ô nhập
                        }}
                        style={{ width: '45px' }}
                        onChange={(event) => {
                          handleQuantityChange(item.id, event.target.value);
                        }}
                      ></TextField>
                      <IconButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                        <Add sx={{ fontSize: 15 }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" component="subtitle1">
                        ${item.price * item.quantity}
                      </Typography>
                    </TableCell>
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
        </Container>
      )}
      {deleteConfirmation && (
        <Dialog open={true} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the item "{deleteConfirmation.name}" from your cart?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
