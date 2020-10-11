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