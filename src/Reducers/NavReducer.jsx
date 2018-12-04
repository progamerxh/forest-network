import * as types from '../Actions/NavActionType'

export const navigate = (state = 'Home', action) => {
    switch (action.type) {
        case types.NAVIGATE_TO:
            return action.routeName;
        default:
            return state;
    }
};

