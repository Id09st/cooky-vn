import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CardContent, Container, Typography } from '@mui/material';
import { FavoriteBorderRounded, FullscreenOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function SearchRecipe() {
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [packages, setPackages] = useState([]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoriesResponse = await fetch('https://649febe0ed3c41bdd7a6d4a2.mockapi.io/categories/');
    const categories = await categoriesResponse.json();
    const foundCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchValue.trim().toLowerCase()),
    );
    const recipeIds = foundCategories.map((category) => category.recipeId);
    const recipesResponse = await fetch('https://64933779428c3d2035d18178.mockapi.io/recipes/');
    const recipes = await recipesResponse.json();
    const foundRecipes = recipes.filter((recipe) => recipeIds.includes(recipe.id));
    setRecipes(foundRecipes);

    const packageResponse = await fetch('https://cookyzz.azurewebsites.net/api/Packages/');
    const packageData = await packageResponse.json();
    setPackages(packageData);
  };

  const calculateTotalPrice = (recipeId) => {
    const relatedPackages = packages.filter((packages) => packages.recipeId === recipeId);
    const totalPrice = relatedPackages.reduce((sum, packages) => sum + packages.price, 0);
    return totalPrice;
  };

  const calculateTotalSales = (recipeId) => {
    const relatedPackages = packages.filter((packages) => packages.recipeId === recipeId);
    const totalSales = relatedPackages.reduce((sum, packages) => sum + packages.sales, 0);
    return totalSales;
  };

  return (
    <Container style={{ paddingTop: '100px' }}>
      <form onSubmit={handleSubmit}>
        <TextField label="Search" value={searchValue} onChange={handleChange} />
        <Button type="submit">Search</Button>
      </form>
      <div className="row featured__filter">
        {recipes.map((recipe) => {
          if (!recipe) {
            return null; // Bỏ qua gói hàng nếu không tìm thấy thông tin recipe
          }

          let priceSale = 0;

          if (calculateTotalSales(recipe.id) > 0) {
            priceSale = calculateTotalPrice(recipe.id) - calculateTotalSales(recipe.id);
          } else {
            priceSale = calculateTotalPrice(recipe.id);
          }

          return (
            <div key={recipe.id} className={`col-lg-3 col-md-4 col-sm-6 mix ${recipe.title}`}>
              <div className="featured__item">
                <div
                  className="featured__item__pic set-bg"
                  style={{ backgroundImage: `url(${recipe.image.split('\n')[0]})` }}
                >
                  <ul className="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <FavoriteBorderRounded />
                      </a>
                    </li>
                    <li>
                      <Link to={`shop-detail/${recipe.id}`}>
                        <FullscreenOutlined />
                      </Link>
                    </li>
                    <li>
                      <Link to="/shoping-cart">
                        <ShoppingCartOutlined />
                      </Link>
                    </li>
                  </ul>
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
                    to="/#"
                  >
                    {recipe.title}
                  </Typography>
                  <Typography variant="subtitle1" style={{}}>
                    {priceSale.toLocaleString('vi-VN')}₫
                    {calculateTotalSales(recipe.id) >= 1000 ? (
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
                        {calculateTotalSales(recipe.id) / 1000}k
                      </s>
                    ) : calculateTotalSales(recipe.id) === 0 ? (
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
                        {calculateTotalSales(recipe.id)}
                      </s>
                    )}
                  </Typography>
                </CardContent>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
