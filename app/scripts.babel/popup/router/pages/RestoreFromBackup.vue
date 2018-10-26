<template>
    <div>
        <div class="container">
            <div class="text-center p-b-30">
                <img src="/images/assets/logo_dark.png"/>
            </div>
            <h1>Restore from Backup</h1>
            <!-- Restore from file -->
            <h2>Restore from file</h2>
            <div class="form-group">
                <input type="file" @change="processFile($event)"/>
            </div>
            <!-- Password inputs -->
            <h2>Set password</h2>
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
            <!-- Restore from seed words -->
            <div class="form-group text-center f-upper">
                <a @click="restoreFromSeedWords">Restore from seed words</a>
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
                fileData: null,
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
            processFile(event) {
                const self = this;
                const reader = new FileReader();
                reader.readAsText(event.target.files[0]);
                reader.onload = function(e) {
                    self.fileData = JSON.parse(e.target.result);
                };
            },
            validateFile() {
                if (!this.fileData) {
                    this[Actions.PUSH_ERROR]('Empty file.');
                    return false;
                }

                // Check seed words
                this.fileData.seedWords = this.fileData.seedWords.replace(/\n/g, ' ');
                if (Account.isValidSeedWords(this.fileData.seedWords, this)) {
                    // Check RSA private key
                    return Account.isValidRsaPrivateKey(this.fileData.rsaPrivateKey, this);
                }

                return false;
            },
            restore() {
                this[Actions.CLEAR_ERRORS]();

                // Validate File
                if (this.validateFile()) {
                    // Validate password
                    if (AuthenticationService.isValidPassword(this.password, this.passwordConfirmation, this)) {
                        // Restore wallet
                        this[Actions.RESTORE_WALLET]({
                            seedWords: this.fileData.seedWords,
                            rsaPrivateKey: this.fileData.rsaPrivateKey,
                            password: this.password
                        }).then(() => this.next());
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
            restoreFromSeedWords() {
                this[Actions.CLEAR_ERRORS]();
                this.$router.push({name: RouteNames.RESTORE_FROM_SEED_WORDS});
            },
            ...mapActions([
                Actions.PUSH_ERROR,
                Actions.CLEAR_ERRORS,
                Actions.RESTORE_WALLET,
            ])
        }
    }
</script>
