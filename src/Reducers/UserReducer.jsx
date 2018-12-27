import * as types from '../Actions/UserActionType'
import { LOG_IN } from '../Actions/AuthActionType'

export const userprofile = (state = null, action) => {
    switch (action.type) {
        case types.USER_PROFILE:
            return action.user;
        case LOG_IN:
            return null;
        default:
            return state;
    }
};
const inituserlist = { page: 0, hasMore: true, users: [] }
export const userlist = (state = inituserlist, action) => {
    switch (action.type) {
        case types.USER_REFRESH:
            return inituserlist;
        case types.USER_LOADED:
            return {
                ...state,
                page: state.page + 1,
                users: state.users.concat(action.users),
            }
        case types.USER_LOADEND:
            return {
                ...state,
                hasMore: false,
            };
        default:
            return state;
    }
};
export const followtype = (state = 'Following', action) => {
    switch (action.type) {
        case types.FOLLOW_TYPE:
            return action.followtype;
        default:
            return state;
    }
};

