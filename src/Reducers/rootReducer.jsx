import { combineReducers } from 'redux';
import * as NavReducer from './NavReducer';
import * as PostReducer from './PostReducer';
import * as UserReducer from './UserReducer';
import * as AuthReducer from './AuthReducer';

export default combineReducers({
    auth: AuthReducer.auth,
    navigate: NavReducer.navigate,
    posts: PostReducer.posts,
    followtype: UserReducer.followtype,
    userlist : UserReducer.userlist,
});
