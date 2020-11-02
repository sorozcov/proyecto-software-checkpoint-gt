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