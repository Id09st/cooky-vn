import { Box, Breadcrumbs, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CheckOut() {
  useEffect(() => {
    const setBgImages = () => {
      const elements = document.getElementsByClassName('set-bg');
      Array.from(elements).forEach((element) => {
        const bg = element.dataset.setbg;
        element.style.backgroundImage = `url(${bg})`;
      });
    };
    setBgImages();
  }, []);
  return (
    <>
      {/* Bắt đầu breadcrumb */}
      <Box
        component="section"
        sx={{
          backgroundImage: 'url(img/breadcrumb.jpg)',
          backgroundSize: 'cover',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h2" style={{ color: 'var(--white-color)' }}>
              Checkout
            </Typography>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator="›"
              style={{ color: 'var(--white-color)' }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link underline="hover" to="/">
                <Typography style={{ color: 'var(--white-color)' }}>Home</Typography>
              </Link>
              <Typography style={{ color: 'var(--white-color)' }} variant="body1">
                Check Out
              </Typography>
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>
      {/* Kết thúc breadcrumb */}
      
      {/* Checkout Section Begin */}
      <section className="checkout spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>
                <span className="icon_tag_alt" /> Have a coupon? <Link to="/">Click here</Link> to enter your code
              </h6>
            </div>
          </div>
          <div className="checkout__form">
            <h4>Billing Details</h4>
            <form action="#">
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Fist Name<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Last Name<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="checkout__input">
                    <p>
                      Country<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Address<span>*</span>
                    </p>
                    <input type="text" placeholder="Street Address" className="checkout__input__add" />
                    <input type="text" placeholder="Apartment, suite, unite ect (optinal)" />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Town/City<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Country/State<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Postcode / ZIP<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Phone<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Email<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="checkout__input__checkbox">
                    <label htmlFor="acc">
                      Create an account?
                      <input type="checkbox" id="acc" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <p>
                    Create an account by entering the information below. If you are a returning customer please login at
                    the top of the page
                  </p>
                  <div className="checkout__input">
                    <p>
                      Account Password<span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input__checkbox">
                    <label htmlFor="diff-acc">
                      Ship to a different address?
                      <input type="checkbox" id="diff-acc" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="checkout__input">
                    <p>
                      Order notes<span>*</span>
                    </p>
                    <input type="text" placeholder="Notes about your order, e.g. special notes for delivery." />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h4>Your Order</h4>
                    <div className="checkout__order__products">
                      Products <span>Total</span>
                    </div>
                    <ul>
                      <li>
                        Vegetable’s Package <span>$75.99</span>
                      </li>
                      <li>
                        Fresh Vegetable <span>$151.99</span>
                      </li>
                      <li>
                        Organic Bananas <span>$53.99</span>
                      </li>
                    </ul>
                    <div className="checkout__order__subtotal">
                      Subtotal <span>$750.99</span>
                    </div>
                    <div className="checkout__order__total">
                      Total <span>$750.99</span>
                    </div>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="acc-or">
                        Create an account?
                        <input type="checkbox" id="acc-or" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adip elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua.
                    </p>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="payment">
                        Check Payment
                        <input type="checkbox" id="payment" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="paypal">
                        Paypal
                        <input type="checkbox" id="paypal" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <button type="submit" className="site-btn">
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Checkout Section End */}
    </>
  );
}
