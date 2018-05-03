<template>
    <div>
        <popup-header/>
        <div class="container">
            <h1>Receive Four</h1>
            <div class="qr-code">
                <!-- TODO:: QR code of wallet -->
            </div>
            <div class="wallet-address">{{ wallet.defaultAccount }}</div>
            <div class="note">Share this address to receive payments</div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState([
                'wallet',
            ]),
        },
        methods: {
        }
    }
</script>
