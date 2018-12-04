import * as types from '../Actions/AuthActionType'

export const auth = (state = '', action) => {
    switch (action.type) {
        case types.LOG_IN:
            return action.auth;
        case types.LOG_OUT:
            return '';
        case types.EDIT_NAME:
            return {
                ...state,
                displayName: action.text,
            }
        default:
            return state;
    }
};

