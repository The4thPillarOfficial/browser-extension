<template>
    <div>
        <div class="container">
            <div class="text-center p-b-30">
                <img src="/images/assets/logo_dark.png"/>
            </div>
            <h1>Restore from Seed Words</h1>
            <!-- Display seed words -->
            <div class="form-group">
                <textarea v-model="seedWords" placeholder="Enter your secret twelve word phrase here to restore your vault."></textarea>
            </div>
            <!-- Password inputs -->
            <div class="form-group">
                <input id="password" type="password" placeholder="New Password (min. 8 chars)" v-model="password"/>
                <input id="passwordConfirmation" type="password" placeholder="Confirm Password" v-model="passwordConfirmation"/>
            </div>
            <!-- Show errors -->
            <div v-if="errors.length" class="form-group">
                <div v-for="error in errors" class="alert alert-danger">
                    <strong>{{ error }}</strong>
                </div>
            </div>
            <!-- Submit -->
            <div class="form-group text-center">
                <button type="button" class="btn cancel" @click="cancel">Cancel</button>
                <button type="submit" class="btn" @click="restore">Restore</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import * as Actions from '../../../store/constants';
    import AuthenticationService from '../../../services/AuthenticationService';
    import {RouteNames} from '../routes';
    import Account from '../../../models/Account';

    export default {
        data() {
            return {
                seedWords: '',
                password: '',
                passwordConfirmation: '',
            }
        },
        computed: {
            ...mapState([
                'errors',
            ])
        },
        methods: {
            restore() {
                this[Actions.CLEAR_ERRORS]();

                // Replace new lines with spaces
                this.seedWords = this.seedWords.replace(/\n/g, ' ');

                // Validate seed words
                if (Account.isValidSeedWords(this.seedWords, this)) {

                    // Validate password
                    if (AuthenticationService.isValidPassword(this.password, this.passwordConfirmation, this)) {

                        // Restore wallet
                        this[Actions.RESTORE_WALLET]({seedWords: this.seedWords, password: this.password}).then(() => this.next());
                    }
                }
            },
            next() {
                this.$router.push({name: RouteNames.MY_ACCOUNT});
            },
            cancel() {
                this[Actions.CLEAR_ERRORS]();
                this.$router.back();
            },
            ...mapActions([
                Actions.PUSH_ERROR,
                Actions.CLEAR_ERRORS,
                Actions.RESTORE_WALLET,
            ])
        }
    }
</script>
