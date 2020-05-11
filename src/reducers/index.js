import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import loggedUser, * as loggedUserSelectors from './loggedUser';
import branchOffice, * as branchOfficeSelectors from './branchOffice';


const reducer = combineReducers({
    loggedUser,
    form: formReducer,
    branchOffice,
});


export default reducer;


export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);

//BranchOffice global selectors
export const getBranchOffice = state => branchOfficeSelectors.getBranchOffice(state.branchOffice, id);
export const getBranchOffices = state => branchOfficeSelectors.getBranchOffices(state.branchOffice);
export const isFetchingBranchOffices = state => branchOfficeSelectors.isFetchingBranchOffices(state.branchOffice);
export const getBranchOfficesError = state => branchOfficeSelectors.getBranchOfficesError(state.branchOffice);