import ethUtil from 'ethereumjs-util';

export class Helper {

    /**
     * Method convert HEX string to UTF-8
     *
     * @param hex
     * @returns {*}
     */
    static hexToText(hex) {
        try {
            const stripped = ethUtil.stripHexPrefix(hex);
            const buff = Buffer.from(stripped, 'hex');

            return buff.toString('utf8')

        } catch (e) {
            return hex
        }
    }
}
