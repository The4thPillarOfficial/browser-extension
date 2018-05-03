<template>
    <div>
        <ul class="main-menu">
            <li>
                <router-link :to="{ name: RouteNames.MY_ACCOUNT }" class="home" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-home">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-home"></use>
                    </svg>
                    <span>Home</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: RouteNames.SEND_TOKEN }" class="send" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-up">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-up"></use>
                    </svg>
                    <span>Send</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: RouteNames.RECEIVE_TOKEN }" class="receive" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-down">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-down"></use>
                    </svg>
                    <span>Receive</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: RouteNames.FILES }" class="files" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-file-text">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-file-text"></use>
                    </svg>
                    <span>Files</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: RouteNames.SETTINGS }" class="settings" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-setting">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-setting"></use>
                    </svg>
                    <span>Settings</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {RouteNames} from '../router/routes';

    export default {
        data() {
            return {
                RouteNames: RouteNames
            }
        }
    }
</script>
