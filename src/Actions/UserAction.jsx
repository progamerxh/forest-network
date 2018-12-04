import * as types from './UserActionType';

export const followtype = (followtype) => {
    return {
        type: types.FOLLOW_TYPE,
        followtype
    }
};