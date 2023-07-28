import React, { useEffect, useState } from 'react';
import { useParams, Link,  useNavigate } from 'react-router-dom';
import { CardContent, Typography, Container } from '@mui/material';
import { FavoriteBorderRounded, FullscreenOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export default function Search() {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [packages, setPackages] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://cookyzz.azurewebsites.net/api/Recipes')
      .then((response) => response.json())
      .then((data) => {
        const filteredResults = data.filter((result) => result.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setResults(filteredResults);
      });

    fetch('https://cookyzz.azurewebsites.net/api/Packages')
      .then((response) => response.json())
      .then((data) => setPackages(data));
  }, [searchTerm]);

  const calculatePriceSale = (price, sales) => {
    let priceSale = 0;
    if (sales > 0) {
      priceSale = price - sales;
    } else {
      priceSale = price;
    }
    return priceSale;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const nameFromStorage = localStorage.getItem('name');
        const response = await fetch('https://cookyzz.azurewebsites.net/api/Users/');
        const users = await response.json();
        const user = users.find((user) => user.username === nameFromStorage);
        const userResponse = await fetch(`https://cookyzz.azurewebsites.net/api/Users/${user.id}`);
        const data = await userResponse.json();
        const onCartOrder = data.orders.find((order) => order.status === 'On-cart');
        if (onCartOrder) {
          setOrderId(onCartOrder.id);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleAddToCart = async (pkg) => {
    const responseOders = await fetch(`https://cookyzz.azurewebsites.net/api/Orders/${orderId}`);
    const data = await responseOders.json();

    const currentItem = data.items.find((item) => item.packageId === pkg.id);
    const currentQuantity = currentItem ? currentItem.quantity : 0;

    const response = await fetch(`https://cookyzz.azurewebsites.net/api/Orders/addCart/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        orderId: orderId,
        packageId: pkg.id,
        quantity: currentQuantity + 1,
        price: (pkg.price - pkg.sales) * (currentQuantity + 1),
      }),
    });

    if (!response.ok) {
      console.error('Response status:', response.status, 'status text:', response.statusText);
      throw new Error('Error adding to cart');
    }
    window.scrollTo(0, 0);
    navigate('/shoping-cart');
  };

  const role = localStorage.getItem('role');

  return (
    <Container style={{ marginTop: '80px' }}>
      <div className="row">
        <div className="col-lg-12">
          <Typography
            className="my-title"
            variant="h4"
            style={{ marginTop: '50px', marginBottom: '50px', fontWeight: 'bold' }}
          >
            Kết Quả Tìm Kiếm của "{searchTerm}"
          </Typography>
        </div>

        {results.map((result) => {
          const pkg = packages.find((pkg) => pkg.recipeId === result.id);
          if (pkg) {
            return (
              <div key={result.id} className={`col-lg-3 col-md-4 col-sm-6 mix ${result.title}`}>
                <div className="featured__item">
                  <div
                    className="featured__item__pic set-bg"
                    style={{ backgroundImage: `url(${result.image.split('\n')[0]})` }}
                  >
                    {role === 'User' || role === 'Admin' ? (
                      <ul className="featured__item__pic__hover">
                        <li>
                          <Link to="/">
                            <FavoriteBorderRounded />
                          </Link>
                        </li>
                        <li>
                          <Link to={`/shop-detail/${result.id}`}>
                            <FullscreenOutlined />
                          </Link>
                        </li>
                        <li>
                          <Link to="/shoping-cart" onClick={(event) => handleAddToCart(pkg, event)}>
                            <ShoppingCartOutlined />
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      <ul className="featured__item__pic__hover">
                        <li>
                          <Link to={`/shop-detail/${result.id}`}>
                            <FullscreenOutlined />
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                  <CardContent style={{ paddingTop: '15px' }}>
                    <Typography
                      variant="h6"
                      component={Link}
                      style={{
                        color: 'var(--black-color)',
                        fontSize: '18px',
                        fontWeight: '700',
                        height: '48px',
                        paddingTop: '10px',
                        marginBottom: '5px',
                      }}
                      to={`/shop-detail/${result.id}`}
                    >
                      {result.title}
                    </Typography>
                    <Typography variant="subtitle1" style={{}}>
                      {calculatePriceSale(pkg.price, pkg.sales).toLocaleString('vi-VN')}₫
                      {pkg.sales >= 1000 ? (
                        <s
                          style={{
                            marginLeft: '10px',
                            fontSize: '14px',
                            lineHeight: '20px',
                            textDecorationLine: 'line-through',
                            color: 'var(--sale-color)',
                            position: 'relative',
                            marginBottom: '5px',
                          }}
                        >
                          {pkg.sales / 1000}k
                        </s>
                      ) : pkg.sales === 0 ? (
                        <></>
                      ) : (
                        <s
                          style={{
                            marginLeft: '10px',
                            fontSize: '14px',
                            lineHeight: '20px',
                            textDecorationLine: 'line-through',
                            color: 'var(--sale-color)',
                            position: 'relative',
                            marginBottom: '5px',
                          }}
                        >
                          {pkg.sales}₫
                        </s>
                      )}
                    </Typography>
                  </CardContent>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </Container>
  );
}
