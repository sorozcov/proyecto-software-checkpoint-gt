import { combineReducers } from 'redux';

import * as types from '../types/loggedUser';
import * as userTypes from '../types/users';

const user = (state = {}, action) => {
    switch (action.type) {
        case types.USER_LOGGED_IN:
            {
                console.log(action.payload);
                return action.payload;
            }

        case types.USER_LOGGED_OFF:
            {
                return state;
            }

        case userTypes.USER_EDIT_COMPLETED:
            {
                const edited = action.payload;

                if (state.uid === edited.uid) {
                    return {
                        ...state,
                        ...edited
                    }
                } else {
                    return state;
                }
            }

        default:
            {
                return state;
            }
    }
};

const isAdminMode = (state = null, action) => {
    switch (action.type) {
        case types.ADMIN_APP_MODE_TOGGLED:
            {
                return !state;
            }

        case types.USER_LOGGED_IN:
            {
                if (action.payload.userTypeId == 1) {
                    return true;
                } else {
                    return false;
                }
            }

        case types.USER_LOGGED_OFF:
            {
                return null;
            }

        default:
            return state;
    }
};

const loggedUser = combineReducers({
    user,
    isAdminMode
});

export default loggedUser;

export const getLoggedUser = state => state.user;
export const getIsAdminMode = state => state.isAdminMode;
export const getLoggedUserType = state => state.user.userTypeId;
export const isLoggedUser = state => ((state.user.userid !== undefined) ? true : false);