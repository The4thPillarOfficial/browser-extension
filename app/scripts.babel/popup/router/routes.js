import HomePage from './pages/Home.vue';
import SendTokenPage from './pages/SendToken.vue';
import ReceiveTokenPage from './pages/ReceiveToken.vue';
import FilesPage from './pages/Files.vue';
import SettingsPage from './pages/Settings.vue';

export default [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/send-token',
        component: SendTokenPage
    },
    {
        path: '/receive-token',
        component: ReceiveTokenPage
    },
    {
        path: '/files',
        component: FilesPage
    },
    {
        path: '/settings',
        component: SettingsPage
    }
];
