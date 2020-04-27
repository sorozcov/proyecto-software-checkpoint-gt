import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import loggedUser, * as loggedUserSelectors from './loggedUser';


const reducer = combineReducers({
  loggedUser,
  form: formReducer,
});


export default reducer;


export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);
