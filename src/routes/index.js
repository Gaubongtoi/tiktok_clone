import Home from '~/pages/Home';
import Following from '~/pages/Following';
import { HeaderOnly } from '~/components/Layout';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Profile from '~/pages/Profile';
// Public Routes ~ Khi chưa đăng nhập
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/:nickname', component: Profile },
    { path: '/search', component: Search, layout: null },
];
// PrivateRoutes ~ Khi đăng nhập

const privateRoutes = [];

export { publicRoutes, privateRoutes };
