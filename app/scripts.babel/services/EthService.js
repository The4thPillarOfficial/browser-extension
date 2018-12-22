import ZeroClientProvider from 'web3-provider-engine/zero';
import createProvider from 'eth-json-rpc-infura/src/createProvider';
import ProviderSubprovider from 'web3-provider-engine/subproviders/provider';
import * as NetworkMessageTypes from '../messages/NetworkMessageTypes'
import NetworkMessageService from './NetworkMessageService';
import NetworkTypes from '../utils/NetworkTypes';
import InternalMessage from '../messages/InternalMessage';
import * as InternalMessageTypes from '../messages/InternalMessageTypes';
import config from '../../manifest.json';

let stream = null;

export default class EthService {

    constructor(_stream, _opts) {
        this.defaultAccount = _opts.defaultAccount;
        this.defaultNetwork = _opts.defaultNetwork;

        stream = _stream;

        this.setProvider();
    }

    setProvider() {
        this.provider = ZeroClientProvider(this.getProviderOpts());
    }

    getProvider() {
        return this.provider;
    }

    getProviderOpts() {
        const infuraProvider = createProvider({network: NetworkTypes.NETWORKS[this.defaultNetwork]});
        const infuraSubProvider = new ProviderSubprovider(infuraProvider);

        return {
            static: {
                eth_syncing: false,
                web3_clientVersion: 'The4thPillar/v/' + config.version,
            },
            getAccounts: (cb) => {
                let result = [];

                let defaultAccount = this.defaultAccount;

                // TODO:: Check if vault is unlocked
                if (defaultAccount) {
                    result.push(defaultAccount);
                }

                cb(null, result);
            },
            processPersonalMessage: EthService.newUnsignedPersonalMessage.bind(this),
            engineParams: {
                pollingInterval: 8000,
                blockTrackerProvider: infuraProvider,
            },
            dataSubprovider: infuraSubProvider
        };
    }

    static newUnsignedPersonalMessage(msgParams, cb) {

        if (!msgParams.from) {
            return cb(new Error('The4thPillar browser extension Message Signature: from field is required.'))
        }

        if (stream) {
            NetworkMessageService.send(stream, NetworkMessageTypes.REQUEST_PERSONAL_MESSAGE_SIGNATURE, msgParams).then(res => {
                cb(null, res);
            });
        } else {
            InternalMessage.payload(InternalMessageTypes.REQUEST_PERSONAL_MESSAGE_SIGNATURE, msgParams).send().then(res => {
                cb(null, res);
            });
        }
    }

    static newUnsignedPersonalMessageArray(msgParams, cb) {
        if (!msgParams.from) {
            return cb(new Error('The4thPillar browser extension Message Signature: from field is required.'))
        }

        if (!Array.isArray(msgParams.data)) {
            return cb(new Error('The4thPillar browser extension Message Signature: data field must be array.'))
        }

        NetworkMessageService.send(stream, NetworkMessageTypes.REQUEST_PERSONAL_MESSAGE_SIGNATURE_ARRAY, msgParams).then(res => {
            cb(null, res);
        });
    }
}
