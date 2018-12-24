import ethUtil from 'ethereumjs-util';

export default class Helper {

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

Helper.FEE_TAKER_ADDRESS = '0x8D5c28D6B290343697609B26dcA019b794860D1B';
Helper.PLATFORM_BASE_URL = 'https://www.the4thpillar.com';
