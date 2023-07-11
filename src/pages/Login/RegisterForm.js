import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { RamenDining } from '@mui/icons-material';

const RegisterForm = ({ onClose }) => {
  const [notification, setNotification] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const address = event.target.address.value;

    const data = {
      username: username,
      password: password,
      name: name,
      email: email,
      phone: phone,
      address: address,
      role: 1,
    };

    try {
      const response = await fetch('https://cookyz.somee.com/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Thanh cong');
        setNotification('Đăng ký thành công'); // Thiết lập thông báo
        // Thực hiện các xử lý khác sau khi đăng ký thành công (chẳng hạn như điều hướng trang)
      } else {
        setNotification('Đăng ký không thành công'); // Thiết lập thông báo
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'var(--primary-color)' }}>
          <RamenDining />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng kí
        </Typography>
        {/* Hiển thị thông báo nếu có */}
        {notification && <div>{notification}</div>}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, overflow: 'hidden' }}
          style={{ paddingTop: '5px' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="username" required fullWidth id="username" label="Tài khoản đăng kí" autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField name="name" required fullWidth id="name" label="Họ và tên" autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email" name="email" autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Số điện thoại"
                type="text"
                id="phone"
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField name="address" required fullWidth id="address" label="Địa chỉ" autoFocus />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
            variant="contained"
          >
            Đăng kí
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="#" variant="body2" style={{ color: 'var(--primary-color)' }} onClick={onClose}>
                Bạn đã có tài khoản? Đăng nhập
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterForm;
