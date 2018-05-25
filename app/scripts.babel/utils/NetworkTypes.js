export default class NetworkTypes {
    constructor() {}
}

NetworkTypes.MAINNET = 'mainnet';
NetworkTypes.MAINNET_CODE = 1;

NetworkTypes.KOVAN = 'kovan';
NetworkTypes.KOVAN_CODE = 42;

NetworkTypes.NETWORKS = {
    1: NetworkTypes.MAINNET,
    42: NetworkTypes.KOVAN,
};
