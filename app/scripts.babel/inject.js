import Web3 from 'web3';
import {EncryptedStream} from 'extension-streams';
import * as PairingTags from './messages/PairingTags'
import randomString from 'random-string';
import InpageProvider from './utils/InpageProvider';
import * as NetworkMessageTypes from './messages/NetworkMessageTypes';

class Inject {

    constructor() {
        const stream = new EncryptedStream(PairingTags.INJECTED, randomString({length: 64}));

        stream.listenWith(msg => {

            // Export global web3
            if (msg && msg.hasOwnProperty('type') && msg.type === NetworkMessageTypes.PUSH_THE4THPILLAR) {

                const web3 = new Web3(new InpageProvider(stream, msg.payload));

                web3.setProvider = function () {
                    console.log('The4thPillar browser extension - overrode web3.setProvider');
                };

                // Set default account
                web3.eth.defaultAccount = msg.payload.defaultAccount;

                global.web3 = new Proxy(web3, {
                    get: (_web3, key) => {
                        return _web3[key];
                    },
                    set: (_web3, key, value) => {
                        _web3[key] = value;
                    },
                });
            }
        });

        // Syncing the streams between the extension and website
        stream.sync(PairingTags.THE4THPILLAR, stream.key);
    }
}

new Inject();
