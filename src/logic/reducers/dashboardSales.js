import { combineReducers } from 'redux';

import * as types from '../types/dashboardSales';


const report = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_DASHBOARD_SALES_REPORT_COMPLETED: 
        {
            const newState = {
                ...action.payload.report
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
        case types.FETCH_DASHBOARD_SALES_REPORT_STARTED:
        {
            return true;
        }
        case types.FETCH_DASHBOARD_SALES_REPORT_COMPLETED:
        {
            return false;
        }
        case types.FETCH_DASHBOARD_SALES_REPORT_FAILED:
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
        case types.FETCH_DASHBOARD_SALES_REPORT_STARTED:
        {
            return null;
        }
        case types.FETCH_DASHBOARD_SALES_REPORT_COMPLETED:
        {
            return null;
        }
        case types.FETCH_DASHBOARD_SALES_REPORT_FAILED:
        {
            return action.payload.error;
        }
        default:
        {
            return state;
        }
    }
}

const dashboardSales = combineReducers({
    report,
    isFetching,
    error
});

export default dashboardSales;

export const getDashboardSalesReport = (state) => state.report;
export const getDashboardSalesReportByBranch = (state) =>  state.report!={}  && state.report.byBranchOrder!=undefined ? state.report.byBranchOrder.map(branchId=>state.report.byBranch[branchId]):[];
export const getDashboardSalesReportByWaiter = (state) => state.report!={} && state.report.byWaiterOrder ? state.report.byWaiterOrder.map(waiterId=>state.report.byWaiter[waiterId]):[];
// export const getProductsSoldToday = (state) => state.report!={} ? state.report.byWaiterOrder.map(waiterId=>state.report.byWaiter[waiterId]):[];
export const getDashboardSalesReportIsFetching = state => state.isFetching;
export const getDashboardSalesReportError = state => state.error;
