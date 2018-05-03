import * as Mutations from './constants';

let mutations = {
    [Mutations.PUSH_ERROR]: (state, error) => state.errors.push(error),
    [Mutations.CLEAR_ERRORS]: (state) => state.errors = [],
    [Mutations.SET_WALLET]: (state, wallet) => state.wallet = wallet,
    [Mutations.SET_SEED_WORDS]: (state, seedWords) => state.seedWords = seedWords,
};

export default mutations;
