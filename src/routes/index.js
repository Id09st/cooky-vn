import Home from '~/pages/Home/Home';
import ShopDetail from '~/pages/Shop/ShopDetail';
import ShopingCart from '~/pages/Shop/ShopingCart';
import CheckOut from '~/pages/Shop/CheckOut';
import Contact from '~/pages/Contact/Contact';
import Admin from '~/pages/Admin/Admin';
import LoginForm from '~/pages/Login/LoginForm';
import Checkout from '~/pages/Checkout/Checkout';
import ShopGrid from '~/pages/Shop/ShopGrid';

// Public Routes
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/shop-grid', component: ShopGrid },
  { path: '/shop-detail', component: ShopDetail },
  { path: '/shoping-cart', component: ShopingCart },
  { path: '/checkout', component: CheckOut },
  { path: '/checkout1', component: Checkout },
  { path: '/contact', component: Contact },
  { path: '/login', component: LoginForm },
  { path: '/admin', component: Admin, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
