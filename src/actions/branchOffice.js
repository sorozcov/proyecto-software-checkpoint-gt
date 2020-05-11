import * as types from '../types/branchOffice';

// FETCH BRANCH OFFICE
export const startFetchingBranchOffice = () => ({
    type: types.BRANCH_OFFICE_FETCH_STARTED,
});
export const completeFetchingBranchOffice = (entities, order) => ({
    type: types.BRANCH_OFFICE_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingBranchOffice = error => ({
    type: types.BRANCH_OFFICE_FETCH_FAILED,
    payload: {
        error,
    },
});

// ADD BRANCH OFFICE
export const startAddingBranchOffice = branchOffice => ({
    type: types.BRANCH_OFFICE_ADD_STARTED,
    payload: branchOffice,
});
export const completeAddingBranchOffice = (oldId, branchOffice) => ({
    type: types.BRANCH_OFFICE_ADD_COMPLETED,
    payload: {
        oldId,
        branchOffice,
    },
});
export const failAddingBranchOffice = (oldId, error) => ({
    type: types.BRANCH_OFFICE_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

// REMOVE BRANCH OFFICE
export const startRemovingBranchOffice = id => ({
    type: types.BRANCH_OFFICE_REMOVE_STARTED,
    payload: {
        id,
    },
});
export const completeRemovingBranchOffice = id => ({
    type: types.BRANCH_OFFICE_REMOVE_COMPLETED,
    payload: {
        id,
    },
});
export const failRemovingBranchOffice = (id, error) => ({
    type: types.BRANCH_OFFICE_REMOVE_FAILED,
    payload: {
        id,
        error,
    },
});

// UPDATE BRANCH OFFICE
export const startUpdatingBranchOffice = branchOffice => ({
    type: types.BRANCH_OFFICE_UPDATE_STARTED,
    payload: branchOffice,
});
export const completeUpdatingBranchOffice = id => ({
    type: types.BRANCH_OFFICE_UPDATE_COMPLETED,
    payload: {
        id,
    },
});
export const failUpdatingBranchOffice = (id, error) => ({
    type: types.BRANCH_OFFICE_UPDATE_FAILED,
    payload: {
        id,
        error,
    },
});