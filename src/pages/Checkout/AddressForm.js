import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

export default function AddressForm() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const nameFromStorage = localStorage.getItem('name');
        const response = await fetch('https://cookyzz.azurewebsites.net/api/Users/');
        const users = await response.json();
        const user = users.find((user) => user.username === nameFromStorage);
        if (user) {
          setUser(user);
          setId(user.id);
          setUsername(user.username);
          setPassword(user.password);
          setName(user.name);
          setAddress(user.address);
          setPhone(user.phone);
          setEmail(user.email);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://cookyzz.azurewebsites.net/api/Users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          username: username,
          password: password,
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
            variant="outlined"
            color="primary"
            style={{ width: '100px', float: 'right', borderRadius: '7px' }}
          >
            Lưu
          </Button>
        </Grid>
      </Grid>
      {showSuccess && <div>Lưu thành công</div>}
    </form>
  );
}
