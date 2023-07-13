import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

export default function AddressForm() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [useShippingAddress, setUseShippingAddress] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://cookyzz.azurewebsites.net/api/Users/14');
        const data = await response.json();
        setUser(data);
        setName(data.name);
        setAddress(data.address);
        setPhone(data.phone);
        setEmail(data.email);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Thực hiện xử lý lưu thông tin giao hàng tại đây
    // Ví dụ: gửi thông tin lên API hoặc lưu vào trạng thái của ứng dụng
  };

  return (
    <form onSubmit={handleFormSubmit}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <Checkbox checked={useShippingAddress} onChange={(e) => setUseShippingAddress(e.target.checked)} />
          <label>Sử dụng địa chỉ này cho thông tin thanh toán của bạn</label>
          <Button type="submit" sx={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--white-color)',
                    borderRadius: '7px',
                  }}> Lưu</Button>
        </Grid>
      </Grid>
    </form>
  );
}
