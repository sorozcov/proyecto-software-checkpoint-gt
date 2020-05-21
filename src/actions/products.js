import * as types from '../types/products';


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

export const startRemovingProduct = productid => ({
  type: types.PRODUCT_REMOVE_STARTED,
  payload: {
    productid,
  },
});
export const completeRemovingProduct = productid => ({
  type: types.PRODUCT_REMOVE_COMPLETED,
  payload: {
    productid,
  },
});
export const failRemovingProduct = (productid, error) => ({
  type: types.PRODUCT_REMOVE_FAILED,
  payload: {
    productid,
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