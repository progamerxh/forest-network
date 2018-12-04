import * as types from '../Actions/PostActionType'

const mockposts = [
    {
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        displayName: "User 1",
        followers: "112",
        content: {
            text: " Forest Network là một mạng xã hội phi tập trung (decentralized social network) dựa trên công nghệ chuỗi khối (blockchain technology)",
            photoUrl: "https://bitcoinwiki.co/wp-content/uploads/censorship-free-social-network-akasha-aims-to-tackle-internet-censorship-with-blockchain-technology.jpg",
            taglist: [
                "react", "reactjs", "javascript"
            ],
            timeuploaded: "Tue Dec 1 2018 07:00:00 GMT+0700",
        },
        interaction: {
            faves: 234,
            comments: 23,
            shares: 12,
        }
    },
    {
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        displayName: "User 7",
        followers: "42",
        content: {
            text: " Forest Network là một mạng xã hội phi tập trung (decentralized social network) dựa trên công nghệ chuỗi khối (blockchain technology)",
            photoUrl: "",
            taglist: [
                "react", "reactjs", "javascript", "blockchain"
            ],
            timeuploaded: "Tue Dec 1 2018 07:00:00 GMT+0700",
        },
        interaction: {
            faves: 44,
            comments: 31,
            shares: 1,
        }
    },

]
export const posts = (state = mockposts, action) => {
    switch (action.type) {
        case types.POST_SUBMITED:
            return [action.post,
            ...state

            ];
        default:
            return state;
    }
};