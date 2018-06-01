import Vue from 'vue';
import Popup from './popup/Popup.vue';
import store from './store';
import * as Actions from './store/constants';
import router from './popup/router';
import {RouteNames} from './popup/router/routes';

let prompt = window.data;

store.dispatch(Actions.PUSH_PROMPT, prompt).then(() => {

    router.push({name: prompt.getRouteName()});

    new Vue({
        el: '#app',
        store,
        router,
        render: h => h(Popup)
    });
});
