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
} from '@mui/material';

export default function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://cookyzz.azurewebsites.net/api/Orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };

    const fetchOrderItems = async () => {
      try {
        const response = await fetch('https://cookyzz.azurewebsites.net/api/OrderItems');
        const data = await response.json();
        setOrderItems(data);
      } catch (error) {
        console.log('Error fetching order items:', error);
      }
    };

    fetchOrders();
    fetchOrderItems();
  }, []);

  return (
    <Container style={{ paddingTop: '90px' }}>
      <Box sx={{ width: '100%' }}>
        {orders.map((order) => (
          <Card key={order.id} sx={{ my: 2, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div">
                  Order ID: {order.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">User ID: {order.userId}</Typography>
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
                <Typography variant="body1">Trạng thái đơn hàng: {order.status}</Typography>
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
                        <TableCell>Package ID</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderItems
                        .filter((item) => item.orderId === order.id)
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                              {item.packageId}
                            </TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{item.price}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
