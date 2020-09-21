import * as types from '../types/users';


export const startFetchingUsers = () => ({
    type: types.USERS_FETCH_STARTED,
});
export const completeFetchingUsers = (entities, order) => ({
    type: types.USERS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingUsers = error => ({
    type: types.USERS_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingUser = user => ({
    type: types.USER_ADD_STARTED,
    payload: user,
});
export const completeAddingUser = user => ({
    type: types.USER_ADD_COMPLETED,
    payload: user,
});
export const failAddingUser = error => ({
    type: types.USER_ADD_FAILED,
    payload: {
        error,
    },
});
export const clearAddingUser = () => ({
    type: types.USER_ADD_CLEAR,
})

export const startEditingUser = user => ({
    type: types.USER_EDIT_STARTED,
    payload: user,
});
export const completeEditingUser = user => ({
    type: types.USER_EDIT_COMPLETED,
    payload: user,
});
export const failEditingUser = (id, error) => ({
    type: types.USER_EDIT_FAILED,
    payload: {
        id,
        error,
    },
});

export const startRemovingUser = uid => ({
    type: types.USER_REMOVE_STARTED,
    payload: {
        uid,
    },
});
export const completeRemovingUser = uid => ({
    type: types.USER_REMOVE_COMPLETED,
    payload: {
        uid,
    },
});
export const failRemovingUser = (uid, error) => ({
    type: types.USER_REMOVE_FAILED,
    payload: {
        uid,
        error,
    },
});

export const selectUser = user => ({
    type: types.USER_SELECTED,
    payload: user,
});
export const deselectUser = () => ({
    type: types.USER_DESELECTED,
});