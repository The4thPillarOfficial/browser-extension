import {LocalStream} from 'extension-streams';
import * as InternalMessageTypes from './messages/InternalMessageTypes';
import StorageService from './services/StorageService';

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
            sendResponse(wallet.defaultAccount);
        });
    }

    /**
     * Return default network from saved wallet
     *
     * @param sendResponse
     */
    static getDefaultNetwork(sendResponse) {
        Background.loadWallet(wallet => {
            sendResponse(wallet.settings.defaultNetwork);
        });
    }
}

new Background();
