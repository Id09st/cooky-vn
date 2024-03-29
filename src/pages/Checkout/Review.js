import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review() {
  const [recipes, setRecipes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);

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
          const orderResponse = await fetch(`https://cookyzz.azurewebsites.net/api/Orders/${onCartOrder.id}`);
          const dataOrder = await orderResponse.json();
          setOrder(dataOrder);
          setCartItems(dataOrder.items);
        }

        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipeResponse = await fetch('https://cookyzz.azurewebsites.net/api/Recipes');
        const recipeData = await recipeResponse.json();
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching Recipes', error);
      }
    };

    fetchRecipes();
  }, []);

  // // Chuyển đổi orderDate từ string sang đối tượng Date
  // const orderDate = order ? new Date(order.orderDate) : null;

  // // Định dạng thời gian
  // const formattedOrderDate = orderDate
  //   ? `${orderDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} ${orderDate
  //       .toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
  //       .split(',')
  //       .join('/')}`
  //   : '';

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 3);
  const expectedDeliveryDate = currentDate.toLocaleDateString();

  const totalPrice = cartItems.reduce((total, item) => total + item.package.price * item.quantity, 0);
  const totalSales = cartItems.reduce((total, item) => total + item.package.sales * item.quantity, 0);
  const totalPayment = totalPrice - totalSales;

  return (
    <>
      {order && (
        <>
          <Typography variant="h6" gutterBottom>
            Đơn hàng #{order.id}
          </Typography>

          <List disablePadding>
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
                <ListItem key={item.package.title} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={item.package.title} />

                  <Typography variant="body2">
                    {(item.package.price - item.package.sales).toLocaleString('vi-VN')} ₫ x
                  </Typography>

                  <Typography variant="body2">{item.quantity}</Typography>
                </ListItem>
              );
            })}

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Khuyến mãi" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                -{totalSales.toLocaleString('vi-VN')}₫
              </Typography>
            </ListItem>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Tổng cộng" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {totalPayment.toLocaleString('vi-VN')}₫
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Thông tin vận chuyển
              </Typography>
              {user && (
                <>
                  <Typography gutterBottom>Người nhận: {user.name}</Typography>
                  <Typography gutterBottom>Địa chỉ: {user.address}</Typography>
                </>
              )}
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Hình thức thanh toán
                <b style={{ color: 'red', fontSize: 17 }}>({order.paymentMethod})</b>
              </Typography>
              <Grid container>
                <div key={order.name}>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Dự kiến nhận hàng: {expectedDeliveryDate}</Typography>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
