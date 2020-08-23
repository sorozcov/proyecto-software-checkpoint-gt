import * as types from '../types/products';
import products from '../reducers/products';


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

export const selectProduct = product => ({
  type: types.PRODUCT_SELECTED,
  payload: product,
});
export const deselectProduct = () => ({
  type: types.PRODUCT_DESELECTED,
});

export const addProductToOrder = productId => ({
  type: types.PRODUCT_ADD_TO_ORDER,
  payload: productId,
});
export const deleteProductToOrder = productId => ({
  type: types.PRODUCT_DELETE_TO_ORDER,
  payload: productId,
});

export const startAddingIngredient = (product) => ({
  type: types.PRODUCT_INGREDIENT_ADD_STARTED,
  payload: product
});

export const completeAddingIngredient = product => ({
  type: types.PRODUCT_INGREDIENT_ADD_COMPLETED,
  payload: product,
});

export const failAddingIngredient = (id, error) => ({
  type: types.PRODUCT_INGREDIENT_ADD_FAILED,
  payload: {
    id,
    error,
  },
});

export const saveAdditionalIngredient = ingredient => ({
  type: types.PRODUCT_INGREDIENT_SAVED,
  payload: ingredient
})

export const clearAdditionalIngredients = () => ({
  type: types.PRODUCT_INGREDIENTS_CLEARED
})