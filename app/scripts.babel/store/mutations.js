import * as Mutations from './constants';

let mutations = {
    [Mutations.PUSH_ERROR]: (state, error) => state.errors.push(error),
    [Mutations.CLEAR_ERRORS]: (state) => state.errors = [],
    [Mutations.SET_WALLET]: (state, wallet) => state.wallet = wallet,
    [Mutations.SET_SEED_WORDS]: (state, seedWords) => state.seedWords = seedWords,
    [Mutations.PUSH_PROMPT]: (state, prompt) => state.prompt = prompt,
    [Mutations.SET_WEB3_PROVIDER]: (state, web3) => state.web3 = web3,
    [Mutations.SET_TOKEN]: (state, token) => {
        state.token.instance = token.instance;
        state.token.decimals = token.decimals;
        state.token.accountBalance = token.accountBalance;
        state.token.symbol = token.symbol;
    },
    [Mutations.SET_DOCUMENT]: (state, document) => {
        state.document.instance = document.instance;
        state.document.documents = document.documents;
    },
};

export default mutations;
