import * as types from '../types/branches';

// FETCH BRANCH
export const startFetchingBranch = () => ({
    type: types.BRANCH_FETCH_STARTED,
});
export const completeFetchingBranch = (entities, order) => ({
    type: types.BRANCH_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingBranch = error => ({
    type: types.BRANCH_FETCH_FAILED,
    payload: {
        error,
    },
});

// ADD BRANCH BRANCH
export const startAddingBranch = Branch => ({
    type: types.BRANCH_ADD_STARTED,
    payload: Branch,
});
export const completeAddingBranch = Branch => ({
    type: types.BRANCH_ADD_COMPLETED,
    payload: Branch,
});
export const failAddingBranch = error => ({
    type: types.BRANCH_ADD_FAILED,
    payload: {
        error,
    },
});

// REMOVE BRANCH BRANCH
export const startRemovingBranch = id => ({
    type: types.BRANCH_REMOVE_STARTED,
    payload: {
        id,
    },
});
export const completeRemovingBranch = id => ({
    type: types.BRANCH_REMOVE_COMPLETED,
    payload: {
        id,
    },
});
export const failRemovingBranch = (id, error) => ({
    type: types.BRANCH_REMOVE_FAILED,
    payload: {
        id,
        error,
    },
});

// UPDATE BRANCH BRANCH
export const startUpdatingBranch = Branch => ({
    type: types.BRANCH_UPDATE_STARTED,
    payload: Branch,
});
export const completeUpdatingBranch = Branch => ({
    type: types.BRANCH_UPDATE_COMPLETED,
    payload: Branch,
});
export const failUpdatingBranch = (id, error) => ({
    type: types.BRANCH_UPDATE_FAILED,
    payload: {
        id,
        error,
    },
});

//SELECT BRANCH
export const selectBranch = branch => ({
    type: types.BRANCH_SELECTED,
    payload: branch,
});
export const deselectBranch = branch => ({
    type: types.BRANCH_DESELECTED,
});

export const viewBranch = branch => ({
    type: types.BRANCH_VIEWED,
    payload: branch,
})

export const unviewBranch = () => ({
    type: types.BRANCH_UNVIEWED,
})