import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/users';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.USERS_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });
      return newState;
    }
    case types.USER_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.USER_ADD_COMPLETED: {
      const { oldId, user } = action.payload;
      const newState = omit(state, oldId);
      newState[user.id] = {
        ...user,
        isConfirmed: true,
      };
      return newState;
    }
    case types.USER_EDIT_COMPLETED: {
      return {
        ...state,
        [action.payload.userid]: {
          ...state[action.payload.userid],
          ...action.payload,
        },
      };
    }
    case types.USER_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.USERS_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.USER_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.USER_ADD_COMPLETED: {
      const { oldId, user } = action.payload;
      return state.map(id => id === oldId ? user.id : id);
    }
    case types.USER_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.USERS_FETCH_STARTED: {
      return true;
    }
    case types.USERS_FETCH_COMPLETED: {
      return false;
    }
    case types.USERS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const isAdding = (state = false, action) => {
  switch(action.type) {
    case types.USER_ADD_STARTED: {
      return true;
    }
    case types.USER_ADD_COMPLETED: {
      return false;
    }
    case types.USER_ADD_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const isEditing = (state = false, action) => {
  switch(action.type) {
    case types.USER_EDIT_STARTED: {
      return true;
    }
    case types.USER_EDIT_COMPLETED: {
      return false;
    }
    case types.USER_EDIT_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const isRemoving = (state = false, action) => {
  switch(action.type) {
    case types.USER_REMOVE_STARTED: {
      return true;
    }
    case types.USER_REMOVE_COMPLETED: {
      return false;
    }
    case types.USER_REMOVE_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    //fetch
    case types.USERS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.USERS_FETCH_STARTED: {
      return null;
    }
    case types.USERS_FETCH_COMPLETED: {
      return null;
    }
    //add
    case types.USER_ADD_FAILED: {
      return action.payload.error;
    }
    case types.USER_ADD_STARTED: {
      return null;
    }
    case types.USER_ADD_COMPLETED: {
      return null;
    }
    //edit
    case types.USER_EDIT_FAILED: {
      return action.payload.error;
    }
    case types.USER_EDIT_STARTED: {
      return null;
    }
    case types.USER_EDIT_COMPLETED: {
      return null;
    }
    //remove
    case types.USER_REMOVE_FAILED: {
      return action.payload.error;
    }
    case types.USER_REMOVE_STARTED: {
      return null;
    }
    case types.USER_REMOVE_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


const users = combineReducers({
  byId,
  order,
  isFetching,
  isAdding,
  isEditing,
  isRemoving,
  error,
});

export default users;

export const getUser = (state, id) => state.byId[id];
export const getUsers = state => state.order.map(id => getUser(state, id));
export const isFetchingUsers = state => state.isFetching;
export const isAddingUsers = state => state.isAdding;
export const isEditingUsers = state => state.isEditing;
export const isRemovingUsers = state => state.isRemoving;
export const getUsersError = state => state.error;