import NetworkMessageService from '../services/NetworkMessageService';
import EthService from '../services/EthService';
import * as NetworkMessageTypes from '../messages/NetworkMessageTypes';

let stream = null;
let opts = null;

export default class InpageProvider {

    constructor(_stream, _opts) {
        stream = _stream;
        opts = _opts;

        if (stream) {
            NetworkMessageService.subscribe(stream);
        }

        // Set eth provider
        const ethService = new EthService(stream, opts);
        this.eth = ethService.getProvider();
    }

    /**
     * Handle sendAsync requests via asyncProvider
     *
     * @param payload
     * @param cb
     */
    sendAsync(payload, cb) {
        this.eth.sendAsync(payload, cb);
    }

    /**
     * Handle send request
     *
     * @param payload
     * @returns {{id, jsonrpc: *|string, result: *}}
     */
    send(payload) {
        let result = null;

        switch (payload.method) {
            case 'eth_accounts':
                result = opts.defaultAccount ? [opts.defaultAccount] : [];
                break;

            case 'eth_coinbase':
                result = opts.defaultAccount || null;
                break;

            case 'eth_uninstallFilter':
                this.sendAsync(payload, () => {});
                break;

            case 'net_version':
                result = opts.defaultNetwork || null;
                break;

            default:
                throw new Error('The4thPillar browser extension Web3 object does not support synchronous methods like ' + payload.method + ' without a callback parameter.');
        }

        return {
            id: payload.id,
            jsonrpc: payload.jsonrpc,
            result: result
        };
    }

    /**
     * Handle isConnected call
     *
     * @returns {boolean}
     */
    isConnected() {
        return true;
    }

    /**
     * Handle personal sign where data is array
     *
     * @param data
     * @param from
     * @returns {Promise<any>}
     */
    personalSignArray(data, from) {
        return new Promise((resolve, reject) => {
            const payload = {
                from: from,
                data: data,
            };

            EthService.newUnsignedPersonalMessageArray(payload, (err, signature) => {
                if (err) reject(err);
                resolve(signature);
            });
        });
    }

    /**
     * Handle file download from platform
     *
     * @param url
     */
    downloadFile(url) {
        return new Promise((resolve, reject) => {
            if (!url) {
                return reject(new Error('The4thPillar browser extension document download: url is required.'))
            }

            NetworkMessageService.send(stream, NetworkMessageTypes.REQUEST_FILE_DOWNLOAD, url).then(res => {
                resolve(res);
            });
        });
    }
}
