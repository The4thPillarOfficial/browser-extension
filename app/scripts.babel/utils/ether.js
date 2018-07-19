import store from '../store';

module.exports = function (n) {
    return new store.getters.web3.BigNumber(store.getters.web3.toWei(n, 'ether'));
};
