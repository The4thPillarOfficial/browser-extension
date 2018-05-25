import ZeroClientProvider from 'web3-provider-engine/zero';
import createProvider from 'eth-json-rpc-infura/src/createProvider';
import ProviderSubprovider from 'web3-provider-engine/subproviders/provider';
import NetworkTypes from '../utils/NetworkTypes';
import config from '../../manifest.json';

export default class EthService {

    constructor(opts) {
        this.defaultAccount = opts.defaultAccount;
        this.defaultNetwork = opts.defaultNetwork;

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

        // TODO:: Implement personal signing
    }
}