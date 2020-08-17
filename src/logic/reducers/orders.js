import omit from 'lodash/omit';
import union from 'lodash/union';
import { combineReducers } from 'redux';
import * as types from '../types/orders';



const byId = (state = {}, action) => {
    switch(action.type) {
        case types.ORDERS_FETCH_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = { ...state };
            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                };
            });

            return newState;
        }
        
        case types.ORDER_ADD_COMPLETED: {
            const order = action.payload;
            state[order.orderId] = {
                ...order,
            };

            return state;
        }

        case types.ORDER_EDIT_COMPLETED: {
            return {
                ...state,
                [action.payload.orderId]: {
                    ...state[action.payload.orderId],
                    ...action.payload,
                },
            };
        }

        case types.ORDER_REMOVE_COMPLETED: {
            return omit(state, action.payload.orderId);
        }

        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.ORDERS_FETCH_COMPLETED: {
            return union(action.payload.order);
        }
        case types.ORDER_ADD_COMPLETED: {
            return [...state, action.payload.orderId];
        }
        case types.ORDER_REMOVE_COMPLETED: {
            return state.filter(id => id !== action.payload.orderId);
        }
        default: {
            return state;
        }
    }
};

const orderSelected = (state = null, action) => {
    switch (action.type) {
        case types.ORDER_ACTIVATED: {
            const date = new Date();
            return {...action.payload, fecha: date};
        }

        case types.ORDER_DEACTIVATED: {
            return null;
        }
        
        default: {
            return state;
        }
    }
};

const selectedOrderProducts = (state = [], action) => {
    switch(action.type) {
        case types.ORDER_PRODUCTS_ADDED: {
            const newState = action.payload;
            return newState;
        }
        case types.ORDER_ACTIVATED: {
            const newState = action.payload.products;
            return newState;
        }
        default: {
            return state;
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.ORDERS_FETCH_STARTED: {
            return true;
        }
        case types.ORDERS_FETCH_COMPLETED: {
            return false;
        }
        case types.ORDERS_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const isAdding = (state = false, action) => {
    switch(action.type) {
        case types.ORDER_ADD_STARTED: {
            return true;
        }
        case types.ORDER_ADD_COMPLETED: {
            return false;
        }
        case types.ORDER_ADD_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const isEditing = (state = false, action) => {
    switch(action.type) {
        case types.ORDER_EDIT_STARTED: {
            return true;
        }
        case types.ORDER_EDIT_COMPLETED: {
            return false;
        }
        case types.ORDER_EDIT_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const isRemoving = (state = false, action) => {
    switch(action.type) {
        case types.ORDER_REMOVE_STARTED: {
            return true;
        }
        case types.ORDER_REMOVE_COMPLETED: {
            return false;
        }
        case types.ORDER_REMOVE_FAILED: {
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
        case types.ORDER_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.ORDER_FETCH_STARTED: {
            return null;
        }
        case types.ORDER_FETCH_COMPLETED: {
            return null;
        }
        //add
        case types.ORDER_ADD_FAILED: {
            return action.payload.error;
        }
        case types.ORDER_ADD_STARTED: {
            return null;
        }
        case types.ORDER_ADD_COMPLETED: {
            return null;
        }
        //edit
        case types.ORDER_EDIT_FAILED: {
            return action.payload.error;
        }
        case types.ORDER_EDIT_STARTED: {
            return null;
        }
        case types.ORDER_EDIT_COMPLETED: {
            return null;
        }
        //remove
        case types.ORDER_REMOVE_FAILED: {
            return action.payload.error;
        }
        case types.ORDER_REMOVE_STARTED: {
            return null;
        }
        case types.ORDER_REMOVE_COMPLETED: {
            return null;
        }
        default: {
            return state;
        }
    }
};


const orders = combineReducers({
  byId,
  order,
  orderSelected,
  selectedOrderProducts,
  isFetching,
  isAdding,
  isEditing,
  isRemoving,
  error,
});

export default orders;

export const getOrder = (state, id) => state.byId[id];
export const getOrders = state => state.order.map(id => getOrder(state, id));
export const getSelectedOrder = state => state.orderSelected;
export const getSelectedOrderProducts = state => state.selectedOrderProducts;
export const isFetchingOrders = state => state.isFetching;
export const isAddingOrders = state => state.isAdding;
export const isEditingOrders = state => state.isEditing;
export const isRemovingOrders = state => state.isRemoving;
export const getOrdersError = state => state.error;