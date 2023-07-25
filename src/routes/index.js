import Home from '~/pages/Home/Home';
import ShopDetail from '~/pages/Shop/ShopDetail';
import ShopingCart from '~/pages/Shop/ShopingCart';
import Contact from '~/pages/Contact/Contact';
import LoginForm from '~/pages/Login/LoginForm';
import RegisterForm from '~/pages/Login/RegisterForm';
import ShopGrid from '~/pages/Shop/ShopGrid';
import DetailMobile from '~/pages/Shop/DetailMobile';
import Checkout from '~/pages/Shop/CheckOut';
import Search from '~/components/Search/Search';
import OrderStatus from '~/pages/Order/OrderStatus';
import User from '~/pages/User/User';

// Public Routes
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/shop-grid', component: ShopGrid },
  { path: '/shop-detail/:id', component: ShopDetail },
  { path: '/detail-mobile/:id', component: DetailMobile, layout: null },
  { path: '/search', component: Search },
  { path: '/contact', component: Contact },
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/results/:searchTerm', component: Search },
];

const privateRoutes = [
  { path: '/shoping-cart', component: ShopingCart },
  { path: '/checkout', component: Checkout },
  { path: '/order', component: OrderStatus },
  { path: '/user', component: User },
];

export { publicRoutes, privateRoutes };
