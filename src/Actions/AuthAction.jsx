import * as types from './AuthActionType';

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

export const editName = (text) => {
    return {
        type: types.EDIT_NAME,
        text
    }
};