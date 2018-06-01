import {EncryptedStream} from 'extension-streams';
import * as PairingTags from './messages/PairingTags'
import randomString from 'random-string';
import * as NetworkMessageTypes from './messages/NetworkMessageTypes'
import NetworkMessage from './messages/NetworkMessage';
import InternalMessage from './messages/InternalMessage';
import * as InternalMessageTypes from './messages/InternalMessageTypes'

let stream = null;
let isReady = false;

class Content {

    constructor() {
        this.setupEncryptedStream();
        this.injectScript();
    }

    /**
     * Method setup a new encrypted stream for interaction between the extension and website
     */
    setupEncryptedStream() {
        stream = new EncryptedStream(PairingTags.THE4THPILLAR, randomString({length: 256}));
        stream.listenWith((msg) => Content.contentListener(msg));

        stream.onSync(async () => {
            const defaultAccount = await Content.getDefaultAccount();
            const defaultNetwork = await Content.getDefaultNetwork();

            stream.send(NetworkMessage.payload(NetworkMessageTypes.PUSH_THE4THPILLAR, {defaultAccount, defaultNetwork}), PairingTags.INJECTED);

            isReady = true;
        });
    }

    /**
     * Method inject inject.js script into the application
     */
    injectScript() {
        let script = document.createElement('script');
        script.src = chrome.extension.getURL('scripts/inject.js');
        (document.head || document.documentElement).appendChild(script);
        script.onload = () => script.remove();
    }

    /**
     * Method is responsible to delegate stream messages to responsible method
     *
     * @param msg
     */
    static contentListener(msg) {
        if (!isReady) return;
        if (!msg) return;

        if (!stream.synced && (!msg.hasOwnProperty('type') || msg.type !== 'sync')) {
            return;
        }

        let nonSyncMessage = new NetworkMessage(msg.type, msg.payload, msg.resolver);
        switch (msg.type) {
            case 'sync':
                Content.sync(msg);
                break;

            case NetworkMessageTypes.GET_DEFAULT_ACCOUNT:
                Content.getDefaultAccount(nonSyncMessage);
                break;

            case NetworkMessageTypes.REQUEST_PERSONAL_MESSAGE_SIGNATURE:
                Content.requestPersonalMessageSignature(nonSyncMessage);
                break;
        }
    }

    /**
     * Method respond to messages over stream
     *
     * @param message
     * @param payload
     */
    static respond(message, payload) {
        if (!isReady) return;

        const response = (!payload || payload.hasOwnProperty('isError'))
            ? message.error(payload)
            : message.respond(payload);

        stream.send(response, PairingTags.INJECTED);
    }

    /**
     * Method for syncing the stream
     *
     * @param message
     */
    static sync(message) {
        stream.key = message.handshake.length ? message.handshake : null;
        stream.send({type: 'sync'}, PairingTags.INJECTED);
        stream.synced = true;
    }

    /**
     * Method return default wallet account address
     *
     * @param message
     */
    static getDefaultAccount(message = null) {
        const promise = InternalMessage.payload(InternalMessageTypes.GET_DEFAULT_ACCOUNT).send();
        if (message) {
            promise.then(res => {
                Content.respond(message, res);
            });
        } else {
            return promise;
        }
    }

    /**
     * Method return default network
     */
    static getDefaultNetwork() {
        return InternalMessage.payload(InternalMessageTypes.GET_DEFAULT_NETWORK).send();
    }

    /**
     * Method return signed personal message
     *
     * @param message
     */
    static requestPersonalMessageSignature(message) {
        InternalMessage.payload(InternalMessageTypes.REQUEST_PERSONAL_MESSAGE_SIGNATURE, message.payload).send().then(res => {
            this.respond(message, res);
        });
    }
}

new Content();
