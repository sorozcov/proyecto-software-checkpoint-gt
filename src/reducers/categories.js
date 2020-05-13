import { combineReducers } from 'redux';
import omit from 'lodash/omit';
import union from 'lodash/union';

import * as types from '../types/categories';
import { useNavigation } from '@react-navigation/native';


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
            const newState = { ...state };

            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                };
            });

            return newState;
        }

        case types.CATEGORY_ADD_STARTED: {
            const newState = {...state};
            newState[action.payload.categoryId] = {
                ...action.payload,
            }
            
            return newState;
        }

        case types.CATEGORY_REMOVE_STARTED: {
            return omit(state, action.payload.categoryId)
        }
        
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.CATEGORIES_FETCH_COMPLETED: {
            return union(action.payload.order);
        }

        case types.CATEGORY_ADD_COMPLETED: {
            return [...state, action.payload.categoryId];
        }

        case types.CATEGORY_REMOVE_COMPLETED: {
            return state.filter(id => id !== action.payload.categoryId);
        }

        default: {
            return state;
        }
    }
};

const categorySelected = (state = null, action) => {
    switch(action.type) {
        case types.CATEGORY_SELECTED: {
            return action.payload;
        }
        
        case types.CATEGORY_DESELECTED: {
            return null;
        }

        default: {
            return state;
        }
    }
}

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
    categorySelected,
    isFetching,
    isCreating,
    isRemoving,
    error,
});

export const getCategory = (state, id) => state.byId[id];
export const getCategories = state => state.order.map(id => getCategory(state, id));
export const getCategorySelected = state => state.categorySelected;
export const isFetchingCategories = state => state.isFetching;
export const isCreatingCategory = state => state.isCreating;
export const isRemovingCategory = state => state.isRemoving;
export const getError = state => state.error; 