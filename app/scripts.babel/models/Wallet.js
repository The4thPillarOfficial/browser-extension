import Settings from './Settings';
import Vault from 'mm-vault';
import axios from 'axios';
import Helper from '../utils/Helper';
import NodeRSA from 'node-rsa';

export default class Wallet {

    constructor(store) {
        this.settings = new Settings(store ? store.settings : {});
        this.vault = new Vault({
            initState: store && store.vault.store._state ? store.vault.store._state : {},
        });
        this.defaultAccount = store && store.defaultAccount ? store.defaultAccount : null;
        this.rsaPrivateKey = store && store.rsaPrivateKey ? store.rsaPrivateKey : null;
        this.isPublicKeySavedOnPlatform = store && store.isPublicKeySavedOnPlatform ? store.isPublicKeySavedOnPlatform : false;
    }

    /**
     * Method try to unlock vault with received password
     *
     * @param password
     * @returns {Promise<any>}
     */
    unlock(password) {
        return new Promise((resolve, reject) => {
            this.vault.unlock(password).then(() => {
                this.vault.persistAllKeyrings().then(() => {
                    resolve();
                });
            });
        });
    }

    /**
     * Method lock vault
     *
     * @returns {Promise<any>}
     */
    lock() {
        return new Promise((resolve, reject) => {
            this.vault.lock().then(() => {
                resolve();
            });
        });
    }

    /**
     * Method generate 2048 bits RSA key
     */
    generateRsaKeyPair() {
        const key = new NodeRSA({b: 2048});
        this.rsaPrivateKey = key.exportKey('private');
    }

    /**
     * Method send public key to platform where it will be saved
     */
    sendPublicKeyToPlatform() {
        return new Promise(async (resolve, reject) => {
            if (this.rsaPrivateKey) {
                const key = new NodeRSA(this.rsaPrivateKey);
                const publicKey = key.exportKey('public');
                const signature = await this.vault.signPersonalMessage({
                    data: publicKey,
                    from: this.defaultAccount
                });

                axios.post(Helper.PLATFORM_BASE_URL + '/extension/sendPublicKey', {
                    wallet: this.defaultAccount,
                    publicKey: publicKey,
                    signature: signature,

                }).then(response => {
                    if (response.data.success === true) {
                        this.isPublicKeySavedOnPlatform = true;
                        resolve();
                    }
                }).catch(error => {
                    reject(error);
                });
            } else {

                // TODO:: create logic if user restore account; export/import RSA keys...
                resolve();
            }
        });
    }
}
