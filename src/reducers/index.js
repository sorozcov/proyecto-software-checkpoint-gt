import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import loggedUser, * as loggedUserSelectors from './loggedUser';
import branches, * as branchSelectors from './branches';


const reducer = combineReducers({
    loggedUser,
    form: formReducer,
    branches,
});


export default reducer;


export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);

//BranchOffice global selectors
export const getBranch = state => branchSelectors.getBranch(state.branches, id);
export const getBranches = state => branchSelectors.getBranches(state.branches);
export const isFetchingBranches = state => branchSelectors.isFetchingBranches(state.branches);
export const getBranchesError = state => branchSelectors.getBranchesError(state.branches);