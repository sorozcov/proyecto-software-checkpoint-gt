import { put, takeEvery } from 'redux-saga/effects';

import { getSalesReportByDates } from '../../database/firebase/reports';
import * as actions from '../../logic/actions/reports';
import * as types from '../types/reports';


//  función que se encarga de traer todas las categorías de la base de datos para luego mostrarlas
function* getSalesReportByDate(action) {
    try {
        const result = yield getSalesReportByDates(action.payload.initial, action.payload.final);

        if(result.error === null){
            yield put(actions.completeFetchingDateReport(result.report));
        } else {
            yield put(actions.failFetchingDateReport('Falló al obtener reporte.'));
        }
    } catch (error) {
        yield put(actions.failFetchingDateReport('Falló al obtener reporte.'));
    }
}

export function* watchGetSalesReportByDate() {
    yield takeEvery(
        types.FETCH_SALES_REPORT_BY_DATE_STARTED,
        getSalesReportByDate,
    );
};