import { combineReducers } from 'redux';

import * as types from '../types/branchOffice';

const byId = (state = {}, action) => {
    switch (action.type) {
        case types.BRANCH_OFFICE_FETCH_COMPLETED:
            {}
        case types.BRANCH_OFFICE_ADD_STARTED:
            {}
        case types.BRANCH_OFFICE_ADD_COMPLETED:
            {}
        case types.BRANCH_OFFICE_DELETE_STARTED:
            {}
        case types.BRANCH_OFFICE_DELETE_COMPLETED:
            {}
        case types.BRANCH_OFFICE_DELETE_FAILED:
            {}
        case types.BRANCH_OFFICE_UPDATE_STARTED:
            {}
        case types.BRANCH_OFFICE_UPDATE_FAILED:
            {}
        default:
            return state;
    };
};
const order = (state = [], action) => {
    switch (action.type) {
        case types.BRANCH_OFFICE_FETCH_STARTED:
            {}
        case types.BRANCH_OFFICE_FETCH_COMPLETED:
            {}
        case types.BRANCH_OFFICE_FETCH_FAILED:
            {}
        case types.BRANCH_OFFICE_ADD_STARTED:
            {}
        case types.BRANCH_OFFICE_ADD_COMPLETED:
            {}
        case types.BRANCH_OFFICE_ADD_FAILED:
            {}
        case types.BRANCH_OFFICE_DELETE_STARTED:
            {}
        case types.BRANCH_OFFICE_DELETE_COMPLETED:
            {}
        case types.BRANCH_OFFICE_DELETE_FAILED:
            {}
        case types.BRANCH_OFFICE_UPDATE_STARTED:
            {}
        case types.BRANCH_OFFICE_UPDATE_COMPLETED:
            {}
        case types.BRANCH_OFFICE_UPDATE_FAILED:
            {}
        default:
            return state;
    };
};
const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.BRANCH_OFFICE_FETCH_STARTED:
            {}
        case types.BRANCH_OFFICE_FETCH_COMPLETED:
            {}
        case types.BRANCH_OFFICE_FETCH_FAILED:
            {}
        case types.BRANCH_OFFICE_ADD_STARTED:
            {}
        case types.BRANCH_OFFICE_ADD_COMPLETED:
            {}
        case types.BRANCH_OFFICE_ADD_FAILED:
            {}
        case types.BRANCH_OFFICE_DELETE_STARTED:
            {}
        case types.BRANCH_OFFICE_DELETE_COMPLETED:
            {}
        case types.BRANCH_OFFICE_DELETE_FAILED:
            {}
        case types.BRANCH_OFFICE_UPDATE_STARTED:
            {}
        case types.BRANCH_OFFICE_UPDATE_COMPLETED:
            {}
        case types.BRANCH_OFFICE_UPDATE_FAILED:
            {}
        default:
            return state;
    };
};
const error = (state = null, action) => {
    switch (action.type) {
        case types.BRANCH_OFFICE_FETCH_STARTED:
            {}
        case types.BRANCH_OFFICE_FETCH_COMPLETED:
            {}
        case types.BRANCH_OFFICE_FETCH_FAILED:
            {}
        case types.BRANCH_OFFICE_ADD_STARTED:
            {}
        case types.BRANCH_OFFICE_ADD_COMPLETED:
            {}
        case types.BRANCH_OFFICE_ADD_FAILED:
            {}
        case types.BRANCH_OFFICE_DELETE_STARTED:
            {}
        case types.BRANCH_OFFICE_DELETE_COMPLETED:
            {}
        case types.BRANCH_OFFICE_DELETE_FAILED:
            {}
        case types.BRANCH_OFFICE_UPDATE_STARTED:
            {}
        case types.BRANCH_OFFICE_UPDATE_COMPLETED:
            {}
        case types.BRANCH_OFFICE_UPDATE_FAILED:
            {}
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