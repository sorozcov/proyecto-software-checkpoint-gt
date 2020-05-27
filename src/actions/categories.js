import * as types from '../types/categories';

export const startFetchingCategories = () => ({
    type: types.CATEGORIES_FETCH_STARTED,
});

export const completeFetchingCategories = (entities, order) => ({
    type: types.CATEGORIES_FETCH_COMPLETED,
    payload: {
        entities,
        order,
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
    }
});

export const completeAddingCategory = category => ({
    type: types.CATEGORY_ADD_COMPLETED,
    payload: category,
});

export const failAddingCategory = error => ({
    type: types.CATEGORY_ADD_FAILED,
    payload: {
        error,
    },
});

export const startRemovingCategory = categoryId => ({
    type: types.CATEGORY_REMOVE_STARTED,
    payload: {
        categoryId,
    },
});

export const completeRemovingCategory = categoryId => ({
    type: types.CATEGORY_REMOVE_COMPLETED,
    payload: {
        categoryId,
    },
});

export const failRemovingCategory = (categoryId, error) => ({
    type: types.CATEGORY_REMOVE_FAILED,
    payload: {
        categoryId, 
        error,
    },
});

export const startEditingCategory = category => ({
    type: types.CATEGORY_EDIT_STARTED,
    payload: category,
});

export const completeEditingCategory = category => ({
    type: types.CATEGORY_EDIT_COMPLETED,
    payload: category,
});

export const failEditingCategory = error => ({
    type: types.CATEGORY_EDIT_FAILED,
    payload: {
        categoryId,
        error,
    }
})

export const selectCategory = category => ({
    type: types.CATEGORY_SELECTED,
    payload: category,
})

export const deselectCategory = () => ({
    type: types.CATEGORY_DESELECTED,
});