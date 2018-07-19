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

Helper.FEE_TAKER_ADDRESS = '0xA47b2173EC9Ed52f095174266F581567964dbF85';
Helper.PLATFORM_BASE_URL = 'http://local.the4thpillar.com:8888';
