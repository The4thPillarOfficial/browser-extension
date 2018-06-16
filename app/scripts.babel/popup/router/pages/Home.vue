<template>
    <div>
        <popup-header/>
        <div class="container">
            <h1>My Account</h1>
            <div class="balance">
                <label>Balance: {{ parseFloat(token.accountBalance) }} {{ token.symbol }}</label>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                balance: 440
            }
        },
        computed: {
            ...mapState([
                'errors',
                'token',
            ])
        }
    }
</script>
