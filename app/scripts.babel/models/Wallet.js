import Settings from './Settings';
import Vault from 'mm-vault';

export default class Wallet {

    constructor(store) {
        this.settings = new Settings(store ? store.settings : {});
        this.vault = new Vault({
            initState: store ? store.vault.store._state : {},
        });
        this.defaultAccount = store ? store.defaultAccount : null;
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
}
