import EntryPage from './pages/Entry.vue';
import ShowSeedWordsPage from './pages/ShowSeedWords.vue';
import RestoreFromBackupPage from './pages/RestoreFromBackup.vue';
import RestoreFromSeedWordsPage from './pages/RestoreFromSeedWords.vue';
import UnlockPage from './pages/Unlock.vue';
import WalletBackupPage from './pages/WalletBackup.vue';

import MyAccountPage from './pages/Home.vue';
import SendTokenPage from './pages/SendToken.vue';
import ReceiveTokenPage from './pages/ReceiveToken.vue';
import FilesPage from './pages/Files.vue';
import SettingsPage from './pages/Settings.vue';

import RequestPersonalMessageSignature from './pages/prompts/RequestPersonalMessageSignature.vue';

export const RouteNames = {
    ENTRY: 'entry',
    SHOW_SEED_WORDS: 'show-seed-words',
    RESTORE_FROM_BACKUP: 'restore-from-backup',
    RESTORE_FROM_SEED_WORDS: 'restore-from-seed-words',
    UNLOCK: 'unlock',
    WALLET_BACKUP: 'wallet-backup',

    MY_ACCOUNT: 'my-account',
    SEND_TOKEN: 'send-token',
    RECEIVE_TOKEN: 'receive-token',
    FILES: 'files',
    SETTINGS: 'settings',

    PROMPT_REQUEST_PERSONAL_MESSAGE_SIGNATURE: 'prompt_requestPersonalMessageSignature',
};

const RoutePages = {
    [RouteNames.ENTRY]: EntryPage,
    [RouteNames.SHOW_SEED_WORDS]: ShowSeedWordsPage,
    [RouteNames.RESTORE_FROM_BACKUP]: RestoreFromBackupPage,
    [RouteNames.RESTORE_FROM_SEED_WORDS]: RestoreFromSeedWordsPage,
    [RouteNames.UNLOCK]: UnlockPage,
    [RouteNames.WALLET_BACKUP]: WalletBackupPage,

    [RouteNames.MY_ACCOUNT]: MyAccountPage,
    [RouteNames.SEND_TOKEN]: SendTokenPage,
    [RouteNames.RECEIVE_TOKEN]: ReceiveTokenPage,
    [RouteNames.FILES]: FilesPage,
    [RouteNames.SETTINGS]: SettingsPage,

    [RouteNames.PROMPT_REQUEST_PERSONAL_MESSAGE_SIGNATURE]: RequestPersonalMessageSignature,
};

// Build routes
function buildRoutes() {
    const routeNames = Object.keys(RouteNames).map(key => RouteNames[key]);

    let routes = [];

    routeNames.map(routeName => {
        routes.push({
            path: routeName === RouteNames.ENTRY ? '/' : '/' + routeName,
            name: routeName,
            component: RoutePages[routeName]
        });
    });

    return routes;
}

let routes = buildRoutes();

export default routes;
