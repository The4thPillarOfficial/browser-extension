<template>
    <div>
        <popup-header/>
        <div class="container">
            <h1>Received Files</h1>

            <div class="documents">
                <div v-if="isLoading">Loading...</div>
                <div v-for="document in document.documents" class="document">
                    Sender: {{ document.sender }}<br/>
                    Name: {{ document.name }}<br/>
                    Description: {{ document.description }}<br/>
                    Type: {{ document.docType }}<br/>
                    <button @click="download(document)">Download</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import * as Actions from '../../../store/constants';
    import DocumentService from '../../../services/DocumentService';

    export default {
        data() {
            return {
                isLoading: true,
            }
        },
        mounted() {
            this.$store.dispatch(Actions.SET_DOCUMENTS).then(() => {
                this.isLoading = false;
            });
        },
        computed: {
            ...mapState([
                'wallet',
                'document',
            ])
        },
        methods: {
            download(doc) {
                DocumentService.downloadFile(doc.link, this.wallet.rsaPrivateKey, (res) => {});
            },
        },
        ...mapActions([
            Actions.SET_DOCUMENTS,
        ]),
    }
</script>
