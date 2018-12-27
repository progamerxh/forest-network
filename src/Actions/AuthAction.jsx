import * as types from './AuthActionType';

export const updateaccount = (auth) => {
    return {
        type: types.UPDATE_ACCOUNT,
        auth
    }
};
export const updatesequence = (auth) => {
    return {
        type: types.UPDATE_SEQUENCE,
        auth
    }
};
export const login = (auth) => {
    return {
        type: types.LOG_IN,
        auth
    }
};
export const logout = () => {
    return {
        type: types.LOG_OUT,
    }
};

export const follow = (address) => {
    return {
        type: types.FOLLOW,
        address
    }
};
export const unfollow = (address) => {
    return {
        type: types.UNFOLLOW,
        address
    }
};