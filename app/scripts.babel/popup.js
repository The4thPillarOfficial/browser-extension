'use strict';

import Vue from 'vue';
import Popup from './popup/Popup.vue';
import PopupHeader from './popup/components/PopupHeader.vue';
import store from './store';
import router from './popup/router';

Vue.component('popup-header', PopupHeader);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(Popup)
});
