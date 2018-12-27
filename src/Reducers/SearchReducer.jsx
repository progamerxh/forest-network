import * as types from '../Actions/SearchActionType'

export const searchresult = (state = {}, action) => {
    switch (action.type) {
        case types.SEARCH_USER:
            return {
                ...state,
                user: action.user,
            }
        case types.MINI_SEARCH:
            return {
                ...state,
                minisearch: action.text
            }
        default:
            return state;
    }
};