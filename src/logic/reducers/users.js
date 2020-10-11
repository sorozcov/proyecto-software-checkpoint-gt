import { combineReducers } from 'redux';

import omit from 'lodash/omit';
import union from 'lodash/union';

import * as types from '../types/users';


const byId = (state = {}, action) => {
    switch (action.type) {
        case types.USERS_FETCH_COMPLETED:
            {
                const { entities, order } = action.payload;
                const newState = {...state };
                order.forEach(id => {
                    newState[id] = {
                        ...entities[id],
                    };
                });
                return newState;
            }
        case types.USER_ADD_COMPLETED:
            {
                const user = action.payload;
                state[user.uid] = {
                    ...user,
                };
                return state;
            }
        case types.USER_EDIT_COMPLETED:
            {
                return {
                    ...state,
                    [action.payload.uid]: {
                        ...state[action.payload.uid],
                        ...action.payload,
                    },
                };
            }
        case types.USER_REMOVE_COMPLETED:
            {
                return omit(state, action.payload.uid);
            }
        default:
            {
                return state;
            }
    }
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.USERS_FETCH_COMPLETED:
            {
                return union(action.payload.order);
            }
        case types.USER_ADD_COMPLETED:
            {
                return [...state, action.payload.uid];
            }
        case types.USER_REMOVE_COMPLETED:
            {
                return state.filter(id => id !== action.payload.uid);
            }
        default:
            {
                return state;
            }
    }
};

const userSelected = (state = null, action) => {
    switch (action.type) {
        case types.USER_SELECTED:
            {
                return action.payload;
            }
        case types.USER_DESELECTED:
            {
                var newState = null;
                return newState;
            }
        default:
            {
                return state;
            }
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.USERS_FETCH_STARTED:
            {
                return true;
            }
        case types.USERS_FETCH_COMPLETED:
            {
                return false;
            }
        case types.USERS_FETCH_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const isAdding = (state = false, action) => {
    switch (action.type) {
        case types.USER_ADD_STARTED:
            {
                return true;
            }
        case types.USER_ADD_COMPLETED:
            {
                return false;
            }
        case types.USER_ADD_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const isEditing = (state = false, action) => {
    switch (action.type) {
        case types.USER_EDIT_STARTED:
            {
                return true;
            }
        case types.USER_EDIT_COMPLETED:
        case types.USER_EDIT_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const isRemoving = (state = false, action) => {
    switch (action.type) {
        case types.USER_REMOVE_STARTED:
            {
                return true;
            }
        case types.USER_REMOVE_COMPLETED:
            {
                return false;
            }
        case types.USER_REMOVE_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const addStatus = (state = null, action) => {
    switch (action.type) {
        case types.USER_ADD_COMPLETED:
            {
                return "COMPLETED";
            }
        case types.USER_ADD_FAILED:
            {
                return "FAILED";
            }
        case types.USER_ADD_CLEAR:
            {
                return null
            }
        default:
            {
                return state;
            }
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case types.USERS_FETCH_FAILED: //FETCH
        case types.USER_ADD_FAILED: //ADD
        case types.USER_EDIT_FAILED: //EDIT
        case types.USER_REMOVE_FAILED: //REMOVE
            {
                return action.payload.error;
            }
        case types.USERS_FETCH_STARTED:
        case types.USERS_FETCH_COMPLETED:
        case types.USER_ADD_STARTED:
        case types.USER_ADD_COMPLETED:
        case types.USER_EDIT_STARTED:
        case types.USER_EDIT_COMPLETED:
        case types.USER_REMOVE_STARTED:
        case types.USER_REMOVE_COMPLETED:
            {
                return null;
            }
        default:
            {
                return state;
            }
    }
};


const users = combineReducers({
    byId,
    order,
    userSelected,
    isFetching,
    isAdding,
    isEditing,
    isRemoving,
    error,
    addStatus,
});

export default users;

export const getUser = (state, id) => state.byId[id];
export const getUsers = state => state.order.map(id => getUser(state, id));
export const getSelectedUser = (state) => state.userSelected;
export const isFetchingUsers = state => state.isFetching;
export const isAddingUsers = state => state.isAdding;
export const isEditingUsers = state => state.isEditing;
export const isRemovingUsers = state => state.isRemoving;
export const getUsersError = state => state.error;
export const getAddStatus = state => state.addStatus;