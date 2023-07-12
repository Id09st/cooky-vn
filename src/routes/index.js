import Home from '~/pages/Home/Home';
import ShopDetail from '~/pages/Shop/ShopDetail';
import ShopingCart from '~/pages/Shop/ShopingCart';
import Contact from '~/pages/Contact/Contact';
import Admin from '~/pages/Admin/Admin';
import LoginForm from '~/pages/Login/LoginForm';
import RegisterForm from '~/pages/Login/RegisterForm';
import ShopGrid from '~/pages/Shop/ShopGrid';
import DetailMobile from '~/pages/Shop/DetailMobile';
import Checkout from '~/pages/Shop/CheckOut';

// Public Routes
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/shop-grid', component: ShopGrid },
  { path: '/shop-detail/:id', component: ShopDetail },
  { path: '/detail-mobile/:id', component: DetailMobile, layout: null },
  { path: '/shoping-cart', component: ShopingCart },
  { path: '/checkout', component: Checkout },
  { path: '/search', component: SearchRecipes },
  { path: '/contact', component: Contact },
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: "/results/:searchTerm", component: Search },
  { path: '/admin', component: Admin, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
