import { all, fork } from 'redux-saga/effects';
//Importamos los watchers
//import { watchLoginStarted } from './auth';
import { watchBranchesAdd, watchBranchesFetch, watchBranchesRemove, watchBranchesUpdate } from './branches';
import { watchAddCategory, watchEditCategory, watchFetchCategories, watchRemoveCategory } from './categories';
import { watchLoginStarted, watchLogoffStarted } from './login';
import { watchAddOrderStarted, watchEditOrderStarted, watchOrdersFetch, watchRemoveOrder,watchEditOrderStatusStarted } from './orders';
import {
    watchAddProductsStarted,
    watchDeleteProductStarted,
    watchEditProductsStarted,
    watchProductsFetchStarted,
    // watchAddIngredientStarted,
    // watchEditIngredientStarted
} from './products';
import { watchAddUsersStarted, watchDeleteUserStarted, watchEditUsersStarted, watchUsersFetchStarted } from './users';
import { watchGetSalesReportByDate, watchGetAverageSalesReport, watchGetSalesReportByBranch } from './reports';
import { watchGetDashboardSalesReport } from './dashboardSales';



function* mainSaga() {
    yield all([

        fork(watchLoginStarted),
        fork(watchLogoffStarted),

        fork(watchUsersFetchStarted),
        fork(watchAddUsersStarted),
        fork(watchEditUsersStarted),
        fork(watchDeleteUserStarted),

        fork(watchFetchCategories),
        fork(watchAddCategory),
        fork(watchEditCategory),
        fork(watchRemoveCategory),

        fork(watchBranchesFetch),
        fork(watchBranchesAdd),
        fork(watchBranchesRemove),
        fork(watchBranchesUpdate),

        fork(watchProductsFetchStarted),
        fork(watchAddProductsStarted),
        fork(watchEditProductsStarted),
        fork(watchDeleteProductStarted),


        fork(watchAddOrderStarted),
        fork(watchEditOrderStarted),
        fork(watchEditOrderStatusStarted),
        fork(watchOrdersFetch),
        fork(watchRemoveOrder),

        fork(watchGetSalesReportByDate),
        fork(watchGetSalesReportByBranch),
        fork(watchGetAverageSalesReport),

        fork(watchGetDashboardSalesReport),
    ]);
}

export default mainSaga;