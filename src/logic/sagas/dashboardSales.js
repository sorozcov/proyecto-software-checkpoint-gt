import { put, takeEvery,select } from 'redux-saga/effects';

import { getDashboardReport } from '../../database/firebase/dashboardSales';
import * as actions from '../../logic/actions/dashboardSales';
import * as types from '../types/dashboardSales';
import * as selectors from '../../logic/reducers';


//  función que se encarga de traer todas las categorías de la base de datos para luego mostrarlas
function* getDashboardSalesReport(action) {
    try {
        const result = yield getDashboardReport();

        if(result.error === null){
            const users = yield select(selectors.getUsers)
            const branches = yield select(selectors.getBranches)
            result.report.byBranchOrder=[]
            branches.forEach(branch=>{
                result.report.byBranchOrder.push(branch.id)
                result.report.byBranch[branch.id]={
                    total:0,
                    totalWithInvoice:0,
                    totalWithoutTip:0,
                    totalWithoutInvoice:0,
                    totalTip:0,
                    ...branch,
                    ...result.report.byBranch[branch.id]
                }
            })
            result.report.byWaiterOrder=[]
            users.forEach(user=>{
                result.report.byWaiterOrder.push(user.uid)
                result.report.byWaiter[user.uid]={
                    total:0,
                    totalWithInvoice:0,
                    totalWithoutTip:0,
                    totalWithoutInvoice:0,
                    totalTip:0,
                    ...user,
                    ...result.report.byWaiter[user.uid]
                }
            })
            
            yield put(actions.completeFetchingDashboardSalesReport(result.report));
        } else {
            yield put(actions.failFetchingDashboardSalesReport('Falló al obtener reporte de dashboard.'));
        }
    } catch (error) {
        yield put(actions.failFetchingDateReport('Falló al obtener reporte de dashboard.'));
    }
}

export function* watchGetDashboardSalesReport() {
    yield takeEvery(
        types.FETCH_DASHBOARD_SALES_REPORT_STARTED,
        getDashboardSalesReport,
    );
};