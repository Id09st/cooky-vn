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
  const [couponCode, setCouponCode] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [packages, setPackages] = useState([]);

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

  const calculateTotalPrice = (recipeId) => {
    const relatedPackages = packages.filter((packages) => packages.recipeId === recipeId);
    const totalPrice = relatedPackages.reduce((sum, packages) => sum + packages.price, 0);
    return totalPrice;
  };

  const calculateTotalSales = (recipeId) => {
    const relatedPackages = packages.filter((packages) => packages.recipeId === recipeId);
    const totalSales = relatedPackages.reduce((sum, packages) => sum + packages.sales, 0);
    return totalSales;
  };

  const handleDelete = (itemId) => {
    const itemToDelete = packages.find((item) => item.id === itemId);
    setDeleteConfirmation(itemToDelete);
  };

  const handleConfirmDelete = () => {
    const updatedPackages = packages.filter((item) => item.id !== deleteConfirmation.id);
    setPackages(updatedPackages);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packageResponse = await fetch('http://cookyz.somee.com/api/packages/');
        const packageData = await packageResponse.json();
        setPackages(packageData);

        const recipeResponse = await fetch('http://cookyz.somee.com/api/recipes/');
        const recipeData = await recipeResponse.json();
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const isMobile = useMediaQuery('(max-width: 601px)');

  const subtotal = packages.reduce((total, packages) => total + calculateTotalPrice(recipes.id) * packages.quantity, 0);
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
                    <Typography style={{ color: 'var(--white-color)' }}>Home</Typography>
                  </Link>
                  <Typography style={{ color: 'var(--white-color)' }} variant="body1">
                    Giỏ hàng
                  </Typography>
                </Breadcrumbs>
              </Box>
            </Container>
          </Box>
          {/* Kết thúc breadcrumb Mobile*/}
          {recipes.map((recipe) => {
            if (!recipe) {
              return null; // Bỏ qua gói hàng nếu không tìm thấy thông tin recipe
            }

            let priceSale = 0;

            if (calculateTotalSales(recipe.id) > 0) {
              priceSale = calculateTotalPrice(recipe.id) - calculateTotalSales(recipe.id);
            } else {
              priceSale = calculateTotalPrice(recipe.id);
            }

            const totalPrice = priceSale * packages.quantity;
            return (
              <Card key={recipe.id} style={{ marginBottom: '10px' }}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <img src={recipe.image} alt={recipe.title} style={{ width: '86px', height: '86px' }} />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                      <Typography variant="h6" component="h6">
                        <div>{recipe.title}</div>
                      </Typography>
                      <div>
                        <Typography variant="subtitle1" component="subtitle1">
                          {priceSale == calculateTotalPrice(recipe.id) ? (
                            <span>{calculateTotalPrice(recipe.id).toLocaleString('vi-VN')}₫</span>
                          ) : (
                            <Box component="span">
                              <span style={{ textDecoration: 'line-through', color: 'var(--sale-color)' }}>
                                {calculateTotalPrice(recipe.id).toLocaleString('vi-VN')}₫
                              </span>{' '}
                              {priceSale.toLocaleString('vi-VN')}₫
                            </Box>
                          )}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                    <div style={{ flex: '1' }}>
                      <div>
                        <Typography variant="subtitle1" component="subtitle1">
                          Số lượng:
                        </Typography>
                        <IconButton onClick={() => handleQuantityChange(packages.id, packages.quantity - 1)}>
                          <Remove sx={{ fontSize: 10 }} />
                        </IconButton>
                        <TextField
                          name="quantity"
                          value={packages.quantity}
                          InputProps={{
                            inputMode: 'numeric',
                            style: { height: '30px' }, // Thay đổi chiều cao của ô nhập
                          }}
                          style={{
                            width: packages.quantity < 10 ? '36px' : packages.quantity < 100 ? '46px' : '56px',
                          }} // Thay đổi kích thước dựa trên độ dài số
                          onChange={(event) => {
                            handleQuantityChange(packages.id, event.target.value);
                          }}
                        />
                        <IconButton onClick={() => handleQuantityChange(packages.id, packages.quantity + 1)}>
                          <Add sx={{ fontSize: 10 }} />
                        </IconButton>
                      </div>
                      <div>
                        <Typography variant="subtitle1" component="subtitle1">
                          Tổng cộng:{' '}
                        </Typography>
                        {totalPrice.toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                    <IconButton onClick={() => handleDelete(recipe.id)}>
                      <Delete />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
              component={Link}
              to="/"
            >
              Tiếp tục mua sắm
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              label="Nhập mã giảm giá"
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
              Áp dụng mã giảm giá
            </Button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div>Tổng tiền hàng: {subtotal.toLocaleString('vi-VN')}₫</div>
            <div>Voucher: {couponAmount.toLocaleString('vi-VN')}₫</div>
            <div>Tổng thanh toán: {total.toLocaleString('vi-VN')}₫</div>

            <Button
              variant="contained"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
              component={Link}
              to="/checkout"
            >
              Đặt hàng
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

              {recipes.map((recipe) => {
                if (!recipe) {
                  return null; // Bỏ qua gói hàng nếu không tìm thấy thông tin recipe
                }

                let priceSale = 0;

                if (calculateTotalSales(recipe.id) > 0) {
                  priceSale = calculateTotalPrice(recipe.id) - calculateTotalSales(recipe.id);
                } else {
                  priceSale = calculateTotalPrice(recipe.id);
                }

                const totalPrice = priceSale * packages.quantity;

                return (
                  <TableRow key={recipe.id}>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={recipe.image.split('\n')[0]}
                          alt={recipe.title}
                          style={{ width: '100px', height: '100px' }}
                        />
                        <span style={{ marginLeft: '20px' }}>
                          <Typography variant="h6" component="h6">
                            {recipe.title}
                          </Typography>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" component="subtitle1">
                        {priceSale == calculateTotalPrice(recipe.id) ? (
                          <span>{calculateTotalPrice(recipe.id).toLocaleString('vi-VN')}₫</span>
                        ) : (
                          <Box component="span">
                            <span style={{ textDecoration: 'line-through', color: 'var(--sale-color)' }}>
                              {calculateTotalPrice(recipe.id).toLocaleString('vi-VN')}₫
                            </span>{' '}
                            {priceSale.toLocaleString('vi-VN')}₫
                          </Box>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleQuantityChange(packages.id, packages.quantity - 1)}>
                        <Remove sx={{ fontSize: 15 }} />
                      </IconButton>
                      <TextField
                        name="quantity"
                        value={packages.quantity}
                        InputProps={{
                          inputMode: 'numeric',
                          style: { height: '30px' }, // Thay đổi chiều cao của ô nhập
                        }}
                        style={{
                          width: packages.quantity < 10 ? '36px' : packages.quantity < 100 ? '46px' : '56px',
                        }} // Thay đổi kích thước dựa trên độ dài số
                        onChange={(event) => {
                          handleQuantityChange(packages.id, event.target.value);
                        }}
                      />
                      <IconButton onClick={() => handleQuantityChange(packages.id, packages.quantity + 1)}>
                        <Add sx={{ fontSize: 15 }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" component="subtitle1">
                        {totalPrice.toLocaleString('vi-VN')}₫
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(packages.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
                component={Link}
                to="/"
              >
                Tiếp tục mua sắm
              </Button>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Nhập mã giảm giá"
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
                  Áp dụng mã giảm giá
                </Button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <div>
                <div>Tổng tiền hàng: {subtotal.toLocaleString('vi-VN')}₫</div>
                <div>Voucher: {couponAmount.toLocaleString('vi-VN')}₫</div>
                <div>Tổng thanh toán: {total.toLocaleString('vi-VN')}₫</div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
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
      {deleteConfirmation && (
        <Dialog open={true} onClose={handleCancelDelete}>
          <DialogTitle>Xóa sản phẩm</DialogTitle>
          <DialogContent>
            <Typography>Bạn muốn xóa sản phẩm "{deleteConfirmation.name}" khỏi giỏ hàng?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Thoát</Button>
            <Button onClick={handleConfirmDelete} color="error">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
