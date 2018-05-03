<template>
    <div>
        <div class="container">
            <div class="text-center p-b-30">
                <img src="/images/assets/logo_dark.png"/>
            </div>
            <h1>Seed Words</h1>
            <!-- Display seed words -->
            <div class="seed-words">
                <ul>
                    <li v-for="seedWord in getSeedWordsAsArray()">{{seedWord}}</li>
                </ul>
            </div>

            <!-- Submit -->
            <div class="form-group">
                <button type="submit" class="btn" @click="next">I wrote it down</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import * as Actions from '../../../store/constants';
    import {RouteNames} from '../routes';

    export default {
        computed: {
            ...mapState([
                'seedWords',
            ])
        },
        methods: {
            getSeedWordsAsArray() {
                return this.seedWords ? this.seedWords.split(' ') : [];
            },
            next() {
                // Clear seed words from store
                this[Actions.SET_SEED_WORDS](null);

                this.$router.push({name: RouteNames.MY_ACCOUNT});
            },
            ...mapActions([
                Actions.SET_SEED_WORDS,
            ])
        }
    }
</script>
