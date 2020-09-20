import { put, takeEvery } from 'redux-saga/effects';
import { deleteBranch, getBranches, updateBranch } from '../../database/firebase/branches';
import * as actions from '../../logic/actions/branches';
import * as types from '../types/branches';
import { suscribeFirebase } from '../../../App';





// BRANCHES FETCH SAGA
function* fetchBranches(action) {
    try {
        const result = yield getBranches();
        if(!suscribeFirebase){
            yield put(actions.completeFetchingBranch(result.branches.byId, result.branches.order));
        }

    } catch (error) {
        yield put(actions.failFetchingBranch(result.error));
    }
}

export function* watchBranchesFetch() {
    yield takeEvery(
        types.BRANCH_FETCH_STARTED,
        fetchBranches,
    );
}

// BRANCHES ADD SAGA
function* addBranch(action) {
    try {
        const branch = action.payload;
        const result = yield updateBranch(branch);
        if (result.error == null) {
            if(!suscribeFirebase){
                yield put(actions.completeAddingBranch(result.branch));
            }
        } else {
            yield put(actions.failAddingBranch(result.error));
        }
    } catch (error) {
        yield put(actions.failAddingBranch(error));
    }
}


export function* watchBranchesAdd() {
    yield takeEvery(
        types.BRANCH_ADD_STARTED,
        addBranch,
    );
}

// BRANCHES REMOVE SAGA
function* removeBranch(action) {
    try {
        const result = yield deleteBranch({ id: action.payload.id });
        if(!suscribeFirebase){
            yield put(actions.completeRemovingBranch(result.id));
        }

    } catch (error) {
        yield put(actions.failRemovingBranch(action.payload.id, error));
    }
}

export function* watchBranchesRemove() {
    yield takeEvery(
        types.BRANCH_REMOVE_STARTED,
        removeBranch,
    );
}

// BRANCHES UPDATE SAGA
function* editBranch(action) {
    try {
        const branch = action.payload;
        const result = yield updateBranch(branch);

        if (result.error == null) {
            if(!suscribeFirebase){
                yield put(actions.completeUpdatingBranch(result.branch));
            }
        } else {
            yield put(actions.failUpdatingBranch(action.payload.id, result.error));
        }
    } catch (error) {
        yield put(actions.failUpdatingBranch(action.payload.id, error));
    }
}

export function* watchBranchesUpdate() {
    yield takeEvery(
        types.BRANCH_UPDATE_STARTED,
        editBranch,
    );
}



