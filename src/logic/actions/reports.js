import * as types from '../types/reports';


export const startFetchingDateReport = (initial, final) => ({
    type: types.FETCH_SALES_REPORT_BY_DATE_STARTED,
    payload: {
        initial,
        final
    }
});

export const completeFetchingDateReport = report => ({
    type: types.FETCH_SALES_REPORT_BY_DATE_COMPLETED,
    payload: {
        report, 
    },
});

export const failFetchingDateReport = error => ({
    type: types.FETCH_SALES_REPORT_BY_DATE_FAILED,
    payload: {
        error,
    },
});

export const startFetchingReportByBranch = (initial, final) => ({
    type: types.FETCH_SALES_REPORT_BY_BRANCH_STARTED,
    payload: {
        initial,
        final
    }
});

export const completeFetchingReportByBranch = report => ({
    type: types.FETCH_SALES_REPORT_BY_BRANCH_COMPLETED,
    payload: {
        report, 
    },
});

export const failFetchingReportByBranch = error => ({
    type: types.FETCH_SALES_REPORT_BY_BRANCH_FAILED,
    payload: {
        error,
    },
});

export const startFetchingReportByUser = (initial, final) => ({
    type: types.FETCH_SALES_REPORT_BY_USER_STARTED,
    payload: {
        initial,
        final
    }
});

export const completeFetchingReportByUser = report => ({
    type: types.FETCH_SALES_REPORT_BY_USER_COMPLETED,
    payload: {
        report, 
    },
});

export const failFetchingReportByUser = error => ({
    type: types.FETCH_SALES_REPORT_BY_USER_FAILED,
    payload: {
        error,
    },
});


export const startFetchingAverageReport = (initial, final, groupBy = 'WEEKDAY') => ({
    type: types.FETCH_AVERAGE_SALES_REPORT_STARTED,
    payload: {
        initial,
        final,
        groupBy
    }
});

export const completeFetchingAverageReport = report => ({
    type: types.FETCH_AVERAGE_SALES_REPORT_COMPLETED,
    payload: {
        report, 
    },
});

export const failFetchingAverageReport = error => ({
    type: types.FETCH_AVERAGE_SALES_REPORT_FAILED,
    payload: {
        error,
    },
});

export const startFetchingMostSoldProducts = (initial, final) => ({
    type: types.FETCH_MOST_SOLD_PRODUCTS_REPORT_STARTED,
    payload: {
        initial,
        final,
    }
});

export const completeFetchingMostSoldProducts = report => ({
    type: types.FETCH_MOST_SOLD_PRODUCTS_REPORT_COMPLETED,
    payload: {
        report, 
    },
});

export const failFetchingMostSoldProducts = error => ({
    type: types.FETCH_MOST_SOLD_PRODUCTS_REPORT_FAILED,
    payload: {
        error,
    },
});