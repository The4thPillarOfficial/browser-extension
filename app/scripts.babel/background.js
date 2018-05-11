import {LocalStream} from 'extension-streams';
import * as InternalMessageTypes from './messages/InternalMessageTypes';
import StorageService from './services/StorageService';

export default class Background {

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
}

const background = new Background();
