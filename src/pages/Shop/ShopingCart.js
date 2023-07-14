import React, { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
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
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleQuantityChange = (itemId, value) => {
    const updatedPackages = packages.map((item) => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, Math.min(value, 1000));
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setPackages(updatedPackages);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch data from orders.json or API endpoint
        const response = await fetch('https://cookyzz.azurewebsites.net/api/Orders/1');
        const data = await response.json();
        setCartItems(data.items);

        const recipeResponse = await fetch('https://cookyzz.azurewebsites.net/api/Recipes');
        const recipeData = await recipeResponse.json();
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleConfirmDelete = async () => {
    const response = await fetch(`https://cookyzz.azurewebsites.net/api/OrderItems/${deleteItemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting item');
    }

    setCartItems(cartItems.filter((item) => item.id !== deleteItemId));
    setDeleteItemId(null);
  };

  const handleAdd = async (item) => {
    const response = await fetch('https://cookyzz.azurewebsites.net/api/Orders/addCart/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: item.id,
        orderId: 1,
        packageId: item.package.id,
        quantity: item.quantity + 1,
        price: (item.quantity + 1) * (item.package.price - item.package.sales),
      }),
    });

    if (!response.ok) {
      throw new Error('Error adding item');
    }

    // Cập nhật state sau khi thêm thành công
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      ),
    );
  };

  const handleRemove = async (item) => {
    const response = await fetch('https://cookyzz.azurewebsites.net/api/Orders/addCart/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: 1,
        packageId: item.package.id,
        quantity: item.quantity - 1,
        price: (item.quantity - 1) * (item.package.price - item.package.sales),
      }),
    });

    if (!response.ok) {
      throw new Error('Error removing item');
    }

    // Cập nhật state sau khi trừ thành công
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
      ),
    );
  };

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
  };

  const calculateTotalPrice = (quantity, price, sales) => {
    return (quantity * price - sales).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const isMobile = useMediaQuery('(max-width: 601px)');

  // Tính tổng tiền hàng

  const totalPrice = cartItems.reduce((total, item) => total + item.package.price * item.quantity, 0);
  const totalSales = cartItems.reduce((total, item) => total + item.package.sales * item.quantity, 0);
  const totalPayment = totalPrice - totalSales;

  return (
    <>
      {isMobile ? (
        <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '55px' }}>
          Mobile
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
                  Giỏ hàng
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
                  <Typography style={{ color: 'var(--white-color)' }} variant="body1">
                    Giỏ hàng
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
                  <TableCell style={{ alignContent: 'center' }}>
                    <Typography variant="h5" component="h5">
                      Sản Phẩm
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" component="h5">
                      Đơn Giá
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" component="h5">
                      Số Lượng
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" component="h5">
                      Số Tiền
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              {cartItems.map((item) => {
                const recipe = recipes.find((recipe) => recipe.id === item.package.recipeId);
                if (!item || !recipe) {
                  return null;
                }

                let priceSale = 0;

                if (item.package.sales > 0) {
                  priceSale = item.package.price - item.package.sales;
                } else {
                  priceSale = item.package.price;
                }

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={recipe.image.split('\n')[0]}
                          alt={recipe.title}
                          style={{ width: '100px', height: '100px' }}
                        />
                        <span style={{ marginLeft: '20px' }}>
                          <Typography variant="h6" component="h6">
                            {item.package.title}
                          </Typography>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" component="subtitle1">
                        {priceSale == item.package.price ? (
                          <span>{item.package.price.toLocaleString('vi-VN')}₫</span>
                        ) : (
                          <Box component="span">
                            <span style={{ textDecoration: 'line-through', color: 'var(--sale-color)' }}>
                              {item.package.price.toLocaleString('vi-VN')}₫
                            </span>{' '}
                            {priceSale.toLocaleString('vi-VN')}₫
                          </Box>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRemove(item)}>
                        <Remove sx={{ fontSize: 15 }} />
                      </IconButton>
                      <TextField
                        name="quantity"
                        value={item.quantity}
                        InputProps={{
                          inputMode: 'numeric',
                          style: { height: '30px' }, // Thay đổi chiều cao của ô nhập
                        }}
                        style={{
                          width: item.quantity < 10 ? '36px' : item.quantity < 100 ? '46px' : '56px',
                        }} // Thay đổi kích thước dựa trên độ dài số
                        onChange={(event) => {
                          handleQuantityChange(item.id, event.target.value);
                        }}
                      />
                      <IconButton onClick={() => handleAdd(item)}>
                        <Add sx={{ fontSize: 15 }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" component="subtitle1">
                        {calculateTotalPrice(item.quantity, item.package.price, item.package.sales)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '7px',
                }}
                component={Link}
                to="/"
              >
                Tiếp tục mua sắm
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <div>
                <Typography variant="h6">Tổng tiền hàng: {totalPrice.toLocaleString('vi-VN')}₫</Typography>
                <Typography variant="h6">Khuyến mãi: {totalSales.toLocaleString('vi-VN')}₫</Typography>
                <Typography variant="h6">Tổng tiền thanh toán: {totalPayment.toLocaleString('vi-VN')}₫</Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--white-color)',
                    borderRadius: '7px',
                  }}
                  component={Link}
                  to="/checkout"
                >
                  Đặt hàng
                </Button>
              </div>
            </div>
          </TableContainer>
        </Container>
      )}

      {deleteItemId && (
        <Dialog open={true} onClose={handleCancelDelete}>
          <DialogTitle>Xóa sản phẩm</DialogTitle>
          <DialogContent>
            <Typography>Bạn có chắc chắn muốn xóa sản phẩm này không?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Hủy</Button>
            <Button onClick={handleConfirmDelete} color="error">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
