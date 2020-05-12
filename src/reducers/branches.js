import omit from 'lodash/omit';
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
                        isConfirmed: true,
                    };
                });
                return newState;
            }
        case types.BRANCH_ADD_STARTED:
            {
                const newState = {...state };
                newState[action.payload.id] = {
                    ...action.payload,
                    isConfirmed: false,
                };
                return newState;
            }
        case types.BRANCH_ADD_COMPLETED:
            {
                const { oldId, Branch } = action.payload;
                const newState = omit(state, oldId);
                newState[Branch.id] = {
                    ...Branch,
                    isConfirmed: true,
                }
            }
        case types.BRANCH_REMOVE_STARTED:
            {
                const newState = {...state };
                newState[action.payload.id].isConfirmed = false;
                return newState
            }
        case types.BRANCH_REMOVE_COMPLETED:
            {
                return omit(state, action.payload);
            }
        case types.BRANCH_UPDATE_STARTED:
            {
                newState = omit(state, action.payload);
                newState[action.payload.id] = {
                    ...action.payload,
                    isConfirmed: false
                };
                return newState;
            }
        case types.BRANCH_UPDATE_COMPLETED:
            {
                newState = {...state };
                newState[action.payload.id].isConfirmed = true;
                return newState;
            }
        default:
            return state;
    };
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.BRANCH_FETCH_COMPLETED:
            {
                return [...state, ...action.payload.order];
            }
        case types.BRANCH_ADD_STARTED:
            {
                return [...state, ...action.payload.id];
            }
        case types.BRANCH_ADD_COMPLETED:
            {
                const { oldId, Branch } = action.payload;
                return state.map(id => id === oldId ? Branch.id : id);
            }
        case types.BRANCH_REMOVE_COMPLETED:
            {
                return state.filter(id => id !== action.payload);
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

export default combineReducers({
    byId,
    order,
    isFetching,
    error,
});

// Selectores locales.
export const getBranch = (state, id) => state.byId[id];
export const getBranches = state => state.order.map(id => getBranch(state, id));
export const isFetchingBranches = state => state.isFetching;
export const getBranchesError = state => state.error;