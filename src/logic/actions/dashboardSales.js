import * as types from '../types/dashboardSales';


export const startFetchingDashboardSalesReport = () => ({
    type: types.FETCH_DASHBOARD_SALES_REPORT_STARTED,
    payload: null
});

export const completeFetchingDashboardSalesReport = report => {
    return({
    type: types.FETCH_DASHBOARD_SALES_REPORT_COMPLETED,
    payload: {
        report, 
    },
})};

export const failFetchingDashboardSalesReport = error => ({
    type: types.FETCH_DASHBOARD_SALES_REPORT_FAILED,
    payload: {
        error,
    },
});