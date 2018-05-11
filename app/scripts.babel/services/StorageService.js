export default class StorageService {
    constructor() {
    }

    static saveWallet(wallet) {
        return new Promise(resolve => {
            chrome.storage.local.set({'wallet': wallet}, () => {
                resolve(wallet);
            });
        });
    }

    static getWallet() {
        return new Promise(resolve => {
            chrome.storage.local.get('wallet', (obj) => {
                resolve(obj.wallet);
            });
        });
    }
}
