import * as Actions from './constants';
import Wallet from '../models/Wallet';
import Account from '../models/Account';
import InternalMessage from '../messages/InternalMessage';
import * as InternalMessageTypes from '../messages/InternalMessageTypes';

let actions = {
    [Actions.PUSH_ERROR]: ({commit}, error) => commit(Actions.PUSH_ERROR, error),
    [Actions.CLEAR_ERRORS]: ({commit}) => commit(Actions.CLEAR_ERRORS),

    [Actions.CREATE_NEW_WALLET]: ({state, dispatch}, password) => {
        return new Promise(async (resolve, reject) => {

            // Create wallet
            const wallet = new Wallet(state.wallet);
            await wallet.vault.create(password).then(() => {

                // Save to store
                dispatch(Actions.SET_WALLET, {wallet: wallet}).then(() => {
                    dispatch(Actions.SET_SEED_WORDS).then(() => {
                        resolve();
                    });
                });
            }).catch((error) => {
                dispatch(Actions.PUSH_ERROR, error.message);
            });
        });
    },

    [Actions.SET_WALLET]: ({commit}, {wallet, updateInLocalStorage}) => {
        return new Promise(async (resolve, reject) => {

            // Set default account
            let accounts = await wallet.vault.getAccounts();
            wallet.defaultAccount = accounts[0];

            // When we load wallet from local storage, we don't need to update this local storage again
            if (updateInLocalStorage !== false) {
                await InternalMessage.payload(InternalMessageTypes.UPDATE_WALLET, wallet).send();
            }

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
            await wallet.vault.restore(password, seedWords).then(() => {
                dispatch(Actions.SET_WALLET, {wallet: wallet}).then(() => {
                    resolve();
                });
            }).catch((error) => {
                dispatch(Actions.PUSH_ERROR, error.message);
            });
        });
    },

    [Actions.LOAD_WALLET]: ({dispatch}) => {
        return new Promise((resolve, reject) => {
            InternalMessage.payload(InternalMessageTypes.LOAD_WALLET).send().then(wallet => {
                dispatch(Actions.SET_WALLET, {
                    wallet: new Wallet(wallet),
                    updateInLocalStorage: false
                }).then(() => {
                    resolve();
                });
            });
        });
    },

    [Actions.UNLOCK_WALLET]: ({state, dispatch}, password) => {
        return new Promise((resolve, reject) => {

            state.wallet.vault.unlock(password).then(() => {
                state.wallet.vault.persistAllKeyrings().then(() => {
                    dispatch(Actions.SET_WALLET, {
                        wallet: state.wallet,
                        updateInLocalStorage: false
                    }).then(() => {
                        resolve();
                    });
                });
            }).catch((error) => {
                dispatch(Actions.PUSH_ERROR, error.message);
            });
        });
    },
};

export default actions;
