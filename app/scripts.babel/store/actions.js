import * as Actions from './constants';
import Wallet from '../models/Wallet';
import Account from '../models/Account';

let actions = {
    [Actions.PUSH_ERROR]: ({commit}, error) => commit(Actions.PUSH_ERROR, error),
    [Actions.CLEAR_ERRORS]: ({commit}) => commit(Actions.CLEAR_ERRORS),

    [Actions.CREATE_NEW_WALLET]: ({state, dispatch}, password) => {
        return new Promise(async (resolve, reject) => {

            // Create wallet
            const wallet = new Wallet(state.wallet);
            await wallet.vault.create(password).then(() => {

                // Save to store
                dispatch(Actions.SET_WALLET, wallet).then(() => {
                    dispatch(Actions.SET_SEED_WORDS).then(() => {
                        resolve();
                    });
                });
            }).catch((error) => {
                dispatch(Actions.PUSH_ERROR, error.message);
            });
        });
    },

    [Actions.SET_WALLET]: ({commit}, wallet) => {
        return new Promise(async (resolve, reject) => {

            // Set default account
            let accounts = await wallet.vault.getAccounts();
            wallet.defaultAccount = accounts[0];

            commit(Actions.SET_WALLET, wallet);
            resolve();
        });
    },

    [Actions.SET_SEED_WORDS]: ({state, commit}) => {
        return new Promise(async (resolve, reject) => {

            let primaryKeyring = state.wallet.vault.getKeyringsByType('HD Key Tree')[0];

            if (!primaryKeyring) {
                reject(new Error('No HD Key Tree found.'));
            }

            // Get seed words
            const serialized = await primaryKeyring.serialize();
            const seedWords = serialized.mnemonic;

            // Get accounts
            const accounts = await primaryKeyring.getAccounts();

            if (accounts.length < 1) {
                reject(new Error('No accounts found.'));
            }

            // Check if seed words correctly restore accounts
            await Account.verifyAccounts(accounts, seedWords).then(() => {
                // Save to store
                commit(Actions.SET_SEED_WORDS, seedWords);
                resolve();
            }).catch((error) => {
                console.error(error);
            });
        });
    },

    [Actions.RESTORE_WALLET]: ({state, dispatch}, {seedWords, password}) => {
        return new Promise(async (resolve, reject) => {

            // Restore wallet
            const wallet = new Wallet(state.wallet);
            await wallet.vault.createNewVaultAndRestore(password, seedWords).then(() => {
                dispatch(Actions.SET_WALLET, wallet).then(() => {
                    resolve();
                });
            }).catch((error) => {
                dispatch(Actions.PUSH_ERROR, error.message);
            });
        });
    },
};

export default actions;
