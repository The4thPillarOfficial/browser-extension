let state = {
    wallet: {},
    seedWords: null,

    errors: [],
    prompt: null,

    web3: null,
    token: {
        instance: null,
        decimals: null,
        symbol: null,
        accountBalance: null,
    },
    document: {
        instance: null,
        documents: false,
    },
};

export default state;
