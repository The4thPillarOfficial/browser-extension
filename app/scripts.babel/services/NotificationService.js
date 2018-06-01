import InternalMessage from '../messages/InternalMessage';
import * as InternalMessageTypes from '../messages/InternalMessageTypes';

let openWindow = null;

export default class NotificationService {

    /**
     * Method open prompt popup
     *
     * @param prompt
     * @returns {Promise<void>}
     */
    static async open(prompt) {

        // Close opened window
        if (openWindow) {
            openWindow.close();
            openWindow = null;
        }

        // Set prompt over background script
        InternalMessage.payload(InternalMessageTypes.SET_PROMPT, JSON.stringify(prompt)).send();

        // Get popup
        let popup = await NotificationService.getPopup(prompt);

        // Handle if user close popup without any action
        popup.onbeforeunload = () => {
            prompt.responder(new Error('The user closed the prompt without any action.'));

            openWindow = null;
            return undefined;
        };
    }

    /**
     * Method return prompt popup
     *
     * @param data
     * @returns {Promise<*>}
     */
    static async getPopup(data) {

        // Window size
        const height = 500;
        const width = 350;

        // Calculate window middle points
        let middleX = window.screen.availWidth / 2 - (width / 2);
        let middleY = window.screen.availHeight / 2 - (height / 2);

        try {
            const url = chrome.runtime.getURL('prompt.html');

            const win = window.open(url, 'The4thPillarPrompt', `width=${width},height=${height},resizable=0,top=${middleY},left=${middleX},titlebar=0`);
            win.data = data;
            openWindow = win;

            return win;

        } catch (e) {
            console.error('Notification error: ', e);
            return null;
        }
    }

    /**
     * Method close prompt popup
     */
    static close() {
        window.onbeforeunload = () => {};
        window.close();
    }
}
