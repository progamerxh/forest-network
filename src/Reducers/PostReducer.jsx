import * as types from '../Actions/PostActionType'

const initposts = { page: 0, posts: [] }
export const newsfeed = (state = initposts, action) => {
    switch (action.type) {
        case types.POST_LOADED:
            return {
                ...state,
                page: state.page + 1,
                posts: state.posts.concat(action.posts)
            }
        case types.POST_REFRESH:
            return initposts;
        case types.POST_SHOWCOMMENT:
            return {
                ...state,
                posts: state.posts.map(
                    (post) => (action.hash === post.hash) ? { ...post,showReact:false, showComment: true } : post
                )
            }
        case types.POST_SHOWREACT:
            return {
                ...state,
                posts: state.posts.map(
                    (post) => (action.hash === post.hash) ? { ...post,showComment:false, showReact: true } : post
                )
            }
        default:
            return state;
    }
};