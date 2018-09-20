<template>
    <div>
        <popup-header/>
        <div class="container">
            <h1>Received Files</h1>

            <div class="documents">
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
    import {mapState} from 'vuex';
    import NodeRSA from 'node-rsa';

    export default {
        computed: {
            ...mapState([
                'wallet',
                'document',
            ])
        },
        methods: {
            download(doc) {
                const self = this;

                // TODO:: Optimize files downloading; problem with freezing on larger files
                const request = new XMLHttpRequest();
                request.open('GET', doc.link, true);
                request.responseType = 'blob';
                request.onload = () => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(request.response);
                    reader.onload = (e) => {

                        try {
                            const key = new NodeRSA(self.wallet.rsaPrivateKey);
                            let fileData = Buffer.from(reader.result, 'base64');
                            let decrypted = key.decrypt(fileData, 'base64');

                            let decryptedFile = new Blob([Buffer.from(decrypted, 'base64')], {type: request.response.type});

                            chrome.downloads.download({
                                url: URL.createObjectURL(decryptedFile)
                            });

                            // TODO:: Set openedAt on this document; create pre signed transaction ob blockchain
                        } catch (err) {
                            console.error(err);
                        }
                    };
                };
                request.send();
            },
        },
    }
</script>
