import NetworkMessage from '../messages/NetworkMessage';
import * as PairingTags from '../messages/PairingTags'
import randomString from 'random-string';

let resolvers = [];

/**
 * Helper class to manage resolving fake-async requests using browser messaging
 */
class DanglingResolver {
    constructor(_id, _resolve, _reject) {
        this.id = _id;
        this.resolve = _resolve;
        this.reject = _reject;
    }
}

export default class NetworkMessageService {

    constructor() {

    }

    /**
     * Method catches all incoming messages and dispenses them to open promises
     *
     * @param stream
     */
    static subscribe(stream) {
        stream.listenWith(msg => {
            if (!msg || !msg.hasOwnProperty('type')) return false;

            for (let i = 0; i < resolvers.length; i++) {
                if (resolvers[i].id === msg.resolver) {
                    if (msg.type === 'error') {
                        resolvers[i].reject(msg.payload);
                    } else {
                        resolvers[i].resolve(msg.payload);
                    }

                    resolvers = resolvers.slice(i, 1);
                }
            }
        });
    }

    /**
     * Turns message sending between the website and the content script into async promises
     *
     * @param stream
     * @param type
     * @param payload
     * @returns {Promise<any>}
     */
    static send(stream, type, payload = {}) {
        return new Promise((resolve, reject) => {

            let id = randomString({length: 24});
            let message = new NetworkMessage(type, payload, id);
            resolvers.push(new DanglingResolver(id, resolve, reject));
            stream.send(message, PairingTags.THE4THPILLAR);

        });
    };

}
