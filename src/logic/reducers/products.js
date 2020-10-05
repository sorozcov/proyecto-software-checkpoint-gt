import omit from 'lodash/omit';
import union from 'lodash/union';
import { combineReducers } from 'redux';
import * as types from '../types/products';
import { addIngredient } from '../actions/products';
import { formValueSelector } from 'redux-form' // ES6


const byId = (state = {}, action) => {
    switch (action.type) {
        // CRUD
        case types.PRODUCTS_FETCH_COMPLETED:
            {
                const { entities, order } = action.payload;
                const newState = {...state };
                order.forEach(id => {
                    newState[id] = {
                        ...entities[id],
                    };
                });
                return newState;
            }
        case types.PRODUCT_ADD_COMPLETED:
            {
                const product = action.payload;
                state[product.productId] = {
                    ...product,
                };
                return state;
            }
        case types.PRODUCT_EDIT_COMPLETED:
            {
                return {
                    ...state,
                    [action.payload.productId]: {
                        ...state[action.payload.productId],
                        ...action.payload,
                    },
                };
            }
        case types.PRODUCT_REMOVE_COMPLETED:
            {
                return omit(state, action.payload.productId);
            }
        default:
            {
                return state;
            }
    }
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.PRODUCTS_FETCH_COMPLETED:
            {
                return union(action.payload.order);
            }
        case types.PRODUCT_ADD_COMPLETED:
            {
                return [...state, action.payload.productId];
            }
        case types.PRODUCT_REMOVE_COMPLETED:
            {
                return state.filter(id => id !== action.payload.productId);
            }
        default:
            {
                return state;
            }
    }
};

const productSelected = (state = null, action) => {
    switch (action.type) {
        case types.PRODUCT_SELECTED:
            {
                return action.payload;
            }

            // INGREDIENTS      
        case types.PRODUCT_INGREDIENT_ADDED:
            {
                const newIngredient = action.payload.Ingredient;
                const actualValuesForm = action.payload.actualValues
                let newState={...actualValuesForm,...state}
                if(newState.ingredients==undefined){
                    newState.ingredients=[]
                }
                if(state==null){
                    newState.ingredients=[]
                }else{
                    newState.ingredients = newState.ingredients
                }
                return {
                    ...newState,
                    ingredients: [...newState.ingredients, newIngredient]
                };
            }
        case types.PRODUCT_INGREDIENT_REMOVED:
            {
                const Idx = action.payload.ingredientIdx;
                const ingredients = state.ingredients;

                return {
                    ...state,
                    ingredients: ingredients.filter(i => ingredients.indexOf(i) !== Idx),
                };
            }
        case types.PRODUCT_INGREDIENT_TOGGLED_DEFAULT:
            {
                const idx = action.payload.idx;
                const ingredients_ = [...state.ingredients];
                ingredients_[idx].default = !ingredients_[idx].default;

                return {
                    ...state,
                    ingredients: ingredients_
                };
            }

            // ADDITIONALS 
        case types.PRODUCT_ADDITIONAL_ADDED:
            {
                const newAdditional = action.payload.Additional;
                const actualValuesForm = action.payload.actualValues
                let newState={...actualValuesForm,...state}
                if(newState.additionals==undefined){
                    newState.additionals=[]
                }
                
                if(state==null){
                    newState.additionals=[]
                }else{
                    newState.additionals = newState.additionals
                }
               
                return {
                    ...newState,
                    additionals: [...newState.additionals, newAdditional]
                };
            }
        case types.PRODUCT_ADDITIONAL_REMOVED:
            {
                const Idx = action.payload.additionalIdx;
                const additionals = state.additionals;

                return {
                    ...state,
                    additionals: additionals.filter(i => additionals.indexOf(i) !== Idx),
                };
            }
        case types.PRODUCT_ADDITIONAL_TOGGLED_DEFAULT:
            {
                console.log(action.payload.idx);
                const idx = action.payload.idx;
                const additionals_ = [...state.additionals];
                additionals_[idx].default = !additionals_[idx].default;

                return {
                    ...state,
                    additionals: additionals_
                };
            }
        case types.PRODUCT_DESELECTED:
            {
                return null;
            }
        default:
            {
                return state;
            }
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.PRODUCTS_FETCH_STARTED:
            {
                return true;
            }
        case types.PRODUCTS_FETCH_COMPLETED:
            {
                return false;
            }
        case types.PRODUCTS_FETCH_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const isAdding = (state = false, action) => {
    switch (action.type) {
        case types.PRODUCT_ADD_STARTED:
            {
                return true;
            }
        case types.PRODUCT_ADD_COMPLETED:
            {
                return false;
            }
        case types.PRODUCT_ADD_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const isEditing = (state = false, action) => {
    switch (action.type) {
        case types.PRODUCT_EDIT_STARTED:
            {
                return true;
            }
        case types.PRODUCT_EDIT_COMPLETED:
        case types.PRODUCT_EDIT_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const isRemoving = (state = false, action) => {
    switch (action.type) {
        case types.PRODUCT_REMOVE_STARTED:
            {
                return true;
            }
        case types.PRODUCT_REMOVE_COMPLETED:
        case types.PRODUCT_REMOVE_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        //fetch
        case types.PRODUCTS_FETCH_FAILED:
            {
                return action.payload.error;
            }
        case types.PRODUCTS_FETCH_STARTED:
            {
                return null;
            }
        case types.PRODUCTS_FETCH_COMPLETED:
            {
                return null;
            }
            //add
        case types.PRODUCT_ADD_FAILED:
            {
                return action.payload.error;
            }
        case types.PRODUCT_ADD_STARTED:
            {
                return null;
            }
        case types.PRODUCT_ADD_COMPLETED:
            {
                return null;
            }
            //edit
        case types.PRODUCT_EDIT_FAILED:
            {
                return action.payload.error;
            }
        case types.PRODUCT_EDIT_STARTED:
            {
                return null;
            }
        case types.PRODUCT_EDIT_COMPLETED:
            {
                return null;
            }
            //remove
        case types.PRODUCT_REMOVE_FAILED:
            {
                return action.payload.error;
            }
        case types.PRODUCT_REMOVE_STARTED:
            {
                return null;
            }
        case types.PRODUCT_REMOVE_COMPLETED:
            {
                return null;
            }
        default:
            {
                return state;
            }
    }
};

const searchProduct = (state = "", action) => {
    switch (action.type) {
        case types.PRODUCT_SEARCH_STARTED:
            {
                return action.payload;
            }
        default:
            {
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
    searchProduct,
});

export default products;

export const getProduct = (state, id) => state.byId[id];
export const getProducts = state => state.order.map(id => getProduct(state, id));
export const getSelectedProduct = (state) => state.productSelected;
export const getSelectedProductIngredients = (state) => state.productSelected != null && state.productSelected.ingredients != null ? state.productSelected.ingredients : [];
export const getSelectedProductAdditionals = (state) => state.productSelected != null && state.productSelected.additionals != null ? state.productSelected.additionals : [];
export const isFetchingProducts = state => state.isFetching;
export const isAddingProducts = state => state.isAdding;
export const isEditingProducts = state => state.isEditing;
export const isRemovingProducts = state => state.isRemoving;
export const getProductsError = state => state.error;
export const getSearchTextProduct = state => state.searchProduct;