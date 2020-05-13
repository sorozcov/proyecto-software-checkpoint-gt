import omit from 'lodash/omit';
import union from 'lodash/union';
import { combineReducers } from 'redux';

import * as types from '../types/branches';

const byId = (state = {}, action) => {
    switch (action.type) {
        case types.BRANCH_FETCH_COMPLETED:
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
        case types.BRANCH_ADD_COMPLETED:
            {
                const branch = action.payload;
                state[branch.id] = {
                    ...branch,
                };
                return state;
            }
        case types.BRANCH_REMOVE_COMPLETED:
            {
                return omit(state, action.payload.id);
            }
        case types.BRANCH_UPDATE_COMPLETED:
            {
                return {
                    ...state,
                    [action.payload.id]: {
                        ...state[action.payload.id],
                        ...action.payload,
                    },
                };
            }
        default: {
            return state;
        }
    };
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.BRANCH_FETCH_COMPLETED:
            {
                return union(action.payload.order);
            }
        case types.BRANCH_ADD_COMPLETED:
            {
                return [...state, action.payload.id];
            }
        case types.BRANCH_REMOVE_COMPLETED:
            {
                return state.filter(id => id !== action.payload.id);
            }
        default:
            return state;
    };
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.BRANCH_FETCH_STARTED:
            {
                return true;
            }
        case types.BRANCH_FETCH_COMPLETED:
            {
                return false;
            }
        case types.BRANCH_FETCH_FAILED:
            {
                return false;
            }
        default:
            return state;
    };
};

const isAdding = (state = false, action) => {
    switch (action.type) {
        case types.BRANCH_ADD_STARTED:
            {
                return true;
            }
        case types.BRANCH_ADD_COMPLETED:
            {
                return false;
            }
        case types.BRANCH_ADD_FAILED:
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
        case types.BRANCH_UPDATE_STARTED:
            {
                return true;
            }
        case types.BRANCH_UPDATE_COMPLETED:
            {
                return false;
            }
        case types.BRANCH_UPDATE_FAILED:
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
        case types.BRANCH_REMOVE_STARTED:
            {
                return true;
            }
        case types.BRANCH_REMOVE_COMPLETED:
            {
                return false;
            }
        case types.BRANCH_REMOVE_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};


const error = (state = null, action) => {
    switch (action.type) {
        case types.BRANCH_FETCH_STARTED:
        case types.BRANCH_ADD_STARTED:
        case types.BRANCH_REMOVE_STARTED:
        case types.BRANCH_UPDATE_STARTED:
            {
                return null;
            }
        case types.BRANCH_FETCH_FAILED:
            {
                return action.payload.error;
            }

        case types.BRANCH_ADD_FAILED:
            {
                return action.payload.error;
            }

        case types.BRANCH_REMOVE_FAILED:
            {
                return action.payload.error;
            }

        case types.BRANCH_UPDATE_FAILED:
            {
                return action.payload.error;
            }
        default:
            return state;
    };
};

const branchSelected = (state = null, action) => {
    switch (action.type) {
        case types.BRANCH_SELECTED:
            {
                return action.payload;
            }
        case types.BRANCH_DESELECTED:
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

export default combineReducers({
    byId,
    order,
    isFetching,
    error,
    isAdding,
    isEditing,
    isRemoving,
    branchSelected,
});

// Selectores locales.
export const getBranch = (state, id) => state.byId[id];
export const getBranches = state => state.order.map(id => getBranch(state, id));
export const isFetchingBranches = state => state.isFetching;
export const getBranchesError = state => state.error;
export const getSelectedBranch = state => state.branchSelected;
export const isAddingBranches = state => state.isAdding;
export const isEditingBranches = state => state.isEditing;
export const isRemovingBranches = state => state.isRemoving;