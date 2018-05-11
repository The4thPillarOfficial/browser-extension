'use strict';

import Vue from 'vue';
import Popup from './popup/Popup.vue';
import PopupHeader from './popup/components/PopupHeader.vue';
import store from './store';
import * as Actions from './store/constants';
import router from './popup/router';
import {RouteNames} from './popup/router/routes';

Vue.component('popup-header', PopupHeader);

store.dispatch(Actions.LOAD_WALLET).then(() => {

    if (store.getters.isVaultExists && !store.getters.isUnlocked) {
        router.push({name: RouteNames.UNLOCK})
    }

    new Vue({
        el: '#app',
        store,
        router,
        render: h => h(Popup)
    });
});
