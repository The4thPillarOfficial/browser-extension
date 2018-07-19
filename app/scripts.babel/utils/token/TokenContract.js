import Eth from 'ethjs';
import ether from '../../utils/ether';
import {ABI, address} from './ABI/four';
import store from '../../store';
import Helper from '../Helper';
import axios from 'axios';

export default class TokenContract {

    constructor() {

    }

    /**
     * Method return token contract
     *
     * @param web3
     * @returns {Promise<any>}
     */
    static getTokenContract(web3) {
        return new Promise((resolve, reject) => {

            if (typeof web3 !== 'undefined') {
                let tokenContract = web3.eth.contract(ABI).at(address);

                resolve(tokenContract);
            }
        });
    }

    /**
     * Method return number of FOUR tokens for a given ETH
     *
     * @param eth
     * @returns {number}
     */
    static getTokensFromEther(eth) {
        // TODO:: get conversion from ETH/FOUR when token arrive on market

        // Assume that ETH price is 400€
        let euroEth = 400;

        // Assume that FOUR price is 0.1€
        let euroFour = 0.1;

        return (euroEth / euroFour) * eth;
    };

    /**
     * Method return gas price in wei
     *
     * @returns string
     */
    static getGasPrice() {
        return store.getters.web3.toWei(2, 'gwei');
    };

    /**
     * Method return gas Limit
     *
     * @returns {number}
     */
    static getGasLimit() {
        return 600000;
    };

    /**
     * Method return estimated gas units for transaction
     *
     * @param transfers
     * @returns {number}
     */
    static estimateGasUnits(transfers) {

        // Gas units for feeTaker transfer + to (2 * transfer)
        let gasUnits = 95000;

        // For each subsequent transfer add 21k units of gas
        gasUnits += (30000 * (transfers - 1));

        return gasUnits;
    };

    /**
     * Method return estimated transaction fee in FOUR tokens
     *
     * @param to
     * @returns {number}
     */
    static estimateTransactionFee(to) {

        let transfers = 1;

        if (Array.isArray(to)) {
            transfers = to.length;
        }

        // Estimate Gas Units
        let gasUnits = TokenContract.estimateGasUnits(transfers);

        // Calculate transaction fee in ETH
        let txCostEth = store.getters.web3.fromWei(gasUnits * TokenContract.getGasPrice(), 'ether');

        // Return FOUR fee * 2
        return TokenContract.getTokensFromEther(txCostEth) * 2;
    };

    /**
     * Method return calculated hash
     *
     * @param from
     * @param to
     * @param value
     * @param fee
     * @param nonce
     * @returns {Promise<any>}
     */
    static calculateHash(from, to, value, fee, nonce) {
        return new Promise((resolve, reject) => {
            store.getters.token.instance().calculateHash(from, to, value, fee, nonce, (err, calculatedHash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(calculatedHash);
                }
            });

        });
    };

    /**
     * Method check if signature is valid
     *
     * @param from
     * @param calculatedHash
     * @param v
     * @param r
     * @param s
     * @returns {Promise<any>}
     */
    static isValidSignature(from, calculatedHash, v, r, s) {
        return new Promise((resolve, reject) => {
            store.getters.token.instance().isValidSignature(from, calculatedHash, v, r, s, (err, isValid) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(isValid);
                }
            });

        });
    };

    /**
     * Method send raw transaction
     *
     * @param from
     * @param to
     * @param value
     * @param fee
     * @param nonce
     * @param v
     * @param r
     * @param s
     * @returns {Promise<any>}
     */
    static transferPreSigned(from, to, value, fee, nonce, v, r, s) {
        return new Promise((resolve, reject) => {
            const web3 = store.getters.web3;

            // Get transaction data
            let contractData = store.getters.token.instance().transferPreSigned.getData(from, to, value, fee, nonce, v, r, s, {from: Helper.FEE_TAKER_ADDRESS});

            // Get nonce
            web3.eth.getTransactionCount(Helper.FEE_TAKER_ADDRESS, function(err, nonce) {

                // Prepare transaction parameters
                const txParams = {
                    nonce: web3.toHex(nonce),
                    gasPrice: web3.toHex(TokenContract.getGasPrice()),
                    gasLimit: web3.toHex(TokenContract.getGasLimit()),
                    to: store.getters.token.instance().address,
                    data: contractData,
                    chainId: store.getters.defaultNetwork
                };

                // Create AJAX request to sign transaction on server side
                axios.post(Helper.PLATFORM_BASE_URL + '/transaction/sign', {
                    txParams: txParams
                }).then(function (response) {
                    // Send raw transaction
                    web3.eth.sendRawTransaction('0x' + response.data.signedTx, (err, hash) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(hash);
                        }
                    });
                }).catch(function(error) {
                    console.error(error);
                });
            });
        });
    };

    /**
     * Method prepare data for pre-signed transaction
     *
     * @param from
     * @param to
     * @param value
     * @param fee
     * @returns {Promise<*>}
     */
    static async sendPreSignedTransaction(from, to, value, fee) {
        let eth = new Eth(store.getters.web3.currentProvider);
        let nonce = Date.now();

        // Convert to wei
        value = ether(value);
        fee = ether(fee);

        // Calculate hash
        let hash = await TokenContract.calculateHash(from, to, value, fee, nonce);

        // Sign hash
        //let signature = await eth.personal_sign(hash, from);
        let signature = await store.getters.wallet.vault.signPersonalMessage({data: hash, from: from});

        // Get r, s, v values
        let r = signature.substr(0, 66);
        let s = '0x' + signature.substr(66, 64);
        let v = parseInt('0x' + signature.substr(130, 2));

        // Check if signature is valid
        let isValid = await TokenContract.isValidSignature(from, hash, v, r, s);

        // Send transaction if signature is valid
        if (isValid) {
            return await TokenContract.transferPreSigned(from, to, value, fee, nonce, v, r, s);
        }

        return false;
    };
}
