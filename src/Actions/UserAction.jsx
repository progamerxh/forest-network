import * as types from './UserActionType';

export const userloadend = () => {
    return {
        type: types.USER_LOADEND,
    }
};
export const refreshusers = () => {
    return {
        type: types.USER_REFRESH,
    }
};
export const exploreuser = (user) => {
    return {
        type: types.USER_PROFILE,
        user
    }
};
export const followtype = (followtype) => {
    return {
        type: types.FOLLOW_TYPE,
        followtype
    }
};
export const loadusers = (users) => {
    return {
        type: types.USER_LOADED,
        users,
    }
};