<template>
    <div>
        <div class="container">
            <div class="text-center p-b-30">
                <img src="/images/assets/logo_dark.png"/>
            </div>
            <h1>Wallet Backup</h1>
            <div v-if="!canShow">
                <!-- Password inputs -->
                <div class="form-group">
                    <input id="password" type="password" placeholder="Password" v-model="password"/>
                </div>
                <!-- Show errors -->
                <div v-if="errors.length" class="form-group">
                    <div v-for="error in errors" class="alert alert-danger">
                        <strong>{{ error }}</strong>
                    </div>
                </div>
                <!-- Submit -->
                <div class="form-group text-center">
                    <button type="submit" class="btn" @click="goBack">Cancel</button>
                    <button type="submit" class="btn" @click="ok">Ok</button>
                </div>
            </div>
            <div v-else>
                <!-- Display seed words -->
                <h2>Seed Words</h2>
                <div class="seed-words">
                    <ul>
                        <li v-for="seedWord in getSeedWordsAsArray()">{{seedWord}}</li>
                    </ul>
                </div>
                <!-- Display RSA private key -->
                <h2>RSA Private Key</h2>
                <div class="rsa-private-key">{{ rsaPrivateKey }}</div>

                <!-- Go Back -->
                <div class="form-group text-center">
                    <button type="submit" class="btn" @click="goBack">I've copied it somewhere safe</button>
                </div>

                <!-- Save to file -->
                <div class="form-group text-center">
                    <button type="submit" class="btn" @click="saveAsFile">Save as file</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import * as Actions from '../../../store/constants';
    import {RouteNames} from '../routes';

    export default {
        data() {
            return {
                password: '',
                canShow: false,
                seedWords: '',
                rsaPrivateKey: '',
            }
        },
        computed: {
            ...mapState([
                'errors',
            ]),
        },
        methods: {
            ok() {
                this[Actions.CLEAR_ERRORS]();

                // Check wallet password
                this[Actions.CHECK_WALLET_PASSWORD](this.password).then(() => this.show());
            },
            show() {
                // Get seed words
                this[Actions.GET_SEED_WORDS]().then((seedWords) => this.seedWords = seedWords);

                // Get RSA private key
                this[Actions.GET_RSA_PRIVATE_KEY]().then((rsaPrivateKey) => this.rsaPrivateKey = rsaPrivateKey);

                this.canShow = true;
            },
            getSeedWordsAsArray() {
                return this.seedWords ? this.seedWords.split(' ') : [];
            },
            goBack() {
                this.$router.push({name: RouteNames.SETTINGS});
            },
            saveAsFile() {
                const data = {
                    seedWords: this.seedWords,
                    rsaPrivateKey: this.rsaPrivateKey,
                };
                const fileData = new Blob([Buffer.from(JSON.stringify(data))], {type: 'application/json'});

                chrome.downloads.download({
                    url: URL.createObjectURL(fileData)
                });
            },
            ...mapActions([
                Actions.PUSH_ERROR,
                Actions.CLEAR_ERRORS,
                Actions.CHECK_WALLET_PASSWORD,
                Actions.GET_SEED_WORDS,
                Actions.GET_RSA_PRIVATE_KEY,
            ])
        }
    }
</script>
