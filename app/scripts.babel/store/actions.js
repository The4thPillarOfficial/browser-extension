import * as Actions from './constants';
import Wallet from '../models/Wallet';
import Account from '../models/Account';
import InternalMessage from '../messages/InternalMessage';
import * as InternalMessageTypes from '../messages/InternalMessageTypes';
import Web3 from 'web3';
import store from '../store';
import InpageProvider from '../utils/InpageProvider';
import TokenContract from '../utils/token/TokenContract';
import DocumentContract from '../utils/document/DocumentContract';

let actions = {
    [Actions.PUSH_ERROR]: ({commit}, error) => commit(Actions.PUSH_ERROR, error),
    [Actions.CLEAR_ERRORS]: ({commit}) => commit(Actions.CLEAR_ERRORS),

    [Actions.CREATE_NEW_WALLET]: ({state, dispatch}, password) => {
        return new Promise(async (resolve, reject) => {

            // Create wallet
            const wallet = new Wallet(state.wallet);
            wallet.vault.create(password).then((result) => {
                // Generate RSA key
                dispatch(Actions.GENERATE_RSA_KEY_PAIR, wallet).then((wallet) => {
                    // Save to store
                    dispatch(Actions.SET_WALLET, {wallet: wallet}).then(() => {
                        dispatch(Actions.SET_SEED_WORDS).then(() => {
                            dispatch(Actions.SET_WEB3_PROVIDER).then(() => {
                                resolve();
                            });
                        });
                    });
                });
            }).catch((error) => {
                dispatch(Actions.PUSH_ERROR, error.message);
            });
        });
    },

    [Actions.SET_WALLET]: ({commit, dispatch}, {wallet, updateInLocalStorage}) => {
        return new Promise(async (resolve, reject) => {

            // Set default account
            const accounts = await wallet.vault.getAccounts();

            if (accounts.length) {
                wallet.defaultAccount = accounts[0];
                updateInLocalStorage = true;
            }

            // Send public key to platform
            if (!wallet.isPublicKeySavedOnPlatform && wallet.vault.memStore.getState().isUnlocked) {
                await wallet.sendPublicKeyToPlatform();
                updateInLocalStorage = true;
            }

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
                    dispatch(Actions.SET_WEB3_PROVIDER).then(() => {
                        resolve();
                    });
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

                    // Unlock if we have password
                    let password = wallet ? wallet.vault.password : false;

                    if (password) {
                        dispatch(Actions.UNLOCK_WALLET, password).then(() => {
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                });
            });
        });
    },

    [Actions.UNLOCK_WALLET]: ({state, dispatch}, password) => {
        return new Promise((resolve, reject) => {

            state.wallet.vault.unlock(password).then((res) => {
                dispatch(Actions.SET_WALLET, {
                    wallet: state.wallet,
                    updateInLocalStorage: false
                }).then(() => {
                    dispatch(Actions.SET_WEB3_PROVIDER).then(() => {
                        resolve();
                    });
                });
            }).catch((error) => {
                dispatch(Actions.PUSH_ERROR, error.message);
            });
        });
    },

    [Actions.PUSH_PROMPT]: ({state, commit}, prompt) => {
        return new Promise((resolve, reject) => {
            if (state.prompt) {
                state.prompt.responder(null);
            }
            commit(Actions.PUSH_PROMPT, prompt);
            resolve();
        });
    },

    [Actions.SET_WEB3_PROVIDER]: ({state, commit, dispatch}) => {
        return new Promise((resolve, reject) => {

            let defaultAccount = store.getters.defaultAccount;
            let defaultNetwork = store.getters.defaultNetwork;

            let web3 = new Web3(new InpageProvider(null, {defaultAccount, defaultNetwork}));

            // Set default account
            web3.eth.defaultAccount = defaultAccount;

            commit(Actions.SET_WEB3_PROVIDER, web3);

            dispatch(Actions.SET_TOKEN).then(() => {
                dispatch(Actions.SET_DOCUMENT).then(() => {
                    resolve();
                });
            });
        });
    },

    [Actions.SET_TOKEN]: ({state, commit}) => {
        return new Promise(async (resolve, reject) => {

            const token = await TokenContract.getTokenContract(state.web3);

            let tokenValues = {};
            tokenValues.instance = () => token;

            // Store token decimals
            token.decimals((err, decimals) => {
                if (!err) {
                    tokenValues.decimals = parseInt(decimals, 10);

                    // Divisor
                    let divisor = new state.web3.BigNumber(10).toPower(tokenValues.decimals);

                    // Set the account holder balance
                    token.balanceOf(state.wallet.defaultAccount, (err, balance) => {
                        if (!err) {
                            tokenValues.accountBalance = balance.div(divisor).toString();

                            // Store token symbol
                            token.symbol((err, symbol) => {
                                if (!err) {
                                    tokenValues.symbol = symbol.toString();
                                        commit(Actions.SET_TOKEN, tokenValues);
                                        resolve();
                                }
                            });
                        }
                    });
                }
            });
        });
    },

    [Actions.SET_DOCUMENT]: ({state, commit}) => {
        return new Promise(async (resolve, reject) => {

            const contract = await DocumentContract.getDocumentContract(state.web3);
            const document = new DocumentContract(contract);

            let documentValues = {};
            documentValues.instance = document;

            document.getDocumentsInRange(state.wallet.defaultAccount, 0).then(documents => {
                documentValues.documents = documents.reverse();

                commit(Actions.SET_DOCUMENT, documentValues);
                resolve();
            });
        });
    },

    [Actions.GENERATE_RSA_KEY_PAIR]: ({state, commit}, wallet) => {
        return new Promise((resolve, reject) => {
            wallet.generateRsaKeyPair();
            resolve(wallet);
        });
    },
};

export default actions;
