import * as types from './SearchActionType';

export const searchuser = (user) => {
    return {
        type: types.SEARCH_USER,
        user
    }
};

export const minisearch = (text) => {
    return {
        type: types.MINI_SEARCH,
        text
    }
};