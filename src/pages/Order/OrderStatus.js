import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
  Card,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import PropTypes from 'prop-types';

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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

export default function OrderStatus() {
  const [id, setId] = useState(null);
  const [name, setName] = useState('null');
  const [all, setAll] = useState([]);
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchUser = async () => {
    try {
      const nameFromStorage = localStorage.getItem('name');
      const response = await fetch('https://cookyzz.azurewebsites.net/api/Users/');
      const users = await response.json();
      const user = users.find((user) => user.username === nameFromStorage);
      const userResponse = await fetch(`https://cookyzz.azurewebsites.net/api/Users/${user.id}`);
      const data = await userResponse.json();
      setName(data.name);
      for (let i = 0; i < data.orders.length; i++) {
        if (
          data.orders[i].status === 'Pending' ||
          data.orders[i].status === 'Completed' ||
          data.orders[i].status === 'Canceled'
        ) {
          setAll((prevOrders) => [...prevOrders, data.orders[i]]);
        }
      }

      for (let i = 0; i < data.orders.length; i++) {
        if (data.orders[i].status === 'Pending') {
          setPending((prevOrders) => [...prevOrders, data.orders[i]]);
        } else if (data.orders[i].status === 'Completed') {
          setCompleted((prevOrders) => [...prevOrders, data.orders[i]]);
        } else if (data.orders[i].status === 'Canceled') {
          setCanceled((prevOrders) => [...prevOrders, data.orders[i]]);
        }
      }

      if (user) {
        setId(user.id);
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  const fetchOrderItems = async () => {
    try {
      const response = await fetch('https://cookyzz.azurewebsites.net/api/OrderItems');
      const data = await response.json();

      const packagesResponse = await fetch('https://cookyzz.azurewebsites.net/api/Packages');
      const packagesData = await packagesResponse.json();

      const enrichedData = await Promise.all(
        data.map(async (item) => {
          const pkg = packagesData.find((p) => p.id === item.packageId);
          if (pkg) {
            const recipeResponse = await fetch(`https://cookyzz.azurewebsites.net/api/Recipes/${pkg.recipeId}`);
            const recipeData = await recipeResponse.json();
            return { ...item, recipe: recipeData };
          }
          return item;
        }),
      );

      setOrderItems(enrichedData);
    } catch (error) {
      console.log('Error fetching order items:', error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchOrderItems();
  }, []);

  async function cancelOrder(order, callback) {
    try {
      const response = await fetch(`https://cookyzz.azurewebsites.net/api/Orders/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: order.id,
          userId: order.userId,
          orderDate: order.orderDate,
          totalPrice: order.totalPrice,
          status: 'Canceled',
          shipDate: order.shipDate,
          paymentMethod: order.paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Clear the arrays
      setAll([]);
      setPending([]);
      setCompleted([]);
      setCanceled([]);
      setOrderItems([]);

      // Call the callback function after successfully canceling the order
      callback();

      // Fetch data again after canceling the order
      fetchUser();
      fetchOrderItems();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container style={{ paddingTop: '90px' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Tất cả" {...a11yProps(0)} />
            <Tab label="Đang xử lý" {...a11yProps(1)} />
            <Tab label="Hoàn tất" {...a11yProps(2)} />
            <Tab label="Đã hủy" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <>
            {[...all].reverse().map((order) => (
              <Card key={order.id} sx={{ my: 2, p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom component="div">
                      Mã đơn hàng: #{order.id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Người nhận hàng: {name}</Typography>
                    <Typography variant="body1">
                      <Typography variant="body1">
                        Thời gian đặt hàng:{' '}
                        {new Date(order.orderDate).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}{' '}
                        {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                      </Typography>
                    </Typography>
                    <Typography variant="body1">
                      Tổng thanh toán: {order.totalPrice.toLocaleString('vi-VN')}₫
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      {order.status === 'Pending' ? (
                        <Typography style={{ color: 'var(--primary-color)' }}>Đang xử lý</Typography>
                      ) : order.status === 'Completed' ? (
                        <Typography color="green">Hoàn tất</Typography>
                      ) : order.status === 'Canceled' ? (
                        <Typography color="error">Đã hủy</Typography>
                      ) : (
                        <></>
                      )}
                    </Typography>
                    <Typography variant="body1">
                      Thời gian nhận hàng dự kiến:{' '}
                      {new Date(order.shipDate).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}{' '}
                      {new Date(order.shipDate).toLocaleDateString('vi-VN')}
                    </Typography>
                    <Typography variant="body1">Hình thức thanh toán: {order.paymentMethod}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography variant="h6">Sản phẩm</Typography>
                            </TableCell>
                            {/* <TableCell align="right">Package ID</TableCell> */}
                            <TableCell align="center">
                              <Typography variant="h6">Đơn giá</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="h6">Số lượng</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="h6">Số tiền</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderItems
                            .filter((item) => item.orderId === order.id)
                            .map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                      src={item.recipe.image.split('\n')[0]}
                                      alt={item.recipe.title}
                                      style={{ width: '100px', height: '100px' }}
                                    />
                                    <span style={{ marginLeft: '20px' }}>
                                      <Typography variant="h6" component="h6">
                                        {item.recipe.title}
                                      </Typography>
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  {(item.price / item.quantity).toLocaleString('vi-VN')}₫
                                </TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="center">{item.price.toLocaleString('vi-VN')}₫</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {order.status === 'Pending' ? (
                      <Grid container justifyContent="flex-end">
                        <Grid container justifyContent="flex-end">
                          <Button
                            variant="contained"
                            color="error"
                            style={{
                              marginTop: '10px',
                            }}
                            onClick={handleOpen}
                          >
                            Hủy đơn hàng
                          </Button>

                          <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Bạn có chắc chắn muốn hủy đơn hàng #{order.id} không?</DialogTitle>
                            <DialogActions>
                              <Button onClick={handleClose} color="error">
                                Không
                              </Button>
                              <Button
                                onClick={() => {
                                  cancelOrder(order, () => setValue(3));
                                  handleClose();
                                }}
                                autoFocus
                                color="success"
                              >
                                Có
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Grid>
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Card>
            ))}
          </>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {[...pending].reverse().map((order) => (
            <Card key={order.id} sx={{ my: 2, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom component="div">
                    Mã đơn hàng: #{order.id}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">Người nhận hàng: {name}</Typography>
                  <Typography variant="body1">
                    <Typography variant="body1">
                      Thời gian đặt hàng:{' '}
                      {new Date(order.orderDate).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}{' '}
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Typography>
                  <Typography variant="body1">Tổng thanh toán: {order.totalPrice.toLocaleString('vi-VN')}₫</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{ color: 'var(--primary-color)' }}>
                    Đang xử lý
                  </Typography>
                  <Typography variant="body1">
                    Thời gian nhận hàng dự kiến:{' '}
                    {new Date(order.shipDate).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}{' '}
                    {new Date(order.shipDate).toLocaleDateString('vi-VN')}
                  </Typography>
                  <Typography variant="body1">Hình thức thanh toán: {order.paymentMethod}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6">Sản phẩm</Typography>
                          </TableCell>
                          {/* <TableCell align="right">Package ID</TableCell> */}
                          <TableCell align="center">
                            <Typography variant="h6">Đơn giá</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="h6">Số lượng</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="h6">Số tiền</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderItems
                          .filter((item) => item.orderId === order.id)
                          .map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <img
                                    src={item.recipe.image.split('\n')[0]}
                                    alt={item.recipe.title}
                                    style={{ width: '100px', height: '100px' }}
                                  />
                                  <span style={{ marginLeft: '20px' }}>
                                    <Typography variant="h6" component="h6">
                                      {item.recipe.title}
                                    </Typography>
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                {(item.price / item.quantity).toLocaleString('vi-VN')}₫
                              </TableCell>
                              <TableCell align="center">{item.quantity}</TableCell>
                              <TableCell align="center">{item.price.toLocaleString('vi-VN')}₫</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Grid container justifyContent="flex-end">
                    <Grid container justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="error"
                        style={{
                          marginTop: '10px',
                        }}
                        onClick={handleOpen}
                      >
                        Hủy đơn hàng
                      </Button>

                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Bạn có chắc chắn muốn hủy đơn hàng #{order.id} không?</DialogTitle>
                        <DialogActions>
                          <Button onClick={handleClose} color="error">
                            Không
                          </Button>
                          <Button
                            onClick={() => {
                              cancelOrder(order, () => setValue(3));
                              handleClose();
                            }}
                            autoFocus
                            color="success"
                          >
                            Có
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {[...completed].reverse().map((order) => (
            <Card key={order.id} sx={{ my: 2, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom component="div">
                    Mã đơn hàng: #{order.id}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">Người nhận hàng: {name}</Typography>
                  <Typography variant="body1">
                    <Typography variant="body1">
                      Thời gian đặt hàng:{' '}
                      {new Date(order.orderDate).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}{' '}
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Typography>
                  <Typography variant="body1">Tổng thanh toán: {order.totalPrice.toLocaleString('vi-VN')}₫</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"></Typography>
                  <Typography variant="body1" style={{ color: 'green' }}>
                    Hoàn tất
                  </Typography>
                  <Typography variant="body1">
                    Thời gian nhận hàng dự kiến:{' '}
                    {new Date(order.shipDate).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}{' '}
                    {new Date(order.shipDate).toLocaleDateString('vi-VN')}
                  </Typography>
                  <Typography variant="body1">Hình thức thanh toán: {order.paymentMethod}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6">Sản phẩm</Typography>
                          </TableCell>
                          {/* <TableCell align="right">Package ID</TableCell> */}
                          <TableCell align="center">
                            <Typography variant="h6">Đơn giá</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="h6">Số lượng</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="h6">Số tiền</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderItems
                          .filter((item) => item.orderId === order.id)
                          .map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <img
                                    src={item.recipe.image.split('\n')[0]}
                                    alt={item.recipe.title}
                                    style={{ width: '100px', height: '100px' }}
                                  />
                                  <span style={{ marginLeft: '20px' }}>
                                    <Typography variant="h6" component="h6">
                                      {item.recipe.title}
                                    </Typography>
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                {(item.price / item.quantity).toLocaleString('vi-VN')}₫
                              </TableCell>
                              <TableCell align="center">{item.quantity}</TableCell>
                              <TableCell align="center">{item.price.toLocaleString('vi-VN')}₫</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Card>
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {[...canceled].reverse().map((order) => (
            <Card key={order.id} sx={{ my: 2, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom component="div">
                    Mã đơn hàng: #{order.id}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">Người nhận hàng: {name}</Typography>
                  <Typography variant="body1">
                    <Typography variant="body1">
                      Thời gian đặt hàng:{' '}
                      {new Date(order.orderDate).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}{' '}
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Typography>
                  <Typography variant="body1">Tổng thanh toán: {order.totalPrice.toLocaleString('vi-VN')}₫</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" color="error">
                    Đã hủy
                  </Typography>
                  <Typography variant="body1">
                    Thời gian nhận hàng dự kiến:{' '}
                    {new Date(order.shipDate).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}{' '}
                    {new Date(order.shipDate).toLocaleDateString('vi-VN')}
                  </Typography>
                  <Typography variant="body1">Hình thức thanh toán: {order.paymentMethod}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6">Sản phẩm</Typography>
                          </TableCell>
                          {/* <TableCell align="right">Package ID</TableCell> */}
                          <TableCell align="center">
                            <Typography variant="h6">Đơn giá</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="h6">Số lượng</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="h6">Số tiền</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderItems
                          .filter((item) => item.orderId === order.id)
                          .map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <img
                                    src={item.recipe.image.split('\n')[0]}
                                    alt={item.recipe.title}
                                    style={{ width: '100px', height: '100px' }}
                                  />
                                  <span style={{ marginLeft: '20px' }}>
                                    <Typography variant="h6" component="h6">
                                      {item.recipe.title}
                                    </Typography>
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                {(item.price / item.quantity).toLocaleString('vi-VN')}₫
                              </TableCell>
                              <TableCell align="center">{item.quantity}</TableCell>
                              <TableCell align="center">{item.price.toLocaleString('vi-VN')}₫</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Card>
          ))}
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
