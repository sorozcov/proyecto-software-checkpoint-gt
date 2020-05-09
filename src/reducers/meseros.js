import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/meseros';

const byId = (state = {}, action) => {
    switch (action.type) {
        case types.MESEROS_FETCH_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = { ...state };

            order.forEach(id => {
                newState[id] = {
                ...entities[id],
                isConfirmed: true,
                };
            });

            return newState;
        }
        case types.MESEROS_DELETE_STARTED: {
            return omit(state, action.payload.id);
        }
        default:{
            return state;
        }
    }
}

const order = (state = [], action) => {
    switch (action.type) {
        case types.MESEROS_FETCH_COMPLETED :{
            return [...state, ...action.payload.order];
        }
        case types.MESEROS_DELETE_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default:{
            return state;
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.MESEROS_FETCH_STARTED: {
            return true;
        }
        case types.MESEROS_FETCH_COMPLETED: {
            return false;
        }
        case types.MESEROS_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.PET_OWNERS_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.MESEROS_DELETE_FAILED: {
            return action.payload.error;
        }
        case types.PET_OWNERS_FETCH_STARTED: {
            return null;
        }
        case types.PET_OWNERS_FETCH_COMPLETED: {
            return null;
        }
        case types.MESEROS_DELETE_STARTED: {
            return null;
        }
        case types.MESEROS_DELETE_COMPLETED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

export default combineReducers({
    byId,
    order,
    isFetching,
    error,
})


export const getMesero = (state, id) => state.byId[id];
export const getMeseros = state => state.order.map(id => getMesero(state, id));
export const isFetchingMeseros = state => state.isFetching;
export const getMeserosError = state => state.error;