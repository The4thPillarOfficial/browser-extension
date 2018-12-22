import NodeRSA from 'node-rsa';
const crypto = require('crypto');

export default class DocumentService {

    /**
     * Method trigger file download
     *
     * @param url
     * @param rsaPrivateKey
     * @param sendResponse
     */
    static downloadFile(url, rsaPrivateKey, sendResponse) {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'blob';
        request.onload = () => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(request.response);
            reader.onload = (e) => {

                try {
                    const key = new NodeRSA(rsaPrivateKey);
                    let fileData = Buffer.from(reader.result, 'base64').toString().split(':');

                    // Split asymmetric & symmetric part
                    const asymmetric = fileData[0];
                    const symmetric = fileData[1];

                    // Decrypt asymmetric part
                    let decrypted = key.decrypt(asymmetric, 'base64');
                    const symPrefix = Buffer.from(decrypted, 'base64').toString().split(':');

                    // Get key & iv for symmetric decryption
                    const symKey = Buffer.from(symPrefix[0], 'base64');
                    const iv = Buffer.from(symPrefix[1], 'base64');

                    // Decrypt symmetric encrypted data
                    const encryptedFileData = Buffer.from(symmetric, 'base64');
                    let decipher = crypto.createDecipheriv('aes-256-cbc', symKey, iv);
                    let decryptedFileData = Buffer.concat([decipher.update(encryptedFileData), decipher.final()]);

                    // Download decrypted file
                    let decryptedFile = new Blob([Buffer.from(decryptedFileData)], {type: request.response.type});

                    chrome.downloads.download({
                        url: URL.createObjectURL(decryptedFile)
                    });

                    sendResponse(true);

                    // TODO:: Set openedAt on this document; create pre signed transaction ob blockchain
                } catch (err) {
                    sendResponse(err);
                }
            };
        };
        request.send();
    }
}
