import { put, takeEvery, select } from 'redux-saga/effects';

import { getSalesReportByDates, getSalesReportByBranches } from '../../database/firebase/reports';
import * as actions from '../../logic/actions/reports';
import * as types from '../types/reports';
import * as selectors from '../../logic/reducers';


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


function* getSalesReportByBranch(action) {
    try {
        const result = yield getSalesReportByBranches(action.payload.initial, action.payload.final);

        if(result.error === null){
            const branches = yield select(selectors.getBranches)
            var branchesData = { total: 0 };
            branches.map(branch => {
               branchesData[branch.id] = {
                   ...branch,
                   total: 0
               } 
            });
            Object.values(result.report).forEach(day=>{
                branches.forEach((branch)=>{
                    branchesData[branch.id].total = day.byBranch[branch.id] != null ? 
                            branchesData[branch.id].total + day.byBranch[branch.id].total : 
                            branchesData[branch.id].total
                    
                    branchesData.total = day.byBranch[branch.id] != null ? 
                        branchesData.total + day.byBranch[branch.id].total : 
                        branchesData.total
                    day.byBranch[branch.id]={
                        total:0,
                        totalWithInvoice:0,
                        totalWithoutTip:0,
                        totalWithoutInvoice:0,
                        totalTip:0,
                        ...branch,
                        ...day.byBranch[branch.id]
                    }
                })
            })
            yield put(actions.completeFetchingReportByBranch({days: result.report, branches: branchesData}));
        } else {
            yield put(actions.failFetchingReportByBranch('Falló al obtener reporte.'));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.failFetchingReportByBranch('Falló al obtener reporte.'));
    }
}

export function* watchGetSalesReportByBranch() {
    yield takeEvery(
        types.FETCH_SALES_REPORT_BY_BRANCH_STARTED,
        getSalesReportByBranch,
    );
};