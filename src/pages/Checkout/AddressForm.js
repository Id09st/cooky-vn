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
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://cookyzz.azurewebsites.net/api/Users/14', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 14,
          username: 'thiit',
          password: '123',
          name: name,
          email: email,
          phone: phone,
          address: address,
        }),
      });

      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      if (response.headers.get('content-type') && response.headers.get('content-type').includes('application/json')) {
        const data = await response.json();
        console.log(data); // Log the response data to the console
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      const data = await response.json();
      console.log(data); // Log the response data to the console

      alert('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Error:', error);
    }
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
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            sx={{
              backgroundColor: 'var(--primary-color)',
              color: 'var(--white-color)',
              borderRadius: '7px',
            }}
          >
            {' '}
            Lưu
          </Button>
        </Grid>
      </Grid>
      {showSuccess && <div>Lưu thành công</div>}
    </form>
  );
}
