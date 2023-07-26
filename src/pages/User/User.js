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
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
} from '@mui/material';
import PropTypes from 'prop-types';
import { AccountBalanceOutlined, CommentBankOutlined, Person, ShoppingBag } from '@mui/icons-material';

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

const getStatusColor = (status) => {
  switch (status) {
    case 'On-cart':
      return 'grey';
    case 'Complete':
      return 'green';
    case 'Pending':
      return 'orange';
    default:
      return 'black';
  }
};

export default function User() {
  const [value, setValue] = React.useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Trần Minh Thiện');
  const [name, setName] = useState('Trần Minh Thiện');
  const [email, setEmail] = useState('thien@example.com');
  const [phone, setPhone] = useState('0123456789');
  const [address, setAddress] = useState('Hà Nội, Việt Nam');
  const [id, setId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const nameFromStorage = localStorage.getItem('name');

        const response = await fetch('https://cookyzz.azurewebsites.net/api/Users/');
        const users = await response.json();
        const user = users.find((user) => user.username === nameFromStorage);
        const userResponse = await fetch(`https://cookyzz.azurewebsites.net/api/Users/${user.id}`);
        const data = await userResponse.json();

        for (let i = 0; i < data.orders.length; i++) {
          if (data.orders[i].status === 'Pending') {
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

    fetchUser();
  }, []);

  useEffect(() => {
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

    fetchOrderItems();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Cập nhật thông tin tại đây
  };

  return (
    <>
      <Container style={{ marginTop: '110px', marginBottom: '30px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={5}>
              <Item>
                <Box display="flex" justifyContent="center">
                  <Avatar sx={{ width: '180px', height: '180px' }}>H</Avatar>
                </Box>
                <Typography style={{ marginTop: '20px' }} variant="h4">
                  Trần Minh Thiện
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
                        label="UserName"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        value={userName}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
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
                        label="Email"
                        name="email"
                        autoComplete="email"
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
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
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
                        label="Address"
                        name="address"
                        autoComplete="address"
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
                  {orders.map((order) => (
                    <Card key={order.id} sx={{ my: 2, p: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="h6" gutterBottom component="div" style={{ marginRight: '100px' }}>
                            Order ID: {order.id}
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
                            Tình trạng:&nbsp;
                            <span style={{ color: getStatusColor(order.status) }}>{order.status}</span>
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
                                      <Grid item xs={3}>
                                        <img
                                          src={item.recipe.image.split('\n')[0]}
                                          alt={item.recipe.title}
                                          style={{ width: '100px', height: '100px' }}
                                        />
                                      </Grid>
                                      <Grid item xs={9}>
                                        <Grid container direction="column" alignItems="flex-start">
                                          <Grid item>
                                            <Typography variant="h6" component="h6">
                                              {item.recipe.title}
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            <Box mt={1}>
                                              <Typography variant="body1">Số lượng: {item.quantity}</Typography>
                                            </Box>
                                          </Grid>
                                          <Grid item>
                                            <Box mt={1}>
                                              <Typography variant="body1">
                                                {(item.price / item.quantity).toLocaleString('vi-VN')}₫
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
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                              align="right"
                              style={{ marginTop: '10px' }}
                            >
                              Tổng tiền:
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
