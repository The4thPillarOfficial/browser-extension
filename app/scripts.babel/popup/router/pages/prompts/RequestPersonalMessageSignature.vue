<template>
    <div>
        <div class="container">
            <h1>Sign Message</h1>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message">{{ getMessage() }}</textarea>
            </div>
            <div class="form-group">
                <button class="btn" @click="accepted">Sign</button>
                <button class="btn" @click="denied">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import NotificationService from '../../../../services/NotificationService';
    import {Helper} from '../../../../utils/Helper';

    export default {
        computed: {
            ...mapState([
                'prompt',
            ])
        },
        methods: {
            accepted() {
                this.prompt.responder({accepted: true});
                NotificationService.close();
            },
            denied() {
                this.prompt.responder(null);
                NotificationService.close();
            },
            getMessage() {
                return Helper.hexToText(this.prompt.data.data);
            },
        }
    }
</script>
