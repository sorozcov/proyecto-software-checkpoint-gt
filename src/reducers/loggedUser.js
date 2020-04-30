import * as types from '../types/loggedUser';


const loggedUser = (state = {}, action) => {
  switch (action.type) {
    case types.USER_LOGGED_IN: {
      let newState = action.payload;
      return newState;
    }
    case types.USER_LOGGED_OFF: {
      let newState = {};
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default loggedUser;

export const getLoggedUser = state => state;
export const isLoggedUser = state => ((state.userid!==undefined) ? true : false);