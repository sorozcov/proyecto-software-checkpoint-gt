import omit from 'lodash/omit';
import union from 'lodash/union';
import { combineReducers } from 'redux';

import * as types from '../types/products';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.PRODUCTS_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
        };
      });
      return newState;
    }
    case types.PRODUCT_ADD_COMPLETED: {
      const product = action.payload;
      state[product.productId] = {
        ...product,
      };
      return state;
    }
    case types.PRODUCT_EDIT_COMPLETED: {
      return {
        ...state,
        [action.payload.productId]: {
          ...state[action.payload.productId],
          ...action.payload,
        },
      };
    }
    case types.PRODUCT_ADD_TO_ORDER: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          quantity: state[action.payload].quantity == null ? 1 : state[action.payload].quantity + 1,
        },
      };
    }
    case types.PRODUCT_DELETE_TO_ORDER: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          quantity: (state[action.payload].quantity == null || state[action.payload].quantity === 0) ? 0 : state[action.payload].quantity - 1,
        },
      };
    }
    case types.PRODUCT_REMOVE_COMPLETED: {
      return omit(state, action.payload.productId);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.PRODUCTS_FETCH_COMPLETED: {
      return union(action.payload.order);
    }
    case types.PRODUCT_ADD_COMPLETED: {
      return [...state, action.payload.productId];
    }
    case types.PRODUCT_REMOVE_COMPLETED: {
      return state.filter(id => id !== action.payload.productId);
    }
    default: {
      return state;
    }
  }
};

const productSelected = (state = null, action) => {
  switch (action.type) {
    case types.PRODUCT_SELECTED: {
      return action.payload;
    }
    case types.PRODUCT_DESELECTED: {
      var newState = null;
      return newState;
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.PRODUCTS_FETCH_STARTED: {
      return true;
    }
    case types.PRODUCTS_FETCH_COMPLETED: {
      return false;
    }
    case types.PRODUCTS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const isAdding = (state = false, action) => {
  switch(action.type) {
    case types.PRODUCT_ADD_STARTED: {
      return true;
    }
    case types.PRODUCT_ADD_COMPLETED: {
      return false;
    }
    case types.PRODUCT_ADD_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const isEditing = (state = false, action) => {
  switch(action.type) {
    case types.PRODUCT_EDIT_STARTED: {
      return true;
    }
    case types.PRODUCT_EDIT_COMPLETED: {
      return false;
    }
    case types.PRODUCT_EDIT_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const isRemoving = (state = false, action) => {
  switch(action.type) {
    case types.PRODUCT_REMOVE_STARTED: {
      return true;
    }
    case types.PRODUCT_REMOVE_COMPLETED: {
      return false;
    }
    case types.PRODUCT_REMOVE_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    //fetch
    case types.PRODUCTS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PRODUCTS_FETCH_STARTED: {
      return null;
    }
    case types.PRODUCTS_FETCH_COMPLETED: {
      return null;
    }
    //add
    case types.PRODUCT_ADD_FAILED: {
      return action.payload.error;
    }
    case types.PRODUCT_ADD_STARTED: {
      return null;
    }
    case types.PRODUCT_ADD_COMPLETED: {
      return null;
    }
    //edit
    case types.PRODUCT_EDIT_FAILED: {
      return action.payload.error;
    }
    case types.PRODUCT_EDIT_STARTED: {
      return null;
    }
    case types.PRODUCT_EDIT_COMPLETED: {
      return null;
    }
    //remove
    case types.PRODUCT_REMOVE_FAILED: {
      return action.payload.error;
    }
    case types.PRODUCT_REMOVE_STARTED: {
      return null;
    }
    case types.PRODUCT_REMOVE_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


const products = combineReducers({
  byId,
  order,
  productSelected,
  isFetching,
  isAdding,
  isEditing,
  isRemoving,
  error,
});

export default products;

export const getProduct = (state, id) => state.byId[id];
export const getProducts = state => state.order.map(id => getProduct(state, id));
export const getSelectedProduct = (state) => state.productSelected;
export const isFetchingProducts = state => state.isFetching;
export const isAddingProducts = state => state.isAdding;
export const isEditingProducts = state => state.isEditing;
export const isRemovingProducts = state => state.isRemoving;
export const getProductsError = state => state.error;