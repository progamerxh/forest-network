import { combineReducers } from 'redux';
import * as NavReducer from './NavReducer';
import * as PostReducer from './PostReducer';
import * as UserReducer from './UserReducer';
import * as AuthReducer from './AuthReducer';
import * as TransactionReducer from './TransactionReducer';
import * as SearchReducer from './SearchReducer';

export default combineReducers({
    auth: AuthReducer.auth,
    pendingFollowings: AuthReducer.pendingFollowings,
    navigate: NavReducer.navigate,
    newsfeed: PostReducer.newsfeed,
    followtype: UserReducer.followtype,
    userlist: UserReducer.userlist,
    userprofile: UserReducer.userprofile,
    transactionlist: TransactionReducer.transactionlist,
    searchresult: SearchReducer.searchresult,
});
