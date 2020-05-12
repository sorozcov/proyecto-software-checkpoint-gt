import * as types from '../types/categories';

export const startFetchingCategories = () => ({
    type: types.CATEGORIES_FETCH_STARTED,
});

export const completeFetchingCategories = (entities, result) => ({
    type: types.CATEGORIES_FETCH_COMPLETED,
    payload: {
        entities,
        result,
    },
});

export const failFetchingCategories = error => ({
    type: types.CATEGORIES_FETCH_FAILED,
    payload: {
        error,
    }
});

export const startAddingCategory = category => ({
    type: types.CATEGORY_ADD_STARTED,
    payload: {
        category,
    },
});

export const completeAddingCategory = (oldId, category)=> ({
    type: types.CATEGORY_ADD_COMPLETED,
    payload: {
        oldId,
        CATEGORY_ADD_STARTED,
    },
});

export const failAddingCategory = (oldId, error) => ({
    type: types.CATEGORY_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startRemovingCategory = id => ({
    type: types.CATEGORY_REMOVE_STARTED,
    payload: {
        id,
    },
});

export const completeRemovingCategory = () => ({
    type: types.CATEGORY_REMOVE_COMPLETED,
});

export const failRemovingCategory = (id, error) => ({
    type: types.CATEGORY_REMOVE_FAILED,
    payload: {
        id, 
        error,
    },
});