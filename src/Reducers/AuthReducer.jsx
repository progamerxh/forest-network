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
        case types.FOLLOW:
            var following = state.following;
            var followers = state.followers;
            following.push({
                uid: action.user.uid,
                avatarUrl: action.user.avatarUrl,
                displayName: action.user.displayName,
                followers: action.user.followers,
            })
            for (var i in followers)
                if (followers[i].uid === action.user.uid)
                    followers[i].isFollow = true;
            return {
                ...state,
                following,
                followers,
            }
        default:
            return state;
    }
};

