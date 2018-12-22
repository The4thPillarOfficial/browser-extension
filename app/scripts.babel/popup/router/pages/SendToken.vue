<template>
    <div>
        <popup-header/>
        <div class="container">
            <h1>Send Four</h1>
            <!-- Success Message -->
            <div v-if="successMsg">
                {{ successMsg }}
            </div>
            <!-- Inputs -->
            <div class="form-group">
                <input id="recipient" type="text" placeholder="Recipient Address" v-model="to" @change="calculateFee"/>
                <input id="amount" type="number" step="any" min="0.000000000000000001" placeholder="Amount" v-model.number="value"/>
            </div>
            <!-- Totals -->
            <div class="totals">
                <div><label>Transaction Fee:</label> {{ transactionFee }} {{ token.symbol }}</div>
                <div><label>Total:</label> {{ value + transactionFee }} {{ token.symbol }}</div>
            </div>
            <!-- Show errors -->
            <div v-if="errors.length" class="form-group">
                <div v-for="error in errors" class="alert alert-danger">
                    <strong>{{ error }}</strong>
                </div>
            </div>
            <!-- Buttons -->
            <div class="form-group text-center">
                <button class="btn" @click="send">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import * as Actions from '../../../store/constants';
    import TokenContract from '../../../utils/token/TokenContract';

    export default {
        data() {
            return {
                to: null,
                value: null,
                transactionFee: 0,
                successMsg: null,
            }
        },
        computed: {
            ...mapState([
                'wallet',
                'errors',
                'token',
                'web3',
            ])
        },
        methods: {
            resetForm() {
                this.to = null;
                this.value = null;
                this.transactionFee = null;
            },
            validateForm() {
                this[Actions.CLEAR_ERRORS]();

                // Check wallet address
                if (!this.to) {
                    this[Actions.PUSH_ERROR]('Missing recipient wallet address!');

                } else if (!this.web3.isAddress(this.to)) {
                    this[Actions.PUSH_ERROR]('Recipient wallet address is not valid!');
                }

                // Check amount
                if (this.value <= 0) {
                    this[Actions.PUSH_ERROR]('Amount must be higher then 0!');
                }

                // Check if user has enough balance
                if ((this.value + this.transactionFee) > this.token.accountBalance) {
                    this[Actions.PUSH_ERROR]('Your account balance is to low! Your balance is ' + this.token.accountBalance + ' ' + this.token.symbol);
                }
            },
            calculateFee() {
                TokenContract.estimateTransactionFee(this.to).then(res => {
                    this.transactionFee = res;
                });
            },
            send() {
                this.validateForm();

                // Check for errors
                if (this.errors.length > 0) {
                    return;
                }

                TokenContract.sendPreSignedTransaction(this.wallet.defaultAccount, this.to, this.value, this.transactionFee).then(res => {
                    if (res) {
                        this.resetForm();
                        this.successMsg = 'Your transaction is settled';

                    } else {
                        this[Actions.PUSH_ERROR]('Signature is not valid!');
                    }
                }).catch(err => {
                    this[Actions.PUSH_ERROR]('There was an unexpected error!');
                    console.error(err);
                });
            },
            ...mapActions([
                Actions.PUSH_ERROR,
                Actions.CLEAR_ERRORS,
            ])
        }
    }
</script>
