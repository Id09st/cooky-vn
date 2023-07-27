import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  Avatar,
  Container,
  Tab,
  Tabs,
  Typography,
  Button,
  TextField,
  Table,
  TableCell,
  TableRow,
  Card,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import PropTypes from 'prop-types';
import { CommentBankOutlined, Person, ShoppingBag } from '@mui/icons-material';

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function User() {
  const [value, setValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const nameFromStorage = localStorage.getItem('name');

      const response = await fetch('https://cookyzz.azurewebsites.net/api/Users/');
      const users = await response.json();
      const user = users.find((user) => user.username === nameFromStorage);
      const userResponse = await fetch(`https://cookyzz.azurewebsites.net/api/Users/${user.id}`);
      const data = await userResponse.json();

      if (user) {
        setId(user.id);
        setUserName(user.username);
        setPassWord(user.password);
        setName(user.name);
        setAddress(user.address);
        setPhone(user.phone);
        setEmail(user.email);
      }
      for (let i = 0; i < data.orders.length; i++) {
        if (
          data.orders[i].status === 'Pending' ||
          data.orders[i].status === 'Completed' ||
          data.orders[i].status === 'Canceled'
        ) {
          console.log(data.orders[i]);
          setOrders((prevOrders) => [...prevOrders, data.orders[i]]);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    try {
      const response = await fetch(`https://cookyzz.azurewebsites.net/api/Users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          username: userName,
          password: passWord,
          name: name,
          email: email,
          phone: phone,
          address: address,
          role: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      if (response.headers.get('content-type') && response.headers.get('content-type').includes('application/json')) {
        const data = await response.json();
        console.log(data); // Log the response data to the console
      }

      const data = await response.json();
      console.log(data); // Log the response data to the console

      alert('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      setOrders([]);
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
    <>
      <Container style={{ marginTop: '110px', marginBottom: '30px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={5}>
              <Item>
                <Box display="flex" justifyContent="center">
                  <Avatar sx={{ width: '180px', height: '180px' }}></Avatar>
                </Box>
                <Typography style={{ marginTop: '20px' }} variant="h4">
                  {name}
                </Typography>

                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  orientation="vertical"
                  style={{ marginTop: '10px' }}
                >
                  <Tab
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person style={{ marginRight: '10px' }} />
                        Tài khoản của tôi
                      </Box>
                    }
                    {...a11yProps(0)}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      borderBottom: '1px solid var(--para-color)',
                    }}
                  />

                  <Tab
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShoppingBag style={{ marginRight: '10px' }} />
                        Thông tin đơn hàng
                      </Box>
                    }
                    {...a11yProps(1)}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      borderBottom: '1px solid var(--para-color)',
                    }}
                  />

                  <Tab
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CommentBankOutlined style={{ marginRight: '10px' }} />
                        Đánh giá đơn hàng
                      </Box>
                    }
                    {...a11yProps(2)}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  />
                </Tabs>
              </Item>
            </Grid>
            <Grid item xs={11}>
              <Item>
                <CustomTabPanel value={value} index={0}>
                  <Typography variant="h4">Tài Khoản Của Tôi</Typography>
                  <Grid container spacing={1} direction="column" justifyContent="space-between">
                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Tài khoản đăng nhập"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        value={userName}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Họ và Tên"
                        name="name"
                        autoComplete="name"
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        value={name}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Địa chỉ email"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        value={email}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Số điện thoại"
                        name="phone"
                        autoComplete="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        autoFocus
                        value={phone}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Địa chỉ"
                        name="address"
                        autoComplete="address"
                        onChange={(e) => setAddress(e.target.value)}
                        autoFocus
                        value={address}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {isEditing ? (
                        <Button onClick={handleSave}>Lưu</Button>
                      ) : (
                        <Button onClick={handleEdit}>Chỉnh sửa</Button>
                      )}
                    </Grid>
                  </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <Typography variant="h4">Thông tin đơn hàng</Typography>
                  {[...orders].reverse().map((order) => (
                    <Card key={order.id} sx={{ my: 2, p: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="h6" gutterBottom component="div" style={{ marginRight: '100px' }}>
                            Mã đơn hàng: #{order.id}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            component="div"
                            align="right"
                            style={{ marginRight: '40px' }}
                          >
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
                        </Grid>
                        <Grid item xs={12}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            {orderItems
                              .filter((item) => item.orderId === order.id)
                              .map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    <Grid container>
                                      <Grid item xs={2}>
                                        <img
                                          src={item.recipe.image.split('\n')[0]}
                                          alt={item.recipe.title}
                                          style={{ width: '100px', height: '100px' }}
                                        />
                                      </Grid>
                                      <Grid item xs={10}>
                                        <Grid
                                          container
                                          direction="column"
                                          alignItems="flex-start"
                                          style={{ marginLeft: '10px' }}
                                        >
                                          <Grid item>
                                            <Typography variant="h6" component="h6">
                                              {item.recipe.title}
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            <Box mt={1}>
                                              <Typography variant="body1">
                                                {(item.price / item.quantity).toLocaleString('vi-VN')}₫ x{item.quantity}
                                              </Typography>
                                            </Box>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </Table>
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
                                        cancelOrder(order, () => setValue(1));
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
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                              align="right"
                              style={{ marginTop: '10px' }}
                            >
                              Thành tiền:{' '}
                              {orderItems
                                .filter((item) => item.orderId === order.id)
                                .reduce((total, item) => total + item.price, 0)
                                .toLocaleString('vi-VN')}
                              ₫
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  Đánh giá đơn hàng
                </CustomTabPanel>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
