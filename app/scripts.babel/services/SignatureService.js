import Wallet from '../models/Wallet';
import NotificationService from './NotificationService';
import Prompt from '../models/prompts/Prompt';
import * as PromptTypes from '../models/prompts/PromptTypes'

export default class SignatureService {

    /**
     * Method triggers opening popup for approving personal message signing and then sign those data or return error
     *
     * @param wallet
     * @param payload
     * @param sendResponse
     */
    static signPersonalMessage(wallet, payload, sendResponse) {
        const walletObj = new Wallet(wallet);

        // Unlock vault if we have password
        let password = wallet ? wallet.vault.password : false;
        if (password) {
            walletObj.unlock(password).then(() => {

                // Open prompt popup
                NotificationService.open(new Prompt(PromptTypes.REQUEST_PERSONAL_MESSAGE_SIGNATURE, payload, approval => {

                    // Check if user not accepted signing
                    if (!approval || !approval.hasOwnProperty('accepted')) {
                        sendResponse(new Error('User denied message signature.'));
                        return false;
                    }

                    // Sign personal message
                    walletObj.vault.signPersonalMessage(payload).then(res => {
                        sendResponse(res);
                    });
                }));
            });
        }
    }

    /**
     * Method triggers opening popup for approving personal message signing and then sign those data or return error
     *
     * @param wallet
     * @param payload
     * @param sendResponse
     */
    static signPersonalMessageArray(wallet, payload, sendResponse) {
        const walletObj = new Wallet(wallet);

        // Unlock vault if we have password
        let password = wallet ? wallet.vault.password : false;
        if (password) {
            walletObj.unlock(password).then(() => {

                const customPayload = {
                    from: payload.from,
                    data: payload.data[0],
                };

                // Open prompt popup
                NotificationService.open(new Prompt(PromptTypes.REQUEST_PERSONAL_MESSAGE_SIGNATURE, customPayload, approval => {

                    // Check if user not accepted signing
                    if (!approval || !approval.hasOwnProperty('accepted')) {
                        sendResponse(new Error('User denied message signature.'));
                        return false;
                    }

                    let response = [];
                    const data = payload.data;
                    for (let i = 0; i < data.length; i++) {

                        let singlePayload = {
                            from: payload.from,
                            data: data[i],
                        };

                        // Sign personal message
                        walletObj.vault.signPersonalMessage(singlePayload).then(res => {
                            response.push(res);

                            if (i === data.length - 1) {
                                sendResponse(response);
                            }
                        });
                    }
                }));
            });
        }
    }
}
