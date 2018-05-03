<template>
    <div>
        <div class="container">
            <div class="text-center p-b-30">
                <img src="/images/assets/logo_dark.png"/>
            </div>
            <h1>Setup your wallet</h1>
            <!-- Password inputs -->
            <div class="form-group">
                <label for="password">New Password (min. 8 chars)</label>
                <input id="password" type="password" v-model="password"/>

                <label for="passwordConfirmation">Confirm Password</label>
                <input id="passwordConfirmation" type="password" v-model="passwordConfirmation"/>
            </div>
            <!-- Show errors -->
            <div v-if="errors.length" class="form-group">
                <div v-for="error in errors" class="alert alert-danger">
                    <strong>{{ error }}</strong>
                </div>
            </div>
            <!-- Submit -->
            <div class="form-group">
                <button type="submit" class="btn" @click="create">Create</button>
            </div>
            <!-- Restore from seed words -->
            <a @click="restoreFromSeedWords">Restore from seed words</a>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import * as Actions from '../../../store/constants';
    import AuthenticationService from '../../../services/AuthenticationService';
    import {RouteNames} from '../routes';

    export default {
        data() {
            return {
                password: '',
                passwordConfirmation: '',
            }
        },
        computed: {
            ...mapState([
                'errors',
                'seedWords',
            ])
        },
        methods: {
            create() {
                this[Actions.CLEAR_ERRORS]();

                // Validate password
                if (AuthenticationService.isValidPassword(this.password, this.passwordConfirmation, this)) {

                    // Create wallet
                    this[Actions.CREATE_NEW_WALLET](this.password).then(() => this.next());
                }
            },
            next() {
                if (this.seedWords) {
                    this.$router.push({name: RouteNames.SHOW_SEED_WORDS});
                } else {
                    this.$router.push({name: RouteNames.MY_ACCOUNT});
                }
            },
            restoreFromSeedWords() {
                this[Actions.CLEAR_ERRORS]();
                this.$router.push({name: RouteNames.RESTORE_FROM_SEED_WORDS});
            },
            ...mapActions([
                Actions.PUSH_ERROR,
                Actions.CLEAR_ERRORS,
                Actions.CREATE_NEW_WALLET,
            ])
        }
    }
</script>
