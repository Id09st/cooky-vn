import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Thông tin giao hàng
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Họ và Tên"
            fullWidth
            autoComplete="name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Địa chỉ giao hàng"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Số điện thoại"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Sử dụng địa chỉ này cho thông tin thanh toán của bạn"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
