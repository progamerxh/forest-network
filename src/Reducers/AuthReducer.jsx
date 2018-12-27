import * as types from '../Actions/AuthActionType'

const initpendingfollow = { followings: [], unfollows: [] };

export const pendingFollowings = (state = initpendingfollow, action) => {
    console.log(action);
    switch (action.type) {
        case types.FOLLOW:
            var unfollows = state.unfollows;
            var followings = state.followings;
            var index = null;
            for (var i in unfollows)
                if (unfollows[i] === action.address)
                    index = i;
            for (var i in followings)
                if (followings[i] === action.address)
                    index = null;
            return {
                unfollows: (index !== null) ? unfollows.splice(index, 1) : unfollows,
                followings: state.followings.concat(action.address),
            }
        case types.UNFOLLOW:
            var followings = state.followings;
            var index = null;
            for (var i in followings)
                if (followings[i] === action.address)
                    index = i;
            return {
                followings: (index !== null) ? followings.splice(index, 1) : followings,
                unfollows: state.unfollows.concat(action.address),
            }
        default:
            return state;
    }
}

export const auth = (state = '', action) => {
    switch (action.type) {
        case types.UPDATE_SEQUENCE:
            const { balance, sequence, bandwidth, bandwidthTime } = action.auth;
            return {
                ...state,
                balance,
                sequence,
                bandwidth,
                bandwidthTime,
            }
        case types.UPDATE_ACCOUNT:
            const { name, followings, picture } = action.auth;
            return {
                ...state,
                name, followings, picture,
            }
        case types.LOG_IN:
            return action.auth;
        case types.LOG_OUT:
            return '';
        case types.FOLLOW:
            var followers = state.followers;
            for (var i in followers)
                if (followers[i].address === action.address)
                    followers[i].isFollow = true;
            return {
                ...state,
                followings: state.followings.concat(action.address),
                followers,
            }
        case types.UNFOLLOW:
            var followers = state.followers;
            var index = null;
            for (var i in followers)
                if (followers[i].address === action.address)
                    index = i;
            return {
                ...state,
                followings: (index !== null) ? followings.splice(index, 1) : followings,
                followers,
            }
        default:
            return state;
    }
};

