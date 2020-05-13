import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import loggedUser, * as loggedUserSelectors from './loggedUser';
import categories, * as categoriesSelectors from './categories';

import branches, * as branchSelectors from './branches';

import users, * as usersSelectors from './users';




const reducer = combineReducers({
    loggedUser,
    categories,
    form: formReducer,
    users,
    branches,

});


export default reducer;

//Logged User
export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);


export const getCategory = (state, id) => categoriesSelectors.getCategory(state.categories, id);
export const getCategories = state => categoriesSelectors.getCategories(state.categories);
export const isFetchingCategories = state => categoriesSelectors.isFetchingCategories(state.categories);
export const isCreatingCategory = state => categoriesSelectors.isCreatingCategory(state.categories);
export const isRemovingCategory = state => categoriesSelectors.isRemovingCategory(state.categories);
export const getError = state => categoriesSelectors.getError(state.categories);


//BranchOffice global selectors
export const getBranch = (state, id) => branchSelectors.getBranch(state.branches, id);
export const getBranches = state => branchSelectors.getBranches(state.branches);
export const isFetchingBranches = state => branchSelectors.isFetchingBranches(state.branches);
export const getBranchesError = state => branchSelectors.getBranchesError(state.branches);
export const getSelectedBranch = state => branchSelectors.getSelectedBranch(state.branches);
export const isAddingBranches = state => branchSelectors.isAddingBranches(state.branches);
export const isEditingBranches = state => branchSelectors.isEditingBranches(state.branches);
export const isRemovingBranches = state => branchSelectors.isRemovingBranches(state.branches);

//Users
export const getUser = (state, id) => usersSelectors.getUser(state.users, id);
export const getUsers = state => usersSelectors.getUsers(state.users);
export const getSelectedUser = state => usersSelectors.getSelectedUser(state.users);
export const isFetchingUsers = state => usersSelectors.isFetchingUsers(state.users);
export const isAddingUsers = state => usersSelectors.isAddingUsers(state.users);
export const isEditingUsers = state => usersSelectors.isEditingUsers(state.users);
export const isRemovingUsers = state => usersSelectors.isRemovingUsers(state.users);
export const getUsersError = state => usersSelectors.getUsersError(state.users);