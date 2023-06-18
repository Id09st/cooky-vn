import React, { useLayoutEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo.png';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import LoginForm from '~/pages/Login/LoginForm';
import {
  AccountCircle,
  Call,
  CallOutlined,
  Close,
  FavoriteBorderRounded,
  HomeOutlined,
  Login,
  MoreHorizOutlined,
  Person,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: '0',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80ch',
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.innerWidth < 600);
    }

    window.addEventListener('resize', updateIsMobile);
    updateIsMobile();

    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchIconClick = () => {
    console.log('Search');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Person />
        User
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Button onClick={handleOpen} sx={{ color: 'black' }}>
          <Login />
          Login
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <LoginForm />
          </DialogContent>
        </Dialog>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton size="large" aria-label="show 4 new favorite Foood" color="inherit">
          <Badge badgeContent={4} color="error">
            <FavoriteBorderRounded style={{ borderRadius: '50%' }} />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton size="large" aria-label="show 17 new shoping cart" color="inherit">
          <Link to="/shoping-cart" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Badge badgeContent={17} color="error">
              <ShoppingCartOutlined style={{ borderRadius: '50%', color: 'black' }} />
            </Badge>
          </Link>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton size="large" aria-label="Contact" color="inherit">
          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            <CallOutlined style={{ borderRadius: '50%', color: 'black' }} />
          </Link>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle style={{ borderRadius: '50%' }} />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: 'var(--primary-color)' }}>
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            {isMobile && ( // Kiểm tra nếu là điện thoại di động
              <Link to="/">
                <IconButton edge="start" color="inherit" aria-label="home">
                  <HomeOutlined sx={{ color: 'white' }} />
                </IconButton>
              </Link>
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ marginLeft: '165px' }}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Link to="/">
                <img src={logo} alt="/" />
              </Link>
            </Typography>
          </Box>
          <Search>
            <SearchIconWrapper onClick={handleSearchIconClick}>
              <SearchOutlined />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box style={{ marginRight: '167px' }} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new favorite Foood" color="inherit">
              <Badge badgeContent={4} color="error">
                <FavoriteBorderRounded sx={{ color: 'white' }} />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new shoping cart" color="inherit">
              <Link to="/shoping-cart">
                <Badge badgeContent={17} color="error">
                  <ShoppingCartOutlined sx={{ color: 'white' }} />
                </Badge>
              </Link>
            </IconButton>
            <IconButton size="large" aria-label="Contact" color="inherit">
              <Link to="/contact">
                <Call sx={{ color: 'white' }} />
              </Link>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreHorizOutlined />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
