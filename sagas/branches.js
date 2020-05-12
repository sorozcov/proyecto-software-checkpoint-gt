import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';

import * as selectors from '../src/reducers';
import * as actions from '../src/actions/branches';
import * as types from '../src/types/branches';

import { getBranches, updateBranch, deleteBranch } from '../firebase/branches';

export function* watchBranchesFetch() {
    yield takeEvery(
        types.BRANCH_FETCH_STARTED,
        fetchBranches,
    );
}

export function* watchBranchesAdd() {
    yield takeEvery(
        types.BRANCH_ADD_STARTED,
        addBranch,
    );
}

export function* watchBranchesRemove() {
    yield takeEvery(
        types.BRANCH_REMOVE_STARTED,
        removeBranch,
    );
}

export function* watchBranchesUpdate() {
    yield takeEvery(
        types.BRANCH_UPDATE_STARTED,
        updateBranch,
    );
}

//BRANCHES FETCH SAGA
function* fetchBranches(action) {
    try {
        const result = yield getBranches();
        yield put(actions.completeFetchingBranch(result.branches.byId, result.branches.order));

    } catch (error) {
        yield put(actions.failFetchingBranch("Error:", error));
    }
}

//TODO: BRANCHES ADD SAGA
function* addBranch(action) {
    try {
        const branch = action.payload;
        const result = yield updateBranch({ branchId: null, BranchName: branch.name, location: branch.location });
        yield put(actions.completeAddingBranch(action.payload.id, result.branch));

    } catch (error) {
        yield put(actions.failAddingBranch("Error:", error));
    }
}

//TODO: BRANCHES REMOVE SAGA
function* removeBranch(action) {
    try {
        const result = yield deleteBranch({ branchId: action.payload });
        yield put(actions.completeRemovingBranch(result.branchId));

    } catch (error) {
        yield put(actions.failRemovingBranch("Error:", error));
    }
}

//TODO: BRANCHES UPDATE SAGA
function* updateBranch(action) {
    try {
        const branch = action.payload;
        const result = yield updateBranch({ branchId: branch.id, BranchName: branch.name, location: branch.location });
        yield put(actions.completeUpdatingBranch(result.branch.branchId));
    } catch (error) {
        yield put(actions.failAddingBranch("Error:", error));
    }
}




// function* usersFetchStarted(action) {
//     try {
//         const result = yield getUsers()
//         yield put(actions.completeFetchingUsers(result.users.byId, result.users.order));

//     } catch (error) {
//         console.log("Falló el fetch de usuarios")
//         yield put(actions.failFetchingUsers('Falló el fetch'))
//     }
// }

// export function* watchUsersFetchStarted() {
//     yield takeEvery(
//         types.USERS_FETCH_STARTED,
//         usersFetchStarted,
//     );
// }