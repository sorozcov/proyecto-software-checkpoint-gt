import * as types from '../types/loggedUser';


export const login = user => ({
    type: types.USER_LOGGED_IN,
    payload: user,
});

export const logout = () => ({
    type: types.USER_LOGGED_OFF,
});

export const toggleAdminAppMode = () => ({
    type: types.ADMIN_APP_MODE_TOGGLED,
});