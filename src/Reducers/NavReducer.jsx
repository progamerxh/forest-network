import * as types from '../Actions/NavActionType'
import { LOG_IN } from '../Actions/AuthActionType'
export const navigate = (state = 'Home', action) => {
    switch (action.type) {
        case types.NAVIGATE_TO:
            return action.routeName;
        case LOG_IN:
            return 'Home';
        default:
            return state;
    }
};

