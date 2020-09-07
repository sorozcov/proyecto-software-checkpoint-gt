import * as types from '../types/loggedUser';
import * as userTypes from '../types/users';

const loggedUser = (state = {}, action) => {
  switch (action.type) {
    case types.USER_LOGGED_IN: {
      return action.payload;
    }

    case types.USER_LOGGED_OFF: {
      return state;
    }

    case userTypes.USER_EDIT_COMPLETED: {
      const edited = action.payload;
      if (state.uid === edited.uid) {
        return {
          ...state,
          ...edited
        }
      }
      else {
        return state
      }
    }

    default: {
      return state;
    }
  }
};

export default loggedUser;

export const getLoggedUser = state => state;
export const isLoggedUser = state => ((state.userid!==undefined) ? true : false);