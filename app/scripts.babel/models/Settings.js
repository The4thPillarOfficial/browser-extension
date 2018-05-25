import NetworkTypes from '../utils/NetworkTypes';

export default class Settings {

    constructor(settings) {
        this.defaultNetwork = settings.defaultNetwork ? settings.defaultNetwork : NetworkTypes.KOVAN_CODE;
    }
}
