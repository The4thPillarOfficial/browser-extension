import {LocalStream} from 'extension-streams';
import * as InternalMessageTypes from './messages/InternalMessageTypes';
import StorageService from './services/StorageService';
import SignatureService from './services/SignatureService';

let prompt = null;

class Background {

    constructor() {
        this.setupInternalMessaging();
    }

    /**
     * Watches for messages over extension streams
     */
    setupInternalMessaging() {
        LocalStream.watch((request, sendResponse) => {
            Background.processMessage(request, sendResponse);
        });
    }

    /**
     * Method delegate message to responsible method
     *
     * @param message
     * @param sendResponse
     */
    static processMessage(message, sendResponse) {
        switch (message.type) {
            case InternalMessageTypes.UPDATE_WALLET:
                Background.updateWallet(message.payload, sendResponse);
                break;

            case InternalMessageTypes.LOAD_WALLET:
                Background.loadWallet(sendResponse);
                break;

            case InternalMessageTypes.GET_DEFAULT_ACCOUNT:
                Background.getDefaultAccount(sendResponse);
                break;

            case InternalMessageTypes.GET_DEFAULT_NETWORK:
                Background.getDefaultNetwork(sendResponse);
                break;

            case InternalMessageTypes.REQUEST_PERSONAL_MESSAGE_SIGNATURE:
                Background.requestPersonalMessageSignature(message.payload, sendResponse);
                break;

            case InternalMessageTypes.REQUEST_PERSONAL_MESSAGE_SIGNATURE_ARRAY:
                Background.requestPersonalMessageSignatureArray(message.payload, sendResponse);
                break;

            case InternalMessageTypes.SET_PROMPT:
                Background.setPrompt(message.payload, sendResponse);
                break;

            case InternalMessageTypes.GET_PROMPT:
                Background.getPrompt(sendResponse);
                break;
        }
    }

    /**
     * Update the wallet instance in local storage
     *
     * @param wallet
     * @param sendResponse
     */
    static updateWallet(wallet, sendResponse) {
        StorageService.saveWallet(wallet).then(saved => {
            sendResponse(saved);
        });
    }

    /**
     * Return the saved instance of wallet from local storage
     *
     * @param sendResponse
     */
    static loadWallet(sendResponse) {
        StorageService.getWallet().then(wallet => {
            sendResponse(wallet);
        });
    }

    /**
     * Return default account from saved wallet
     *
     * @param sendResponse
     */
    static getDefaultAccount(sendResponse) {
        Background.loadWallet(wallet => {
            if (wallet && wallet.vault.password) {
                sendResponse(wallet.defaultAccount);
            }
            sendResponse(null);
        });
    }

    /**
     * Return default network from saved wallet
     *
     * @param sendResponse
     */
    static getDefaultNetwork(sendResponse) {
        Background.loadWallet(wallet => {
            if (wallet) {
                sendResponse(wallet.settings.defaultNetwork);
            }
        });
    }

    /**
     * Return signed personal message
     *
     * @param payload
     * @param sendResponse
     */
    static requestPersonalMessageSignature(payload, sendResponse) {
        Background.loadWallet(wallet => {
            SignatureService.signPersonalMessage(wallet, payload, sendResponse);
        });
    }

    /**
     * Return signed personal message array
     *
     * @param payload
     * @param sendResponse
     */
    static requestPersonalMessageSignatureArray(payload, sendResponse) {
        Background.loadWallet(wallet => {
            SignatureService.signPersonalMessageArray(wallet, payload, sendResponse);
        });
    }

    /**
     * Set Prompt
     *
     * @param payload
     * @param sendResponse
     */
    static setPrompt(payload, sendResponse) {
        prompt = payload;
        sendResponse(true);
    }

    /**
     * Return prompt
     *
     * @param sendResponse
     */
    static getPrompt(sendResponse) {
        sendResponse(prompt);
    }
}

new Background();
