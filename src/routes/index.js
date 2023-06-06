import Home from '~/pages/Home/Home';
import ShopGrid from '~/pages/Shop/ShopGrid';
import ShopDetail from '~/pages/Shop/ShopDetail';
import ShopingCart from '~/pages/Shop/ShopingCart';
import CheckOut from '~/pages/Shop/CheckOut';
import Contact from '~/pages/Contact/Contact';
import Admin from '~/pages/Admin/Admin';
import SignIn from '~/pages/SignIn/SignIn';

// Public Routes
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/shop-grid', component: ShopGrid },
  { path: '/shop-detail', component: ShopDetail },
  { path: '/shoping-cart', component: ShopingCart },
  { path: '/checkout', component: CheckOut },
  { path: '/contact', component: Contact },
  { path: '/admin', component: Admin, layout: null },
  { path: '/signin', component: SignIn, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
