import Settings from './Settings';
import Vault from 'mm-vault';

export default class Wallet {

    constructor(store) {
        this.settings = new Settings(store.settings);
        this.vault = new Vault({
            initState: store.vault.store._state,
        });
        this.defaultAccount = store.defaultAccount ? store.defaultAccount : null;
    }
}
