import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '~/sass/_header.scss';
import '~/sass/_responsive.scss';
import Badge from '@mui/material/Badge';
import { styled, alpha } from '@mui/material/styles';
import logo from '~/assets/images/logo.png';
import { FavoriteBorderRounded, ShoppingCartOutlined } from '@mui/icons-material';
import { IconButton, InputBase, Dialog, DialogContent, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from '~/pages/Login/LoginForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link to="/">
                  <img src={logo} alt="/" />
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <Search style={{ marginTop: '20px' }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </div>
            <div className="col-lg-3">
              <div className="header__cart">
                <ul>
                  <li>
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={4} color="secondary">
                        <FavoriteBorderRounded />
                      </StyledBadge>
                    </IconButton>
                  </li>
                  <li>
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={4} color="secondary">
                        <ShoppingCartOutlined />
                      </StyledBadge>
                    </IconButton>
                  </li>
                </ul>
                <div className="header__cart__price">
                  item: <span>$150.00</span>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <Button style={{ marginTop: '15px' }} aria-label="Example" onClick={handleOpen} sx={{ fontSize: 40 }}  >
                <AccountCircleIcon fontSize='lagre' />
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent>
                  <LoginForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
