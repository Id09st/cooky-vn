import * as React from 'react';
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
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
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
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Cảm ơn bạn đã đặt hàng.
            </Typography>
            <Typography variant="subtitle1">
              Mã đơn hàng của bạn là #2001539. Chúng tôi đã gửi email xác nhận đơn hàng của bạn và sẽ thông báo cho bạn
              khi đơn hàng của bạn được gửi đi.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Quay lại
                </Button>
              )}

              <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                {activeStep === steps.length - 1 ? 'Xác nhận đặt hàng' : 'Tiếp tục'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Container>
  );
}
