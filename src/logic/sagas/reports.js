import { put, takeEvery, select } from 'redux-saga/effects';

import { getSalesReportByDates, getSalesReportByBranches, getSalesReportByUsers, getMostSoldProducts } from '../../database/firebase/reports';
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



function* getSalesReportByUser(action) {
    try {
        const result = yield getSalesReportByUsers(action.payload.initial, action.payload.final);

        if(result.error === null){
            const users = yield select(selectors.getUsers)
            var usersData = { total: 0 };
            users.map(user => {
               usersData[user.uid] = {
                   ...user,
                   total: 0
               } 
            });
            Object.values(result.report).forEach(day=>{
                users.forEach((user)=>{
                    usersData[user.uid].total = day.byWaiter[user.uid] != null ? 
                            usersData[user.uid].total + day.byWaiter[user.uid].total : 
                            usersData[user.uid].total
                    
                    usersData.total = day.byWaiter[user.uid] != null ? 
                        usersData.total + day.byWaiter[user.uid].total : 
                        usersData.total
                    day.byWaiter[user.uid]={
                        total:0,
                        totalWithInvoice:0,
                        totalWithoutTip:0,
                        totalWithoutInvoice:0,
                        totalTip:0,
                        ...user,
                        ...day.byWaiter[user.uid]
                    }
                })
            })
            yield put(actions.completeFetchingReportByUser({days: result.report, users: usersData}));
        } else {
            yield put(actions.failFetchingReportByUser('Falló al obtener reporte.'));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.failFetchingReportByUser('Falló al obtener reporte.'));
    }
}

export function* watchGetSalesReportByUser() {
    yield takeEvery(
        types.FETCH_SALES_REPORT_BY_USER_STARTED,
        getSalesReportByUser,
    );
};


function* getAverageSalesReport(action) {
    try {
        const result = yield getSalesReportByDates(action.payload.initial, action.payload.final, action.payload.groupBy);

        if(result.error === null){
            yield put(actions.completeFetchingAverageReport(result.report));
        } else {
            yield put(actions.failFetchingAverageReport('Falló al obtener reporte.'));
        }
    } catch (error) {
        yield put(actions.failFetchingAverageReport('Falló al obtener reporte.'));
    }
}

export function* watchGetAverageSalesReport() {
    yield takeEvery(
        types.FETCH_AVERAGE_SALES_REPORT_STARTED,
        getAverageSalesReport,
    );
};

function* fetchMostSoldProducts(action) {
    try {
        const response = yield getMostSoldProducts(action.payload.initial, action.payload.final);

        if(response.error === null) {
            yield put(actions.completeFetchingMostSoldProducts(response.report));
        } else {
            yield put(actions.failFetchingMostSoldProducts('Ha ocurrido un error al traer los productos'))
        }

    } catch (error) {
        yield put(actions.failFetchingMostSoldProducts('Ha ocurrido un error al traer los productos'))
    };
};

export function* watchFetchMostSoldProducts() {
    yield takeEvery(
        types.FETCH_MOST_SOLD_PRODUCTS_REPORT_STARTED,
        fetchMostSoldProducts,
    );
};

