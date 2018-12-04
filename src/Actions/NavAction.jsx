import * as types from './NavActionType';

export const navigate = (routeName) => {
    return {
        type: types.NAVIGATE_TO,
        routeName
    }
};