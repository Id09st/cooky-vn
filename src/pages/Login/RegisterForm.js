import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Container, CssBaseline, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Close, RamenDining } from '@mui/icons-material';

const RegisterForm = ({ onClose }) => {
  const [notification, setNotification] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, name, email, phone, address } = event.target;

    const data = {
      username: username.value,
      password: password.value,
      name: name.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
    };

    try {
      const response = await fetch('https://cookyzz.azurewebsites.net/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        onClose();
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '80px 30px 40px 30px',
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
          <IconButton style={{ position: 'absolute', right: 0, top: 0 }} onClick={onClose}>
            <Close />
          </IconButton>
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
