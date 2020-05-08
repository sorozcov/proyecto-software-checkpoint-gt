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

export const startAddingCategories = categorie => ({
    type: types.CATEGORIES_ADD_STARTED,
    payload: {
        categorie,
    },
});

export const completeAddingCategories = (oldId, categorie)=> ({
    type: types.CATEGORIES_ADD_COMPLETED,
    payload: {
        oldId,
        categorie,
    },
});

export const failAddingCategorie = (oldId, error) => ({
    type: types.CATEGORIES_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startRemovingCategorie = id => ({
    type: types.CATEGORIES_REMOVE_STARTED,
    payload: {
        id,
    },
});

export const completeRemovingCategorie = () => ({
    type: types.CATEGORIES_REMOVE_COMPLETED,
});

export const failRemovingCategorie = (id, error) => ({
    type: types.CATEGORIES_REMOVE_FAILED,
    payload: {
        id, 
        error,
    },
});