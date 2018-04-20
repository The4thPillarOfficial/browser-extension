<template>
    <div>
        <ul class="main-menu">
            <li>
                <router-link to="/" class="home" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-home">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-home"></use>
                    </svg>
                    <span>Home</span>
                </router-link>
            </li>
            <li>
                <router-link to="/send-token" class="send" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-up">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-up"></use>
                    </svg>
                    <span>Send</span>
                </router-link>
            </li>
            <li>
                <router-link to="/receive-token" class="receive" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-down">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-down"></use>
                    </svg>
                    <span>Receive</span>
                </router-link>
            </li>
            <li>
                <router-link to="/files" class="files" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-file-text">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-file-text"></use>
                    </svg>
                    <span>Files</span>
                </router-link>
            </li>
            <li>
                <router-link to="/settings" class="settings" active-class="active" exact>
                    <svg viewBox="0 0 10 10" class="icon ant-setting">
                        <use xlink:href="/images/icons/sprites.svg#si-ant-setting"></use>
                    </svg>
                    <span>Settings</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
