import Vault from 'mm-vault';
import NodeRSA from 'node-rsa';
import * as Actions from '../store/constants';

export default class Account {
    constructor() {}

    /**
     * Method checks if seed words restore identical accounts to original
     *
     * @param createdAccounts
     * @param seedWords
     * @returns {Promise<any>}
     */
    static verifyAccounts(createdAccounts, seedWords) {
        return new Promise((resolve, reject) => {

            // Check if createdAccounts is defined
            if (!createdAccounts || createdAccounts.length < 1) {
                reject(new Error('Created accounts is not defined.'));
            }

            // Restore accounts
            const vault = new Vault({});
            const Keyring = vault.getKeyringClassForType('HD Key Tree');
            const keyring = new Keyring({
                mnemonic: seedWords,
                numberOfAccounts: createdAccounts.length,
            });

            keyring.getAccounts().then((restoredAccounts) => {

                // Check if created and restored accounts are the same length
                if (createdAccounts.length !== restoredAccounts.length) {
                    reject(new Error('Created and restored accounts are not the same length.'));
                }

                // Check if restored accounts are identical to original
                for (let i = 0; i < createdAccounts.length; i++) {
                    if (createdAccounts[i].toLowerCase() !== restoredAccounts[i].toLowerCase()) {
                        reject(new Error('Accounts are not identical. Original: ' + createdAccounts[i] + ' Restored: ' + restoredAccounts[i]));
                    }
                }

                resolve();
            });
        });
    }

    /**
     * Method checks if seed words are valid
     *
     * @param seedWords
     * @param context
     * @returns {boolean}
     */
    static isValidSeedWords(seedWords, context) {

        // Check for seed words length
        if (seedWords.split(' ').length !== 12) {
            context[Actions.PUSH_ERROR]('Seed words must be 12 words long.');
            return false;
        }

        return true;
    }

    /**
     * Method checks if RSA private key is valid
     *
     * @param rsaPrivateKey
     * @param context
     * @returns {boolean}
     */
    static isValidRsaPrivateKey(rsaPrivateKey, context) {
        try {
            const key = new NodeRSA(rsaPrivateKey);

            if (!key && key.getKeySize() !== 2048) {
                context[Actions.PUSH_ERROR]('RSA private key is not valid.');
                return false;
            }
            return true;

        } catch (error) {
            context[Actions.PUSH_ERROR]('RSA private key is not valid.');
        }
    }
}
