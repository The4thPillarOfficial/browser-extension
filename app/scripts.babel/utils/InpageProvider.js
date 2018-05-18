import NetworkMessageService from '../services/NetworkMessageService';

let stream = null;

export default class InpageProvider {

    constructor(_stream) {
        stream = _stream;

        NetworkMessageService.subscribe(stream);
    }

    /**
     * Handle sendAsync requests via asyncProvider
     *
     * @param payload
     * @param cb
     */
    sendAsync(payload, cb) {
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
                break;

            case 'eth_coinbase':
                break;

            case 'eth_uninstallFilter':
                break;

            case 'net_version':
                break;

            default:
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
}
