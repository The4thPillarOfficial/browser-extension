import {address, ABI} from './ABI/document';

export default class DocumentContract {

    constructor(contract) {
        this.contract = contract;
    }

    /**
     * Method return document contract
     *
     * @param web3
     * @returns {Promise<any>}
     */
    static getDocumentContract(web3) {
        return new Promise((resolve, reject) => {

            if (typeof web3 !== 'undefined') {
                let contract = web3.eth.contract(ABI).at(address);

                resolve(contract);
            }
        });
    }

    /**
     * Method return document
     *
     * @param receiver
     * @param index
     * @returns {Promise<any>}
     */
    getDocument(receiver, index) {
        return new Promise((resolve, reject) => {
            this.contract.getDocument(receiver, index, (err, document) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(document);
                }
            });
        });
    }

    /**
     * Method return last document index
     *
     * @param receiver
     * @returns {Promise<any>}
     */
    getLastDocumentIndex(receiver) {
        return new Promise((resolve, reject) => {
            this.contract.getLastDocumentIndex(receiver, (err, lastDocumentIndex) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(lastDocumentIndex);
                }
            });
        });
    }

    /**
     * Method return all documents between range
     *
     * @param receiver
     * @param from
     * @param to
     * @returns {Promise<Array>}
     */
    async getDocumentsInRange(receiver, from, to = null) {
        let documents = [];

        try {
            let lastDocumentIndex = await this.getLastDocumentIndex(receiver);

            // Check if range is not exceeded
            if (to > lastDocumentIndex || to === null) {
                to = lastDocumentIndex;
            }

            if (from > lastDocumentIndex) {
                from = lastDocumentIndex;
            }

            for (let i = from; i <= to; i++) {
                try {
                    const document = await this.getDocument(receiver, i);

                    // If document is not deleted
                    if (document[1]) {
                        documents.push({
                            sender: document[0],
                            link: document[1],
                            name: document[2],
                            description: document[3],
                            docType: document[4],
                            openedAt: document[5],
                        });
                    }
                } catch (err) {
                    // Document not exists
                }
            }
        } catch (err) {
            console.error(err.message);
        }

        return documents;
    }
}
