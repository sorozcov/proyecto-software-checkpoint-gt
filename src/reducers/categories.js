import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/categories';


/*
    - byId
    - order
    - isFetching
    - isCreating
    - isRemoving
    - error
*/


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.CATEGORIES_FETCH_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = {...state};

            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                    isConfirmed: true,
                };
            });

            return newState;
        }

        case types.CATEGORY_ADD_STARTED: {
            const newState = {...state};
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            }
            
            return newState;
        }

        case types.CATEGORY_REMOVE_STARTED: {
            return omit(state, action.payload.id)
        }
        
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.CATEGORIES_FETCH_COMPLETED: {
            return [...state, ...action.payload.result];
        }
        
        case types.CATEGORY_ADD_STARTED: {
            return [...state, action.payload.id];
        }

        case types.CATEGORY_ADD_COMPLETED: {
            const { oldId, category } = action.payload;
            return state.map(id => id === oldId ? category.id : id);
        }

        case types.CATEGORY_REMOVE_COMPLETED: {
            return state.filter(id => id !== action.payload.id);
        }

        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.CATEGORIES_FETCH_STARTED: {
            return true;
        }

        case types.CATEGORIES_FETCH_COMPLETED: {
            return false;
        }

        case types.CATEGORIES_FETCH_FAILED: {
            return false;
        }

        default: {
            return state;
        }
    }
};

const isCreating = (state = false, action) => {
    switch(action.type) {
        case types.CATEGORY_ADD_STARTED: {
            return true;
        }

        case types.CATEGORY_ADD_COMPLETED: {
            return false;
        }

        case types.CATEGORY_ADD_FAILED: {
            return false;
        }

        default: {
            return state;
        }
    }
};

const isRemoving = (state = false, action) => {
    switch(action.type) {
        case types.CATEGORY_REMOVE_STARTED: {
            return true;
        }

        case types.CATEGORY_REMOVE_COMPLETED: {
            return false;
        }

        case types.CATEGORY_REMOVE_FAILED: {
            return false;
        }

        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.CATEGORIES_FETCH_FAILED: {
            return action.payload.error;
        }

        case types.CATEGORIES_FETCH_STARTED: {
            return null;
        }

        case types.CATEGORIES_FETCH_COMPLETED: {
            return null;
        }

        case types.CATEGORY_ADD_FAILED: {
            return action.payload.error;
        }

        case types.CATEGORY_ADD_STARTED: {
            return null;
        }

        case types.CATEGORY_ADD_COMPLETED: {
            return null;
        }

        case types.CATEGORY_REMOVE_FAILED: {
            return action.payload.error;
        }

        case types.CATEGORY_REMOVE_STARTED: {
            return null;
        }

        case types.CATEGORY_REMOVE_COMPLETED: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export default combineReducers ({
    byId,
    order,
    isFetching,
    isCreating,
    isRemoving,
    error,
});

export const getCategory = (state, id) => state.byId[id];
export const getCategories = state => state.order.map(id => getCategory(state, id));
export const isFetchingCategories = state => state.isFetching;
export const isCreatingCategory = state => state.isCreating;
export const isRemovingCategory = state => state.isRemoving;
export const getError = state => state.error; 