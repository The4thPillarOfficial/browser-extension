import Settings from './Settings';
import Vault from 'mm-vault';

export default class Wallet {

    constructor(store) {
        this.settings = new Settings();
        this.vault = new Vault({
            initState: store.vault
        });
        this.defaultAccount = null;
    }
}
