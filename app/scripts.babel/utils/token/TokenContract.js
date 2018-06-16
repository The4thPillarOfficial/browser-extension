import {ABI, address} from './ABI/four';

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
}
