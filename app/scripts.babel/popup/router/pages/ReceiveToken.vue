<template>
    <div>
        <popup-header/>
        <div class="container">
            <h1>Receive Four</h1>
            <div id="qr-code" class="qr-code"></div>
            <div class="wallet-address">{{ wallet.defaultAccount }}</div>
            <div class="note">Share this address to receive payments</div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import qrcode from 'qrcode-generator';

    export default {
        computed: {
            ...mapState([
                'wallet',
            ]),
        },
        mounted() {
            let typeNumber = 10;
            let errorCorrectionLevel = 'H';
            let qr = qrcode(typeNumber, errorCorrectionLevel);

            qr.addData(this.wallet.defaultAccount);
            qr.make();
            document.getElementById('qr-code').innerHTML = qr.createSvgTag();
        },
        methods: {
        }
    }
</script>
