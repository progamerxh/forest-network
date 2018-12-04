import * as types from '../Actions/UserActionType'

const mockusers = [
    {
        uid :"u1",
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        displayName: "User 1",
        followers: "112",
        
    },
    {
        uid :"u2",
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        displayName: "User 2",
        followers: "13",
    },
    {
        uid :"u3",
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        displayName: "User 3",
        followers: "14",
    },
    {
        uid :"u4",
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        displayName: "User 4",
        followers: "122",
    },
    {
        uid :"u5",
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        displayName: "User 5",
        followers: "54",
    },
    {
        uid :"u6",
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        displayName: "User 6",
        followers: "32",
    },
    {
        uid :"u7",
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        displayName: "User 7",
        followers: "42",
    },
]
export const userlist = (state = mockusers, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
export const followtype = (state = 'Followers', action) => {
    switch (action.type) {
        case types.FOLLOW_TYPE:
            return action.followtype;
        default:
            return state;
    }
};

