import {address, ABI} from './ABI/document';
import store from '../../store';
import axios from 'axios';

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
     * Method returns the number of documents for the given receiver
     *
     * @param receiver
     * @returns {Promise<any>}
     */
    getDocumentsCount(receiver) {
        return new Promise((resolve, reject) => {
            this.contract.getDocumentsCount(receiver, (err, getDocumentsCount) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(getDocumentsCount);
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
            const numOfDocuments = await this.getDocumentsCount(receiver);

            if (!numOfDocuments) {
                return;
            }

            let lastDocumentIndex = numOfDocuments - 1;

            // Check if range is not exceeded
            if (from > lastDocumentIndex) {
                from = lastDocumentIndex;
            }

            if (to > lastDocumentIndex || to === null) {
                to = lastDocumentIndex;
            }

            for (let i = from; i <= to; i++) {
                try {
                    const document = await this.getDocument(receiver, i);

                    // If document is not deleted
                    if (document[1]) {
                        const metadata = this.extractMetadata(document[1]);
                        const documentInfo = await this.retrieveMetadataInfo(metadata.url);

                        documents.push({
                            index: i,
                            sender: document[0],
                            link: documentInfo.link,
                            name: documentInfo.name,
                            description: documentInfo.description,
                            docType: documentInfo.docType,
                            checksum: documentInfo.checksum,
                            sentAt: document[2],
                            openedAt: document[3],
                            metadata: metadata,
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        } catch (err) {
            console.error(err);
        }

        return documents;
    }

    extractMetadata(metadata) {
        const metadataBundle = store.state.web3.toUtf8(metadata);

        return {
            checksum: metadataBundle.slice(0, 64),
            url: metadataBundle.slice(64, metadataBundle.length),
        };
    }

    async retrieveMetadataInfo(url) {
        const res = await axios.get(url);
        return res.data;
    }
}
