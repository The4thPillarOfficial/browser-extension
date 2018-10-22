<template>
    <div>
        <popup-header/>
        <div class="container">
            <h1>Settings</h1>
            <!-- Logout -->
            <div class="form-group">
                <button class="btn" @click="logout">Log Out</button>
            </div>
            <!-- Wallet Backup -->
            <div class="form-group">
                <button class="btn" @click="walletBackup">Wallet Backup</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import * as Actions from '../../../store/constants';
    import {RouteNames} from '../routes';

    export default {
        methods: {
            logout() {
                this[Actions.LOCK_WALLET]().then(() => {
                    this.$router.push({name: RouteNames.UNLOCK});
                });
            },
            walletBackup() {
                this.$router.push({name: RouteNames.WALLET_BACKUP});
            },
            ...mapActions([
                Actions.LOCK_WALLET,
            ])
        }
    }
</script>
