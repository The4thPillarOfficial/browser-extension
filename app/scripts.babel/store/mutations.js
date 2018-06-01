import * as Mutations from './constants';

let mutations = {
    [Mutations.PUSH_ERROR]: (state, error) => state.errors.push(error),
    [Mutations.CLEAR_ERRORS]: (state) => state.errors = [],
    [Mutations.SET_WALLET]: (state, wallet) => state.wallet = wallet,
    [Mutations.SET_SEED_WORDS]: (state, seedWords) => state.seedWords = seedWords,
    [Mutations.PUSH_PROMPT]: (state, prompt) => state.prompt = prompt,
};

export default mutations;
