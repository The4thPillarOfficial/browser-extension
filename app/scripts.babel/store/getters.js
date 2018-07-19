let getters = {
    defaultAccount: state => state.wallet.defaultAccount,
    defaultNetwork: state => state.wallet.settings.defaultNetwork,
    isUnlocked: state => state.wallet.vault.memStore.getState().isUnlocked,
    isVaultExists: state => !!state.wallet.vault.store.getState().vault,
    web3: state => state.web3,
    token: state => state.token,
    wallet: state => state.wallet,
};

export default getters;
