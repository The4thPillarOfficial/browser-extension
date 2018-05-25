let getters = {
    defaultAccount: state => state.wallet.defaultAccount,
    defaultNetwork: state => state.wallet.settings.defaultNetwork,
    isUnlocked: state => state.wallet.vault.memStore.getState().isUnlocked,
    isVaultExists: state => !!state.wallet.vault.store.getState().vault,
};

export default getters;
