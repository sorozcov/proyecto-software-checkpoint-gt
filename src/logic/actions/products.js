import * as types from '../types/products';

// FETCH PRODUCTS
export const startFetchingProducts = () => ({
    type: types.PRODUCTS_FETCH_STARTED,
});
export const completeFetchingProducts = (entities, order) => ({
    type: types.PRODUCTS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingProducts = error => ({
    type: types.PRODUCTS_FETCH_FAILED,
    payload: {
        error,
    },
});

// ADD PRODUCT
export const startAddingProduct = product => ({
    type: types.PRODUCT_ADD_STARTED,
    payload: product,
});
export const completeAddingProduct = product => ({
    type: types.PRODUCT_ADD_COMPLETED,
    payload: product,
});
export const failAddingProduct = error => ({
    type: types.PRODUCT_ADD_FAILED,
    payload: {
        error,
    },
});

// EDIT PRODUCT 
export const startEditingProduct = product => ({
    type: types.PRODUCT_EDIT_STARTED,
    payload: product,
});
export const completeEditingProduct = product => ({
    type: types.PRODUCT_EDIT_COMPLETED,
    payload: product,
});
export const failEditingProduct = (id, error) => ({
    type: types.PRODUCT_EDIT_FAILED,
    payload: {
        id,
        error,
    },
});

// REMOVE PRODUCT
export const startRemovingProduct = productId => ({
    type: types.PRODUCT_REMOVE_STARTED,
    payload: {
        productId,
    },
});
export const completeRemovingProduct = productId => ({
    type: types.PRODUCT_REMOVE_COMPLETED,
    payload: {
        productId,
    },
});
export const failRemovingProduct = (productId, error) => ({
    type: types.PRODUCT_REMOVE_FAILED,
    payload: {
        productId,
        error,
    },
});

// SELECT PRODUCT
export const selectProduct = product => ({
    type: types.PRODUCT_SELECTED,
    payload: product,
});
export const deselectProduct = () => ({
    type: types.PRODUCT_DESELECTED,
});

// INGREDIENTS
export const addIngredient = Ingredient => ({
    type: types.PRODUCT_INGREDIENT_ADDED,
    payload: {
        Ingredient
    }
});
export const removeIngredient = ingredientIdx => ({
    type: types.PRODUCT_INGREDIENT_REMOVED,
    payload: {
        ingredientIdx
    }
});

export const toggleIngredientDefault = idx => ({
    type: types.PRODUCT_INGREDIENT_TOGGLED_DEFAULT,
    payload: {
        idx,
    }
});

// ADDITIONALS
export const addAdditional = Additional => ({
    type: types.PRODUCT_ADDITIONAL_ADDED,
    payload: {
        Additional
    }
});
export const removeAdditional = additionalIdx => ({
    type: types.PRODUCT_ADDITIONAL_REMOVED,
    payload: {
        additionalIdx
    }
});
export const toggleAdditionalDefault = idx => ({
    type: types.PRODUCT_ADDITIONAL_TOGGLED_DEFAULT,
    payload: {
        idx,
    }
});

// PRODUCT SEARCH
export const productSearchStarted = searchText => ({
    type: types.PRODUCT_SEARCH_STARTED,
    payload: searchText,
});