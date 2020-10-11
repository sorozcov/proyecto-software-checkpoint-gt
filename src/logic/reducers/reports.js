import { combineReducers } from 'redux';

import * as types from '../types/reports';


const byId = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_SALES_REPORT_BY_DATE_COMPLETED: 
        {
            const newState = {
                ...state,
                ['BY-DATE']: action.payload.report,
            }
            return newState;
        }
        default: 
        {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_SALES_REPORT_BY_DATE_STARTED:
        {
            return true;
        }
        case types.FETCH_SALES_REPORT_BY_DATE_COMPLETED:
        {
            return false;
        }
        case types.FETCH_SALES_REPORT_BY_DATE_FAILED:
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
        case types.FETCH_SALES_REPORT_BY_DATE_STARTED:
        {
            return null;
        }
        case types.FETCH_SALES_REPORT_BY_DATE_COMPLETED:
        {
            return null;
        }
        case types.FETCH_SALES_REPORT_BY_DATE_FAILED:
        {
            return action.payload.error;
        }
        default:
        {
            return state;
        }
    }
}

const reports = combineReducers({
    byId,
    isFetching,
    error
});

export default reports;

export const getReport = (state, id) => state.byId[id];
export const getReportIsFetching = state => state.isFetching;
export const getReportError = state => state.error;
