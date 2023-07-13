import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from '../Checkout/AddressForm';
import Review from '../Checkout/Review';
import { Link } from 'react-router-dom';

const steps = ['Thông tin giao hàng', 'Hoàn tất đặt hàng'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [oder, setOder] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const orderResponse = await fetch('https://cookyzz.azurewebsites.net/api/Orders/1');
        const dataOder = await orderResponse.json();
        setOder(dataOder);
        setCartItems(dataOder.items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Tính tổng tiền hàng
  const total = cartItems.reduce((total, item) => total + item.price, 0);

  // Tính tổng khuyến mãi
  const totalSales = cartItems.reduce((total, item) => total + item.package.sales, 0);

  // Tính tổng tiền thanh toán
  const totalPayment = total - totalSales;

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const orderDate = new Date();
      const shipDate = new Date();
      shipDate.setDate(orderDate.getDate() + 3);

      const data = {
        id: 1,
        userId: 23,
        orderDate: orderDate.toISOString(),
        totalPrice: totalPayment,
        status: 'Pending',
        shipDate: shipDate.toISOString(), ////////////
        paymentMethod: 'COD',
      };

      const response = await fetch('https://cookyzz.azurewebsites.net/api/Orders/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4, paddingTop: '50px' }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Giỏ hàng
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Cảm ơn bạn đã đặt hàng.
            </Typography>
            <Typography variant="subtitle1">
              Mã đơn hàng của bạn là #1. Chúng tôi đã gửi email xác nhận đơn hàng của bạn và sẽ thông báo cho bạn khi
              đơn hàng của bạn được gửi đi.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Button
              component={Link}
              to="/order"
                sx={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '7px',
                }}
              >
                Tình trạng đơn hàng
              </Button>
            </Box>
          </>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Quay lại
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  mt: 3,
                  ml: 1,
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '7px',
                }}
              >
                {activeStep === steps.length - 1 ? 'Xác nhận đặt hàng' : 'Tiếp tục'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Container>
  );
}
